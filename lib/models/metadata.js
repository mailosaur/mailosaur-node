'use strict';

const MessageHeader = require('./messageHeader');

/**
 * Advanced use case content related to the message.
 *
 */
class Metadata {
  /**
   * Create a Metadata.
   * @member {array} [headers] Email headers.
   */
  constructor(data) {
    this.headers = (data.headers || []).map((i) => (new MessageHeader(i)));
  }
}

module.exports = Metadata;
