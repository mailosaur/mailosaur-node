/**
 * The criteria with which to find messages during a search.
 */
class SearchCriteria {
  /**
   * The full email address (or phone number for SMS) from which the target message was sent.
   */
  sentFrom?: string;
  /**
   * The full email address (or phone number for SMS) to which the target message was sent.
   */
  sentTo?: string;
  /**
   * The value to seek within the subject line of a target email.
   */
  subject?: string;
  /**
   * The value to seek within the body of the target message.
   */
  body?: string;
  /**
   * If set to `ALL` (default), then only results that match all specified criteria will be returned.
   * If set to `ANY`, results that match any of the specified criteria will be returned.
   */
  match?: 'ALL' | 'ANY';

  constructor(data: Record<string, any> = {}) {
    this.sentFrom = data.sentFrom;
    this.sentTo = data.sentTo;
    this.subject = data.subject;
    this.body = data.body;
    this.match = data.match;
  }
}

export default SearchCriteria;
