'use strict';

const MailosaurError = require('../models/mailosaurError');
const ServerListResult = require('../models/serverListResult');
const Server = require('../models/server');

/** Class representing Servers operations. */
class Servers {
  /**
   * Create a Servers.
   * @param {MailosaurClient} client Reference to the Mailosaur client.
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * @summary List all servers
   *
   * Returns a list of your virtual SMTP servers. Servers are returned sorted in
   * alphabetical order.
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {ServerListResult} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {object} [result]   - The deserialized result object if an error did not occur.
   *                      See {@link ServerListResult} for more information.
   */
  list(optionalCallback) {
    let client = this.client;
    let self = this;
    let url = `api/servers`;

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.get(url, (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(new MailosaurError(response));
          }          
          resolve(new ServerListResult(body));
        });
      });
    } else {
      self.client.request.get(url, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return optionalCallback(new MailosaurError(response));
        }
        optionalCallback(null, new ServerListResult(body));
      });
    }
  }

  /**
   * @summary Create a server
   *
   * Creates a new virtual SMTP server and returns it.
   *
   * @param {object} serverCreateOptions
   *
   * @param {string} [serverCreateOptions.name] A name used to identify the
   * server.
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {Server} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {object} [result]   - The deserialized result object if an error did not occur.
   *                      See {@link Server} for more information.
   */
  create(serverCreateOptions, optionalCallback) {
    let client = this.client;
    let self = this;
    let url = `api/servers`;

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.post(url, { body: serverCreateOptions }, (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(new MailosaurError(response));
          }          
          resolve(new Server(body));
        });
      });
    } else {
      self.client.request.post(url, { body: serverCreateOptions }, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return optionalCallback(new MailosaurError(response));
        }
        optionalCallback(null, new Server(body));
      });
    }
  }

  /**
   * @summary Retrieve a server
   *
   * Retrieves the detail for a single server. Simply supply the unique
   * identifier for the required server.
   *
   * @param {string} id The identifier of the server to be retrieved.
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {Server} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {object} [result]   - The deserialized result object if an error did not occur.
   *                      See {@link Server} for more information.
   */
  get(id, optionalCallback) {
    let client = this.client;
    let self = this;
    let url = `api/servers/${id}`;

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.get(url, (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(new MailosaurError(response));
          }          
          resolve(new Server(body));
        });
      });
    } else {
      self.client.request.get(url, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return optionalCallback(new MailosaurError(response));
        }
        optionalCallback(null, new Server(body));
      });
    }
  }

  /**
   * @summary Update a server
   *
   * Updats a single server and returns it.
   *
   * @param {string} id The identifier of the server to be updated.
   *
   * @param {object} server
   *
   * @param {string} [server.id] Unique identifier for the server. Used as
   * username for SMTP/POP3 authentication.
   *
   * @param {string} [server.password] SMTP/POP3 password.
   *
   * @param {string} [server.name] A name used to identify the server.
   *
   * @param {array} [server.users] Users (excluding administrators) who have
   * access to the server.
   *
   * @param {number} [server.messages] The number of messages currently in the
   * server.
   *
   * @param {array} [server.forwardingRules] The rules used to manage email
   * forwarding for this server.
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {Server} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {object} [result]   - The deserialized result object if an error did not occur.
   *                      See {@link Server} for more information.
   */
  update(id, server, optionalCallback) {
    let client = this.client;
    let self = this;
    let url = `api/servers/${id}`;

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.put(url, { body: server }, (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(new MailosaurError(response));
          }          
          resolve(new Server(body));
        });
      });
    } else {
      self.client.request.put(url, { body: server }, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return optionalCallback(new MailosaurError(response));
        }
        optionalCallback(null, new Server(body));
      });
    }
  }

  /**
   * @summary Delete a server
   *
   * Permanently deletes a server. This operation cannot be undone. Also deletes
   * all messages and associated attachments within the server.
   *
   * @param {string} id The identifier of the server to be deleted.
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
    let url = `api/servers/${id}`;

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
   * @summary Generate random email address for a server
   *
   * Generates a random email address for a given server.
   *
   * @param {string} server The identifier of the server to use.
   *
   * @returns {string} Returns a string.
   *
   * {string} A string is returned
   *
   *                      {string} - The randomly generated email address.
   */
  generateEmailAddress(server) {
    var host = process.env.MAILOSAUR_SMTP_HOST || 'mailosaur.io';
    var random = (Math.random() + 1).toString(36).substring(7);
    return `${random}.${server}@${host}`;
  }
}

module.exports = Servers;
