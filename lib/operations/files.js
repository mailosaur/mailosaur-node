'use strict';

const MailosaurError = require('../models/mailosaurError');

/** Class representing Files operations. */
class Files {
  /**
   * Create a Files.
   * @param {MailosaurClient} client Reference to the Mailosaur client.
   */
  constructor(client) {
    this.client = client;
  }

  /**
   * @summary Download an attachment
   *
   * Downloads a single attachment. Simply supply the unique identifier for the
   * required attachment.
   *
   * @param {uuid} id The identifier of the attachment to be downloaded.
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {Object} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {object} [result]   - The deserialized result object if an error did not occur.
   */
  getAttachment(id, optionalCallback) {
    let client = this.client;
    let self = this;
    let url = `api/files/attachments/${id}`;
    let buffers = [];

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.get(url)
          .on('data', (chunk) => buffers.push(chunk))
          .on('end', () => resolve(Buffer.concat(buffers)));
      });
    } else {
      self.client.request.get(url)
          .on('data', (chunk) => buffers.push(chunk))
          .on('end', () => optionalCallback(null, Buffer.concat(buffers)));
    }
  }

  /**
   * @summary Download EML
   *
   * Downloads an EML file representing the specified email. Simply supply the
   * unique identifier for the required email.
   *
   * @param {uuid} id The identifier of the email to be downloaded.
   *
   * @param {function} [optionalCallback] - The optional callback.
   *
   * @returns {function|Promise} If a callback was passed as the last parameter
   * then it returns the callback else returns a Promise.
   *
   * {Promise} A promise is returned
   *
   *                      @resolve {Object} - The deserialized result object.
   *
   *                      @reject {Error} - The error object.
   *
   * {function} optionalCallback(err, result, request, response)
   *
   *                      {Error}  err        - The Error object if an error occurred, null otherwise.
   *
   *                      {object} [result]   - The deserialized result object if an error did not occur.
   */
  getEmail(id, optionalCallback) {
    let client = this.client;
    let self = this;
    let url = `api/files/email/${id}`;
    let buffers = [];

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.get(url)
          .on('data', (chunk) => buffers.push(chunk))
          .on('end', () => resolve(Buffer.concat(buffers)));
      });
    } else {
      self.client.request.get(url)
          .on('data', (chunk) => buffers.push(chunk))
          .on('end', () => optionalCallback(null, Buffer.concat(buffers)));
    }
  }
}

module.exports = Files;
