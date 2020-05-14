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
    const self = this;
    const url = `api/files/attachments/${id}`;

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.get(url, { buffer: true }, (err, response, body) => (
          err ? reject(err) : resolve(body)
        ));
      });
    } else {
      self.client.request.get(url, { buffer: true }, (err, response, body) => (
        optionalCallback(err, body)
      ));
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
    const self = this;
    const url = `api/files/email/${id}`;

    if (!optionalCallback) {
      return new Promise((resolve, reject) => {
        self.client.request.get(url, { buffer: true }, (err, response, body) => (
          err ? reject(err) : resolve(body)
        ));
      });
    } else {
      self.client.request.get(url, { buffer: true }, (err, response, body) => (
        optionalCallback(err, body)
      ));
    }
  }
}

module.exports = Files;
