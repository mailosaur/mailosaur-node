'use strict';

const MailosaurError = require('../models/mailosaurError');
const SpamAnalysisResult = require('../models/spamAnalysisResult');

/** Class representing Analysis operations. */
class Analysis {
  /**
   * Create a Analysis.
   * @param {MailosaurClient} client Reference to the Mailosaur client.
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * @summary Perform a spam test
   *
   * Perform spam testing on the specified email
   *
   * @param {uuid} email The identifier of the email to be analyzed.
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {SpamAnalysisResult} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {object} [result]   - The deserialized result object if an error did not occur.
   *                      See {@link SpamAnalysisResult} for more information.
   */
  spam(email, optionalCallback) {
    let client = this.client;
    let self = this;
    let url = `api/analysis/spam/${email}`;

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.get(url, (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(new MailosaurError(response));
          }          
          resolve(new SpamAnalysisResult(body));
        });
      });
    } else {
      self.client.request.get(url, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return optionalCallback(new MailosaurError(response));
        }
        optionalCallback(null, new SpamAnalysisResult(body));
      });
    }
  }
}

module.exports = Analysis;
