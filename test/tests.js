var async = require('async'),
    assert = require('chai').assert,
    path = require('path'),
    nodemailer = require('nodemailer'),
    fs = require('fs'),
    mailosaurApi = require('../lib/mailosaur'),
    mailbox,
    recipientAddressShort,
    recipientAddressLong;


describe('Mailosaur Bindings', function () {

    describe('GetEmails', function () {
        it('should return a list of emails for the mailbox', function (done) {
            mailbox.getEmails(function (err, emails) {
                assert.notOk(err, err);
                assert.ok(emails);
                assertEmail(emails[0], done);
            });
        });

        it('should return a list of emails for the mailbox using promises', function (done) {
            mailbox.getEmails()
                .then(function (emails) {
                    assert.ok(emails);
                    assertEmail(emails[0], done);
                })
                .catch(function (err) {
                    assert.notOk(err, err);
                });
        });
    });

    describe('GetEmailsSearch', function () {
        it('should return a list of emails for the mailbox', function (done) {
            mailbox.getEmails('test', function (err, emails) {
                assert.notOk(err, err);
                assert.ok(emails);
                assertEmail(emails[0], done);
            });
        });

        it('should return a list of emails for the mailbox using promises', function (done) {
            mailbox.getEmails('test')
                .then(function (emails) {
                    assert.ok(emails);
                    assertEmail(emails[0], done);
                })
                .catch(function (err) {
                    assert.notOk(err, err);
                });
        });
    });

    describe('GetEmailsByRecipient', function () {
        it('should return a list of emails for the mailbox', function (done) {
            mailbox.getEmailsByRecipient(recipientAddressShort, function (err, emails) {
                assert.notOk(err, err);
                assert.ok(emails);
                assertEmail(emails[0], done);
            });
        });

        it('should return a list of emails for the mailbox using promises', function (done) {
            mailbox.getEmailsByRecipient(recipientAddressShort)
                .then(function (emails) {
                    assert.ok(emails);
                    assertEmail(emails[0], done);
                })
                .catch(function (err) {
                    assert.notOk(err, err);
                });
        });
    });


    before(function (done) {
        var mailboxid = process.env.MAILOSAUR_MAILBOX_ID,
            apikey = process.env.MAILOSAUR_API_KEY;

        if (!mailboxid) {
            throw 'To run tests, please set environemnt variable MAILOSAUR_MAILBOX_ID to your mailbox ID';
        }

        if (!apikey) {
            throw 'To run tests, please set environemnt variable MAILOSAUR_API_KEY to your API key';
        }

        mailbox = new mailosaurApi(apikey).Mailbox(mailboxid);


        recipientAddressShort = mailbox.generateEmailAddress();
        recipientAddressLong = "anybody<" + recipientAddressShort + ">";


        // send an email:
        var html = '<div dir=\"ltr\"><img src=\"https://mailosaur.com/favicon.ico\" /><div style=\"font-family:arial,sans-serif;font-size:13px;color:rgb(80,0,80)\">this is a test.</div><div style=\"font-family:arial,sans-serif;font-size:13px;color:rgb(80,0,80)\"><br>this is a link: <a href=\"https://mailosaur.com/\" target=\"_blank\">mailosaur</a><br>\n</div><div class=\"gmail_quote\" style=\"font-family:arial,sans-serif;font-size:13px;color:rgb(80,0,80)\"><div dir=\"ltr\"><div><br></div><div>this is an image:<a href=\"https://mailosaur.com/\" target=\"_blank\"><img src=\"cid:ii_1435fadb31d523f6\" alt=\"Inline image 1\"></a></div>\n<div><br></div><div>this is an invalid link: <a href=\"http://invalid/\" target=\"_blank\">invalid</a></div></div></div>\n</div>',
            text = 'this is a test.\n\nthis is a link: mailosaur <https://mailosaur.com/>\n\nthis is an image:[image: Inline image 1] <https://mailosaur.com/>\n\nthis is an invalid link: invalid';


        var mailOptions = {
            from: 'anyone<anyone@example.com>',
            to: recipientAddressLong,
            subject: 'test subject',
            text: text,
            html: html,
            encoding: 'base64',
            textEncoding: 'base64',
            attachments: [
                {
                    fileName: 'logo-m.png',
                    streamSource: fs.createReadStream(path.resolve(__dirname, 'logo-m.png')),
                    cid: 'ii_1435fadb31d523f6'
                },
                {
                    fileName: 'logo-m-circle-sm.png',
                    streamSource: fs.createReadStream(path.resolve(__dirname, 'logo-m-circle-sm.png'))
                }
            ]
        };

        var smtpTransport = nodemailer.createTransport('SMTP', {
            host: 'mailosaur.io',
            port: '25',
            secureConnection: false,
            ignoreTLS: false
        });

        // empty mailbox before sending:
        mailbox.deleteAllEmail(function (err) {
            if (err) {
                return done(err);
            }
            smtpTransport.sendMail(mailOptions, function (err) {
                if (err) {
                    return done(err);
                }
                // delay to allow for email to get processed:
                setTimeout(done, 1000);
            });
        });
    });
});

