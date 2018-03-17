'use strict';

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
   * @summary Retrieve a message
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
  get(id, optionalCallback) {
    let client = this.client;
    let self = this;
    let url = `api/messages/${id}`;

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.get(url, (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(new MailosaurError(response));
          }
          resolve(new Message(body));
        });
      });
    } else {
      self.client.request.get(url, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return optionalCallback(new MailosaurError(response));
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
    let client = this.client;
    let self = this;
    let url = `api/messages/${id}`;

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.del(url, (err, response, body) => {
          if (err || response.statusCode !== 204) {
            return reject(new MailosaurError(response));
          }          
          resolve();
        });
      });
    } else {
      self.client.request.del(url, (err, response, body) => {
        if (err || response.statusCode !== 204) {
          return optionalCallback(new MailosaurError(response));
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
  list(server, options, optionalCallback) {
    let client = this.client;
    let self = this;
    let url = `api/messages`;

    options = options || {};
    let qs = {
      server: server,
      page: options.page,
      itemPerPage: options.itemsPerPage
    };

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.get(url, { qs: qs }, (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(new MailosaurError(response));
          }       
          resolve(new MessageListResult(body));
        });
      });
    } else {
      self.client.request.get(url, { qs: qs }, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return optionalCallback(new MailosaurError(response));
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
    let client = this.client;
    let self = this;
    let url = `api/messages`;

    let qs = {
      server: server
    };

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.del(url, { qs: qs }, (err, response, body) => {
          if (err || response.statusCode !== 204) {
            return reject(new MailosaurError(response));
          }          
          resolve();
        });
      });
    } else {
      self.client.request.del(url, { qs: qs }, (err, response, body) => {
        if (err || response.statusCode !== 204) {
          return optionalCallback(new MailosaurError(response));
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
  search(server, criteria, options, optionalCallback) {
    let client = this.client;
    let self = this;
    let url = `api/messages/search`;

    options = options || {};
    let qs = {
      server: server,
      page: options.page,
      itemPerPage: options.itemsPerPage
    };

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.post(url, { qs: qs, body: criteria }, (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(new MailosaurError(response));
          }          
          resolve(new MessageListResult(body));
        });
      });
    } else {
      self.client.request.get(url, { qs: qs, body: criteria }, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return optionalCallback(new MailosaurError(response));
        }
        optionalCallback(null, new MessageListResult(body));
      });
    }
  }

  /**
   * @summary Wait for a specific message
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
  waitFor(server, criteria, optionalCallback) {
    let client = this.client;
    let self = this;
    let url = `api/messages/await`;

    let qs = {
      server: server
    };

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.post(url, { qs: qs, body: criteria }, (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(new MailosaurError(response));
          }          
          resolve(new Message(body));
        });
      });
    } else {
      self.client.request.get(url, { qs: qs, body: criteria }, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return optionalCallback(new MailosaurError(response));
        }
        optionalCallback(null, new Message(body));
      });
    }
  }
}

module.exports = Messages;
