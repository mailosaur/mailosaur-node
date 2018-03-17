'use strict';

const MessageSummary = require('./messageSummary');

/**
 * The result of a message listing request.
 *
 */
class MessageListResult {
  /**
   * Create a MessageListResult.
   * @member {array} [items] The individual summaries of each message forming
   * the result. Summaries are returned sorted by received date, with the most
   * recently-received messages appearing first.
   */
  constructor(data) {
    this.items = (data.items || []).map((i) => (new MessageSummary(i)));
  }
}

module.exports = MessageListResult;
