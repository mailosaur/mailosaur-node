'use strict';

var options =
{
    baseUrl: 'https://mailosaur.com/api/',
    smtpHost: 'mailosaur.in',
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
        request(params, function (err, headers, body) {
            if (!err) {
                if (headers.statusCode != 200 && headers.statusCode != 204) {
                    throw new Error(headers.statusCode + ': ' + body);
                }
            }
            done(err, body);
        });
    }

    return {
        getEmails: function (searchPattern, cb) {
            var route = 'mailboxes/:mailbox/emails';
            if (typeof(searchPattern) !== "function") {
                route += '/?search=' + searchPattern;
            }
            else {
                cb = searchPattern;
            }
            http({
                route: route
            }, cb);
        },

        getEmailsByRecipient: function (recipient, cb) {
            http({
                route: 'mailboxes/:mailbox/emails/?recipient=' + recipient
            }, cb);
        },

        getEmail: function (email, cb) {
            http({
                route: 'emails/' + email
            }, cb);
        },

        deleteAllEmail: function (cb) {
            http({
                route: 'mailboxes/:mailbox/empty',
                method: 'POST'
            }, cb);
        },

        deleteEmail: function (email, cb) {
            http({
                route: 'emails/' + email + '/delete',
                method: 'POST'
            }, cb);
        },

        getAttachment: function (attachmentId, cb) {
            http({
                route: 'attachments/' + attachmentId,
                method: 'GET',
                binary: true
            }, cb);
        },

        getRawEmail: function (rawId, cb) {
            http({
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

    options.baseUrl = arguments[1] || options.baseUrl;
    options.smtpHost = arguments[2] || options.smtpHost;

    return {
        Mailbox: Mailbox
    }
};
