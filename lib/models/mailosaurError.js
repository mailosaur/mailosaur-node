'use strict';

/**
 * Class representing a MailosaurError.
 */
class MailosaurError extends Error {
  /**
   * Create a MailosaurError.
   * @member {string} [type] Possible values include: 'None',
   * 'ValidationError', 'AuthenticationError', 'PermissionDeniedError',
   * 'ResourceNotFoundError'
   * @member {object} [messages]
   * @member {object} [model]
   */
  constructor(response) {
    super(`Operation returned an invalid status code '${response.statusCode}'`);

    // this.message1 = {};

    if (response.statusCode === 400) {
      this.mailosaurError = {
        type: response.body.type,
        messages: response.body.messages,
        model: response.body.model
      };
    }
  }
}

module.exports = MailosaurError;
