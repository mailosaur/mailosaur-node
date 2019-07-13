const MailosaurClient = require('../lib/mailosaur');
const assert = require('chai').assert;
const mailer = require('./mailer');

describe('files', () => {
    let apiKey = process.env.MAILOSAUR_API_KEY;
    let server = process.env.MAILOSAUR_SERVER;
    let baseUrl = process.env.MAILOSAUR_BASE_URL || 'https://mailosaur.com/';
    let client;
    let email;

    before((done) => {
        var testEmailAddress;

        if (!apiKey || !server) {
            throw new Error('Missing necessary environment variables - refer to README.md');
        }

        client = new MailosaurClient(apiKey, baseUrl);

        client.messages.deleteAll(server)
            .then(() => {
                var host = process.env.MAILOSAUR_SMTP_HOST || 'mailosaur.io';
                testEmailAddress = `files_test.${server}@${host}`;
                return mailer.sendEmail(client, server, testEmailAddress);
            })
            .then(() => {
                return client.messages.get(server, {
                    sentTo: testEmailAddress
                });
            })
            .then((result) => {
                email = result;
                done();
            })
            .catch(done);
    });

    describe('getEmail', () => {
        it('should return a file', (done) => {
            client.files.getEmail(email.id)
                .then((result) => {
                    assert.isOk(result);
                    assert.isTrue(result.length > 1);
                    assert.isTrue(result.indexOf(email.subject) !== -1);
                    done();
                })
                .catch(done);
        });

        it('should return a file via callback', (done) => {
            client.files.getEmail(email.id, (err, result) => {
                assert.isNull(err);
                assert.isOk(result);
                assert.isTrue(result.length > 1);
                assert.isTrue(result.indexOf(email.subject) !== -1);
                done();
            });
        });
    });

    describe('getAttachment', () => {
        it('should return a file', (done) => {
            var attachment = email.attachments[0];

            client.files.getAttachment(attachment.id)
                .then((result) => {
                    assert.isOk(result);
                    assert.equal(result.length, attachment.length);
                    done();
                })
                .catch(done);
        });

        it('should return a file via callback', (done) => {
            var attachment = email.attachments[0];

            client.files.getAttachment(attachment.id, (err, result) => {
                assert.isNull(err);
                assert.isOk(result);
                assert.equal(result.length, attachment.length);
                done();
            });
        });
    });
});