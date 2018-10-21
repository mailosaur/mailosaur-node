const nodemailer = require('nodemailer');
const fs = require('fs');
const assert = require('chai').assert;
const html = fs.readFileSync(__dirname + '/resources/testEmail.html', 'utf-8');
const text = fs.readFileSync(__dirname + '/resources/testEmail.txt', 'utf-8');

const smtpTransport = nodemailer.createTransport({
    host: process.env.MAILOSAUR_SMTP_HOST || 'mailosaur.io',
    port: process.env.MAILOSAUR_SMTP_PORT || '25',
    secureConnection: false,
    ignoreTLS: false,
    tls: {
        // Do not fail on certificate mismatch
        rejectUnauthorized: false
    }
});

module.exports = {
    sendEmails: function(client, server, quantity) {
        var self = this,
            promises = [];

        return new Promise((resolve, reject) => {
            for (var i = 0; i < quantity; i++) {
                promises.push(self.sendEmail(client, server));
            }

            Promise.all(promises)
                .then(resolve)
                .catch(reject);
        });
    },

    sendEmail: function(client, server, sendToAddress) {
        let randomString = (Math.random() + 1).toString(36).substring(7);
        let randomFromAddress = client.servers.generateEmailAddress(server);
        let randomToAddress = sendToAddress || client.servers.generateEmailAddress(server);

        return smtpTransport.sendMail({
            subject: randomString + ' subject',
            from: `${randomString} ${randomString} <${randomFromAddress}>`,
            to: `${randomString} ${randomString} <${randomToAddress}>`,
            html: html.replace('REPLACED_DURING_TEST', randomString),
            encoding: 'base64',
            text: text.replace('REPLACED_DURING_TEST', randomString),
            textEncoding: 'base64',
            attachments: [
                {
                    filename: 'cat.png',
                    path: __dirname + '/resources/cat.png',
                    cid: 'ii_1435fadb31d523f6'
                },
                {
                    fileName: 'dog.png',
                    path: __dirname + '/resources/dog.png'
                }
            ]
        });
    }
};
