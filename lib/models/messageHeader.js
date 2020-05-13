/**
 * Class representing a MessageHeader.
 */
class MessageHeader {
  /**
   * Create a MessageHeader.
   * @member {string} [field] Header key.
   * @member {string} [value] Header value.
   */
  constructor(data = {}) {
    this.field = data.field;
    this.value = data.value;
  }
}

module.exports = MessageHeader;
