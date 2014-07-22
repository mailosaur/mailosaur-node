'use strict';

var  host = 'https://mailosaur.com',
    //host = 'http://localhost:3000',
    basePath = '/api/3/',
    authKey;

function Mailbox(mailbox) {
  function http(opts, done) {
    var request = require('request'),
        baseUrl = host + basePath,
        route = opts.route.replace(':mailbox', mailbox),
        params = {
          url: baseUrl + route,
          method: (opts.method || 'GET'),
          auth: {
            user: authKey,
            pass: ''
          },
          json: true
        };

    if(opts.binary){
      params.encoding = null;
    }

    request(params, function (err, headers, body) {
      if(!err){
        if(headers.statusCode!=200){
          throw new Error(headers.statusCode + ': ' + body);
        }
      }
      done(err, body);
    });
  }

  return {
    getEmails: function (searchPattern, cb) {
      var route = 'mailbox/:mailbox/emails';
      if(typeof(searchPattern) !== "function") {
        route += '/?search=' + searchPattern;
      }
      else{
        cb = searchPattern;
      }
      http({
        route: route
      }, cb);
    },

    getEmailsByRecipient: function (recipient, cb) {
      http({
        route: 'mailbox/:mailbox/emails/?recipient=' + recipient
      }, cb);
    },

    getEmail: function (email, cb) {
      http({
        route: 'email/' + email
      }, cb);
    },

    deleteAllEmail: function (cb) {
      http({
        route: 'mailbox/:mailbox/clear',
        method: 'POST'
      }, cb);
    },

    deleteEmail: function (email, cb) {
      http({
        route: 'email/' + email + '/delete',
        method: 'POST'
      }, cb);
    },

    getAttachment: function (attachmentId, cb) {
      http({
        route: 'email/attachment/' + attachmentId,
        method: 'GET',
        binary: true
      }, cb);
    },

    getRawEmail: function (rawId, cb) {
      http({
        route: 'email/raw/' + rawId ,
        method: 'GET',
        binary: true
      }, cb);
    },

    generateEmailAddress: function () {
      var random = Math.random().toString(36);
      return  random + '.' + mailbox + '@mailosaur.in';
    }
  };
};

module.exports = function mailosaur(apiKey) {
  authKey = apiKey;

  return {
    Mailbox: Mailbox
  }
};
