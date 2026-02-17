/**
 * @class
 * Initializes a new instance of the MailosaurError class.
 * @constructor
 * @member {string} [errorType]
 * @member {number} [httpStatusCode]
 * @member {string} [httpResponseBody]
 */
class MailosaurError extends Error {
  errorType?: string;
  httpStatusCode?: number | null;
  httpResponseBody?: string | null;

  constructor(
    message: string,
    errorType?: string,
    httpStatusCode: number | null = null,
    httpResponseBody: string | null = null
  ) {
    super(message);
    this.errorType = errorType;
    this.httpStatusCode = httpStatusCode;
    this.httpResponseBody = httpResponseBody;

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, MailosaurError);
    }
  }
}

export default MailosaurError;
