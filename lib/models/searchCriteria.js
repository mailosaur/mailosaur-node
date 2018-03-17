'use strict';

/**
 * Class representing a SearchCriteria.
 */
class SearchCriteria {
  /**
   * Create a SearchCriteria.
   * @member {string} [sentTo] The full email address to which the target email
   * was sent.
   * @member {string} [subject] The value to seek within the target email's
   * subject line.
   * @member {string} [body] The value to seek within the target email's HTML
   * or text body.
   */
  constructor(data) {
    data = data || {};

    this.sentTo = data.sentTo;
    this.subject = data.subject;
    this.body = data.body;
  }
}

module.exports = SearchCriteria;
