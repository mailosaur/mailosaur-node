const MailosaurClient = require('../lib/mailosaur');
const MailosaurError = require('../lib/models/mailosaurError');
const assert = require('chai').assert;
const mailer = require('./mailer');
const isoDateString = new Date().toISOString().slice(0, 10);

const validateHtml = (email) => {
    // Body
    assert.match(email.html.body, /^<div dir="ltr">/, 'HTML body should match');

    // Links
    assert.equal(email.html.links.length, 3, 'Should have HTML links');
    assert.equal(email.html.links[0].href, 'https://mailosaur.com/', 'First link should have href');
    assert.equal(email.html.links[0].text, 'mailosaur', 'First link should have text');
    assert.equal(email.html.links[1].href, 'https://mailosaur.com/', 'Second link should have href');
    assert.isUndefined(email.html.links[1].text, 'Second link should have no text');
    assert.equal(email.html.links[2].href, 'http://invalid/', 'Third link should have href');
    assert.equal(email.html.links[2].text, 'invalid', 'Third link should have text');

    // Images
    assert.match(email.html.images[1].src, /cid\:/);
    assert.equal(email.html.images[1].alt, 'Inline image 1', 'Second image should have alt text');
};

const validateText = (email) => {
    // Body
    assert.match(email.text.body, /^this is a test/);
        
    // Links
    assert.equal(email.text.links.length, 2, 'Should have Text links');
    assert.equal(email.text.links[0].href, 'https://mailosaur.com/', 'First link should have href');
    assert.equal(email.text.links[0].text, email.text.links[0].href, 'First text link href & text should match');
    assert.equal(email.text.links[1].href, 'https://mailosaur.com/', 'Second link should have href');
    assert.equal(email.text.links[1].text, email.text.links[1].href, 'Second text link href & text should match');
};

const validateHeaders = (email) => {
    var expectedFromHeader = email.from[0].name + ' <' + email.from[0].email + '>';
    var expectedToHeader = email.to[0].name + ' <' + email.to[0].email + '>';
    var headers = email.metadata.headers;
    
    assert.equal(headers.find(h => h.field.toLowerCase() === 'from').value, expectedFromHeader, 'From header should be accurate');
    assert.equal(headers.find(h => h.field.toLowerCase() === 'to').value, expectedToHeader, 'To header should be accurate');
    assert.equal(headers.find(h => h.field.toLowerCase() === 'subject').value, email.subject, 'Subject header should be accurate');
};

const validateMetadata = (email) => {
    assert.equal(email.from.length, 1);
    assert.equal(email.to.length, 1);
    assert.isNotEmpty(email.from[0].email);
    assert.isNotEmpty(email.from[0].name);
    assert.isNotEmpty(email.to[0].email);
    assert.isNotEmpty(email.to[0].name);
    assert.isNotEmpty(email.subject);
    assert.isNotEmpty(email.server);

    assert.equal(email.received.toISOString().slice(0, 10), isoDateString);
};

const validateAttachments = (email) => {
    assert.equal(email.attachments.length, 2, 'Should have attachments');

    var file1 = email.attachments[0];
    assert.isOk(file1.id, 'First attachment should have file id');
    assert.isOk(file1.url);
    assert.equal(file1.length, 82138, 'First attachment should be correct size');
    assert.equal(file1.fileName, 'cat.png', 'First attachment should have filename');
    assert.equal(file1.contentType, 'image/png', 'First attachment should have correct MIME type');

    var file2 = email.attachments[1];
    assert.isOk(file2.id, 'Second attachment should have file id');
    assert.isOk(file2.url);
    assert.equal(file2.length, 212080, 'Second attachment should be correct size');
    assert.equal(file2.fileName, 'dog.png', 'Second attachment should have filename');
    assert.equal(file2.contentType, 'image/png', 'Second attachment should have correct MIME type');
};

const validateEmail = (email) => {
    validateMetadata(email);
    validateAttachments(email);
    validateHtml(email);
    validateText(email);
};

const validateEmailSummary = (email) => {
    validateMetadata(email);
    assert.equal(email.attachments, 2);
};

