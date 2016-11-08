'use strict';

var options =
{
    baseUrl: 'https://mailosaur.com/api/',
    smtpHost: 'mailosaur.io',
    apiKey: ''
}

function Mailbox(mailbox) {
    function http(opts, done) {
        var request = require('request'),
            route = opts.route.replace(':mailbox', mailbox),
            params = {
                url: options.baseUrl + route,
                method: (opts.method || 'GET'),
                auth: {
                    user: options.apiKey,
                    pass: ''
                },
                json: true
            };
        if (opts.binary) {
            params.encoding = null;
        }
        if (done) {
            request(params, function (err, headers, body) {
                if (!err) {
                    if (headers.statusCode != 200 && headers.statusCode != 204) {
                        throw new Error(headers.statusCode + ': ' + body);
                    }
                }
                done(err, body);
            });
        }
        else {
            var Promise = require("bluebird");

            return new Promise(function (resolve, reject) {
                request(params, function (err, headers, body) {
                    if (!err) {
                        if (headers.statusCode != 200 && headers.statusCode != 204) {
                            var err = new Error(headers.statusCode + ': ' + body);
                            reject(err);
                            throw err;
                        }
                    }
                    resolve(body);
                });
            });
        }
    }

    return {
        getEmails: function (searchPattern, cb) {
            var route = 'mailboxes/:mailbox/emails';
            if (typeof(searchPattern) === "string") {
                route += '/?search=' + searchPattern;
            }
            else {
                cb = searchPattern;
            }
            return http({
                route: route
            }, cb);
        },

        getEmailsByRecipient: function (recipient, cb) {
            return http({
                route: 'mailboxes/:mailbox/emails/?recipient=' + recipient
            }, cb);
        },

        getEmail: function (email, cb) {
            return http({
                route: 'emails/' + email
            }, cb);
        },

        deleteAllEmail: function (cb) {
            return http({
                route: 'mailboxes/:mailbox/empty',
                method: 'POST'
            }, cb);
        },

        deleteEmail: function (email, cb) {
            return http({
                route: 'emails/' + email + '/delete',
                method: 'POST'
            }, cb);
        },

        getAttachment: function (attachmentId, cb) {
            return http({
                route: 'attachments/' + attachmentId,
                method: 'GET',
                binary: true
            }, cb);
        },

        getRawEmail: function (rawId, cb) {
            return http({
                route: 'raw/' + rawId,
                method: 'GET',
                binary: true
            }, cb);
        },

        generateEmailAddress: function () {
            var random = Math.random().toString(36);
            return random + '.' + mailbox + '@' + options.smtpHost;
        }
    };
};

module.exports = function mailosaur(apiKey) {
    options.apiKey = apiKey;

    options.baseUrl = process.env.MAILOSAUR_BASE_URL || options.baseUrl;
    options.smtpHost = process.env.MAILOSAUR_SMTP_HOST || options.smtpHost;

    if (process.env.MAILOSAUR_BASE_URL) {
        console.log('Using', options.baseUrl, options.smtpHost);
    }

    return {
        Mailbox: Mailbox
    }
};