var assertEmail = function (email, done) {

    // html links:
    assert.equal(3, email.html.links.length);
    assert.equal('https://mailosaur.com/', email.html.links[0].href);
    assert.equal('mailosaur', email.html.links[0].text);
    assert.equal('https://mailosaur.com/', email.html.links[1].href);
    assert.equal(null, email.html.links[1].text);
    assert.equal('http://invalid/', email.html.links[2].href);
    assert.equal('invalid', email.html.links[2].text);

    // TODO: link click:
    // var mailosaur = email.html.links[0].click();
    // assert.isTrue(mailosaur.startsWith("<!DOCTYPE html>"));

    // html images:
    //assert.include(email.html.images[1].src, '.png');
    assert.equal('Inline image 1', email.html.images[1].alt);

    // TODO: image download:
    // var image = email.html.images[0].download();
    // assert.equal(34494, image.length);

    // TODO: email open:
    // email.open();

    // html body:
    var body = '<div dir=\"ltr\"><img src=\"https://mailosaur.com/favicon.ico\" /><div style=\"font-family:arial,sans-serif;font-size:13px;color:rgb(80,0,80)\">this is a test.</div><div style=\"font-family:arial,sans-serif;font-size:13px;color:rgb(80,0,80)\"><br>this is a link: <a href=\"https://mailosaur.com/\" target=\"_blank\">mailosaur</a><br>\n</div><div class=\"gmail_quote\" style=\"font-family:arial,sans-serif;font-size:13px;color:rgb(80,0,80)\"><div dir=\"ltr\"><div><br></div><div>this is an image:<a href=\"https://mailosaur.com/\" target=\"_blank\"><img src=\"cid:ii_1435fadb31d523f6\" alt=\"Inline image 1\"></a></div>\n<div><br></div><div>this is an invalid link: <a href=\"http://invalid/\" target=\"_blank\">invalid</a></div></div></div>\n</div>';
    assert.equal(body, email.html.body);

    // text links:
    assert.equal(2, email.text.links.length);
    assert.equal('https://mailosaur.com/', email.text.links[0].href);
    assert.equal('https://mailosaur.com/', email.text.links[0].text);
    assert.equal('https://mailosaur.com/', email.text.links[1].href);
    assert.equal('https://mailosaur.com/', email.text.links[1].text);

    // TODO: link click:
    // mailosaur = email.html.links[0].Click();
    // assert.isTrue(mailosaur.startsWith("<!DOCTYPE html>"));

    // text body:
    var text = "this is a test.\n\nthis is a link: mailosaur <https://mailosaur.com/>\n\nthis is an image:[image: Inline image 1] <https://mailosaur.com/>\n\nthis is an invalid link: invalid";

    assert.equal(text, email.text.body);

    // headers:
    assert.equal(email.headers['from'] || email.headers['From'], '\"anyone\" <anyone@example.com>');
    assert.equal(email.headers['to'] || email.headers['To'], '\"anybody\" <' + recipientAddressShort + '>');
    assert.equal(email.headers['subject'] || email.headers['Subject'], 'test subject');

    // properties:
    assert.equal('test subject', email.subject);
    assert.equal('normal', email.priority);

    assert.isTrue(email.creationdate.substr(0, 4) > 2013);

    assert.ok(email.senderHost || email.senderhost, 'senderhost');
    assert.notEqual(email.senderHost, '');

    assert.ok(email.mailbox);
    assert.notEqual(email.mailbox, '');

    // from:
    assert.equal('anyone@example.com', email.from[0].address);
    assert.equal('anyone', email.from[0].name);

    // to:
    assert.equal(recipientAddressShort, email.to[0].address);
    assert.equal('anybody', email.to[0].name);

    // attachments:
    assert.equal(2, email.attachments.length);

    // attachment 1:
    var attachment1 = email.attachments[0];

    assert.ok(attachment1.id);
    assert.equal(4819, attachment1.length);
    assert.equal("logo-m.png", attachment1.fileName);
    assert.equal('image/png', attachment1.contentType);

    // attachment 2:
    var attachment2 = email.attachments[1];
    assert.ok(attachment2.id);
    assert.equal(5260, attachment2.length);
    assert.equal('logo-m-circle-sm.png', attachment2.fileName);
    assert.equal('image/png', attachment2.contentType);

    // async tests:

    var assertRaw = function (cb) {
        var rawid = email.rawId || email.rawid
        assert.ok(rawid, 'rawId');
        assert.notEqual(rawid, '');
        mailbox.getRawEmail(rawid, function (err, eml) {
            if (err) {
                return cb(err);
            }
            assert.ok(eml);
            assert.isTrue(eml.length > 1, 'eml length');
            assert.isTrue(eml.indexOf('Received') >= 0 || eml.indexOf('Authentication') >= 0 || eml.indexOf('X-Mailer') >= 0);
            cb();
        });
    };

    var assertAttachment = function (attachmentId, cb) {
        assert.ok(attachmentId);
        assert.notEqual(attachmentId, '');
        mailbox.getAttachment(attachmentId, function (err, attachment) {
            if (err) {
                return cb(err);
            }
            assert.ok(attachment);
            assert.isTrue(attachment.length === 5260 || attachment.length === 4819);
            cb();
        });
    };
    async.forEach(email.attachments, function (attachment, cb) {
        assertAttachment(attachment.id, cb);
    }, function () {
        assertRaw(done);
    });
};
