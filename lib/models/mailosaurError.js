/**
 * Class representing a MailosaurError.
 */
class MailosaurError extends Error {
  /**
   * Create a MailosaurError.
   * @member {string} [errorType]
   * @member {number} [httpStatusCode]
   * @member {string} [httpResponseBody]
   */
  constructor(message, errorType, httpStatusCode = null, httpResponseBody = null) {
    super(message);

    this.errorType = errorType;
    this.httpStatusCode = httpStatusCode;
    this.httpResponseBody = httpResponseBody;
  }
}

module.exports = MailosaurError;
