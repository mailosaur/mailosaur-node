const MailosaurError = require('../models/mailosaurError');
const Message = require('../models/message');
const MessageListResult = require('../models/messageListResult');

/** Class representing Messages operations. */
class Messages {
  /**
   * Create a Messages.
   * @param {MailosaurClient} client Reference to the Mailosaur client.
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * @summary Retrieve a message using search criteria
   *
   * Returns as soon as a message matching the specified search criteria is
   * found. This is the most efficient method of looking up a message.
   *
   * @param {string} server The identifier of the server hosting the message.
   *
   * @param {object} criteria The search criteria to use in order to find a
   * match.
   *
   * @param {string} [criteria.sentTo] The full email address to which the target
   * email was sent.
   *
   * @param {string} [criteria.subject] The value to seek within the target
   * email's subject line.
   *
   * @param {string} [criteria.body] The value to seek within the target email's
   * HTML or text body.
   *
   * @param {object} [options] Optional Parameters.
   *
   * @param {number} [options.timeout] Specify how long to wait for a matching
   * result (in milliseconds).
   *
   * @param {date} [options.receivedAfter] Limits results to only messages
   * received after this date/time (default 20 seconds ago).
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {Message} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {object} [result]   - The deserialized result object if an error did not occur.
   *                      See {@link Message} for more information.
   */
  get(server, criteria, options = {}, optionalCallback) {
    const self = this;
    const getByIdError = new MailosaurError('Must provide a valid Server ID.', 'invalid_request');

    // Ensure we only return 1 result
    options.page = 0;
    options.itemsPerPage = 1;

    // Default timeout to 10s
    options.timeout = options.timeout || 10000; // eslint-disable-line no-param-reassign

    // Default receivedAfter to 1h
    options.receivedAfter = options.receivedAfter || new Date(Date.now() - 3600000); // eslint-disable-line no-param-reassign

    if (server.length !== 8) {
      return optionalCallback ? optionalCallback(getByIdError) : new Promise((resolve, reject) => {
        reject(getByIdError);
      });
    }

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.search(server, criteria, options).then((result) => (
          self.getById(result.items[0].id)
        )).then((message) => {
          resolve(message);
        }).catch(reject);
      });
    } else {
      self.search(server, criteria, options).then((result) => {
        self.getById(result.items[0].id, optionalCallback);
      });
    }
  }

  /**
   * @summary Retrieve a message using message id
   *
   * Retrieves the detail for a single email message. Simply supply the unique
   * identifier for the required message.
   *
   * @param {uuid} id The identifier of the email message to be retrieved.
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {Message} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {object} [result]   - The deserialized result object if an error did not occur.
   *                      See {@link Message} for more information.
   */
  getById(id, optionalCallback) {
    const self = this;
    const url = `api/messages/${id}`;

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.get(url, (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(err || self.client.httpError(response));
          }
          resolve(new Message(body));
        });
      });
    } else {
      self.client.request.get(url, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return optionalCallback(err || self.client.httpError(response));
        }
        optionalCallback(null, new Message(body));
      });
    }
  }

  /**
   * @summary Delete a message
   *
   * Permanently deletes a message. This operation cannot be undone. Also deletes
   * any attachments related to the message.
   *
   * @param {uuid} id The identifier of the message to be deleted.
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {null} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {null} [result]   - The deserialized result object if an error did not occur.
   */
  del(id, optionalCallback) {
    const self = this;
    const url = `api/messages/${id}`;

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.del(url, (err, response) => {
          if (err || response.statusCode !== 204) {
            return reject(err || self.client.httpError(response));
          }
          resolve();
        });
      });
    } else {
      self.client.request.del(url, (err, response) => {
        if (err || response.statusCode !== 204) {
          return optionalCallback(err || self.client.httpError(response));
        }
        optionalCallback(null);
      });
    }
  }

  /**
   * @summary List all messages
   *
   * Returns a list of your messages in summary form. The summaries are returned
   * sorted by received date, with the most recently-received messages appearing
   * first.
   *
   * @param {string} server The identifier of the server hosting the messages.
   *
   * @param {object} [options] Optional Parameters.
   *
   * @param {number} [options.page] Used in conjunction with `itemsPerPage` to
   * support pagination.
   *
   * @param {number} [options.itemsPerPage] A limit on the number of results to
   * be returned per page. Can be set between 1 and 1000 items, the default is
   * 50.
   *
   * @param {date} [options.receivedAfter] Limits results to only messages
   * received after this date/time.
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {MessageListResult} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {object} [result]   - The deserialized result object if an error did not occur.
   *                      See {@link MessageListResult} for more information.
   */
  list(server, options = {}, optionalCallback) {
    const self = this;
    const url = `api/messages`;

    const qs = {
      server,
      page: options.page,
      itemsPerPage: options.itemsPerPage,
      receivedAfter: options.receivedAfter
    };

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.get(url, { qs }, (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(err || self.client.httpError(response));
          }
          resolve(new MessageListResult(body));
        });
      });
    } else {
      self.client.request.get(url, { qs }, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return optionalCallback(err || self.client.httpError(response));
        }
        optionalCallback(null, new MessageListResult(body));
      });
    }
  }

  /**
   * @summary Delete all messages
   *
   * Permanently deletes all messages held by the specified server. This
   * operation cannot be undone. Also deletes any attachments related to each
   * message.
   *
   * @param {string} server The identifier of the server to be emptied.
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {null} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {null} [result]   - The deserialized result object if an error did not occur.
   */
  deleteAll(server, optionalCallback) {
    const self = this;
    const url = `api/messages`;

    const qs = {
      server
    };

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.del(url, { qs }, (err, response) => {
          if (err || response.statusCode !== 204) {
            return reject(err || self.client.httpError(response));
          }
          resolve();
        });
      });
    } else {
      self.client.request.del(url, { qs }, (err, response) => {
        if (err || response.statusCode !== 204) {
          return optionalCallback(err || self.client.httpError(response));
        }
        optionalCallback(null);
      });
    }
  }

  /**
   * @summary Search for messages
   *
   * Returns a list of messages matching the specified search criteria, in
   * summary form. The messages are returned sorted by received date, with the
   * most recently-received messages appearing first.
   *
   * @param {string} server The identifier of the server hosting the messages.
   *
   * @param {object} criteria The search criteria to match results against.
   *
   * @param {string} [criteria.sentTo] The full email address to which the target
   * email was sent.
   *
   * @param {string} [criteria.subject] The value to seek within the target
   * email's subject line.
   *
   * @param {string} [criteria.body] The value to seek within the target email's
   * HTML or text body.
   *
   * @param {object} [options] Optional Parameters.
   *
   * @param {number} [options.page] Used in conjunction with `itemsPerPage` to
   * support pagination.
   *
   * @param {number} [options.itemsPerPage] A limit on the number of results to
   * be returned per page. Can be set between 1 and 1000 items, the default is
   * 50.
   *
   * @param {number} [options.timeout] Specify how long to wait for a matching
   * result (in milliseconds).
   *
   * @param {date} [options.receivedAfter] Limits results to only messages
   * received after this date/time.
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {MessageListResult} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {object} [result]   - The deserialized result object if an error did not occur.
   *                      See {@link MessageListResult} for more information.
   */
  search(server, criteria, options = {}, optionalCallback) {
    const self = this;
    const url = `api/messages/search`;
    let pollCount = 0;
    const startTime = Date.now();

    const qs = {
      server,
      page: options.page,
      itemsPerPage: options.itemsPerPage,
      receivedAfter: options.receivedAfter
    };

    if (!Number.isInteger(options.timeout)) {
      options.timeout = 0; // eslint-disable-line no-param-reassign
    }

    if (!optionalCallback) {
      const fn = (resolve, reject) => () => {
        self.client.request.post(url, { qs, body: criteria }, (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(err || self.client.httpError(response));
          }

          if (options.timeout && !body.items.length) {
            const delayPattern = (response.headers['x-ms-delay'] || '1000')
              .split(',')
              .map(x => parseInt(x, 10));

            const delay = (pollCount >= delayPattern.length) ?
              delayPattern[delayPattern.length - 1] :
              delayPattern[pollCount];

            pollCount += 1;

            // Stop if timeout will be exceeded
            if (((Date.now() - startTime) + delay) > options.timeout) {
              return reject(new MailosaurError('No matching messages found in time. By default, only messages received in the last hour are checked (use receivedAfter to override this).', 'search_timeout'));
            }

            return setTimeout(fn(resolve, reject), delay);
          }

          resolve(new MessageListResult(body));
        });
      };

      return new Promise((resolve, reject) => {
        fn(resolve, reject)();
      });
    } else {
      const fn = () => {
        self.client.request.post(url, { qs, body: criteria }, (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return optionalCallback(err || self.client.httpError(response));
          }

          if (options.timeout && !body.items.length) {
            const delayPattern = (response.headers['x-ms-delay'] || '1000')
              .split(',')
              .map(x => parseInt(x, 10));

            const delay = (pollCount >= delayPattern.length) ?
              delayPattern[delayPattern.length - 1] :
              delayPattern[pollCount];

            pollCount += 1;

            // Stop if timeout will be exceeded
            if (((Date.now() - startTime) + delay) > options.timeout) {
              return optionalCallback(self.client.httpError(response));
            }

            return setTimeout(fn, delay);
          }

          optionalCallback(null, new MessageListResult(body));
        });
      };

      fn();
    }
  }
}

module.exports = Messages;