describe('emails', () => {
    let apiKey = process.env.MAILOSAUR_API_KEY;
    let server = process.env.MAILOSAUR_SERVER;
    let baseUrl = process.env.MAILOSAUR_BASE_URL || 'https://mailosaur.com/';
    let client;
    let emails;
    
    before((done) => {
        if (!apiKey || !server) {
            throw new Error('Missing necessary environment variables - refer to README.md');
        }

        client = new MailosaurClient(apiKey, baseUrl);

        client.messages.deleteAll(server)
            .then(() => {
                return mailer.sendEmails(client, server, 5);
            })
            .then(() => {
                return client.messages.list(server);
            })
            .then((result) => {
                emails = result.items;
                emails.forEach(validateEmailSummary);
                done();
            })
            .catch(done);
    });

    describe('get', () => {
        it('should return a match once found', (done) => {
            var host = process.env.MAILOSAUR_SMTP_HOST || 'mailosaur.io';
            var testEmailAddress = `wait_for_test.${server}@${host}`;
            mailer.sendEmail(client, server, testEmailAddress)
                .then(() => {
                    return client.messages.get(server, {
                        sentTo: testEmailAddress
                    });
                })
                .then((email) => {
                    validateEmail(email);
                    done();
                })
                .catch(done);
        });
    });

    describe('getById', () => {
        it('should return a single email', (done) => {
            client.messages.getById(emails[0].id)
                .then((email) => {
                    validateEmail(email);
                    validateHeaders(email);
                    done();
                })
                .catch(done);
        });

        it('should throw an error if email not found', (done) => {
            client.messages.getById('efe907e9-74ed-4113-a3e0-a3d41d914765')
                .catch((err) => {
                    assert.instanceOf(err, MailosaurError);
                    done();
                });
        });
    });

    describe('search', () => {
        it('should throw an error if no criteria', (done) => {
            client.messages
                .search(server, {})
                .catch((err) => {
                    assert.instanceOf(err, MailosaurError);
                    done();
                });
        });

        describe('by sentTo', () => {
            it('should return matching results', (done) => {
                var targetEmail = emails[1];
                client.messages
                    .search(server, {
                        sentTo: targetEmail.to[0].email
                    })
                    .then((result) => {
                        var results = result.items;
                        assert.equal(results.length, 1);
                        assert.equal(results[0].to[0].email, targetEmail.to[0].email);
                        assert.equal(results[0].subject, targetEmail.subject);
                        done();
                    })
                    .catch(done);
            });

            it('should throw an error on invalid email address', (done) => {
                client.messages
                    .search(server, {
                        sentTo: '.not_an_email_address'
                    })
                    .catch((err) => {
                        assert.instanceOf(err, MailosaurError);
                        done();
                    });
            });
        });

        describe('by body', () => {
            it('should return matching results', (done) => {
                var targetEmail = emails[1];
                var uniqueString = targetEmail.subject.substr(0, targetEmail.subject.indexOf(' subject'));
                client.messages
                    .search(server, {
                        body: uniqueString + ' html'
                    })
                    .then((result) => {
                        var results = result.items;
                        assert.equal(results.length, 1);
                        assert.equal(results[0].to[0].email, targetEmail.to[0].email);
                        assert.equal(results[0].subject, targetEmail.subject);
                        done();
                    })
                    .catch(done);
            });
        });

        describe('by subject', () => {
            it('should return matching results', (done) => {
                var targetEmail = emails[1];
                var uniqueString = targetEmail.subject.substr(0, targetEmail.subject.indexOf(' subject'));
                client.messages
                    .search(server, {
                        subject: uniqueString
                    })
                    .then((result) => {
                        var results = result.items;
                        assert.equal(results.length, 1);
                        assert.equal(results[0].to[0].email, targetEmail.to[0].email);
                        assert.equal(results[0].subject, targetEmail.subject);
                        done();
                    })
                    .catch(done);
            });
        });
    });

    describe('spamAnalysis', () => {
        it('should perform a spam analysis on an email', (done) => {
            var targetId = emails[0].id;
            client.analysis.spam(targetId)
                .then((result) => {
                    result.spamFilterResults.spamAssassin.forEach((rule) => {
                        assert.isNumber(rule.score);
                        assert.isOk(rule.rule);
                        assert.isOk(rule.description);
                    });

                    done();
                })
                .catch(done);
        });
    });

    describe('del', () => {
        it('should delete an email', (done) => {
            var targetEmailId = emails[4].id;

            client.messages.del(targetEmailId)
                .then(done)
                .catch(done)
        });

        it('should fail if attempting to delete again', (done) => {
            var targetEmailId = emails[4].id;
            
            client.messages.del(targetEmailId)
                .catch((err) => {
                    assert.instanceOf(err, MailosaurError);
                    done();
                });
        })
    });
});
