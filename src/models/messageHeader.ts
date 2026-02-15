/**
 * Message header key/value pair.
 */
class MessageHeader {
  /**
   * Header key.
   */
  field?: string;
  /**
   * Header value.
   */
  value?: string;

  constructor(data: Record<string, any> = {}) {
    this.field = data.field;
    this.value = data.value;
  }
}

export default MessageHeader;
