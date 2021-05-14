const UsageAccountLimits = require('../models/usageAccountLimits');
const UsageTransactionListResult = require('../models/usageTransactionListResult');

/** Class representing Servers operations. */
class Usage {
  /**
   * Create a Servers.
   * @param {MailosaurClient} client Reference to the Mailosaur client.
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * @summary Retrieve account usage limits.
   *
   * Details the current limits and usage for your account.
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {UsageAccountLimits} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {object} [result]   - The deserialized result object if an error did not occur.
   *                      See {@link UsageAccountLimits} for more information.
   */
  limits(optionalCallback) {
    const self = this;
    const url = `api/usage/limits`;

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.get(url, (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(err || self.client.httpError(response));
          }
          resolve(new UsageAccountLimits(body));
        });
      });
    } else {
      self.client.request.get(url, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return optionalCallback(err || self.client.httpError(response));
        }
        optionalCallback(null, new UsageAccountLimits(body));
      });
    }
  }

  /**
   * @summary List account transactions
   *
   * Retrieves the last 31 days of transactional usage.
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {UsageTransactionListResult} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {object} [result]   - The deserialized result object if an error did not occur.
   *                      See {@link UsageTransactionListResult} for more information.
   */
   transactions(optionalCallback) {
    const self = this;
    const url = `api/usage/transactions`;

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.get(url, (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(err || self.client.httpError(response));
          }
          resolve(new UsageTransactionListResult(body));
        });
      });
    } else {
      self.client.request.get(url, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return optionalCallback(err || self.client.httpError(response));
        }
        optionalCallback(null, new UsageTransactionListResult(body));
      });
    }
  }
}

module.exports = Usage;
