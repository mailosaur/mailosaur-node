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
   * @member {string} [match] If set to ALL (default), then only results that match all
   * specified criteria will be returned. If set to ANY, results that match any of the
   * specified criteria will be returned.
   */
  constructor(data = {}) {
    this.sentTo = data.sentTo;
    this.subject = data.subject;
    this.body = data.body;
    this.match = data.match;
  }
}

module.exports = SearchCriteria;
