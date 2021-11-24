/**
 * Class representing a MessageReplyOptions.
 */
class MessageReplyOptions {
  /**
   * Create a MessageReplyOptions.
   * @member {string} [text] Any additional plain text content to include in the reply. Note that only text or html can be supplied, not both.
   * @member {string} [html] Any additional HTML content to include in the reply. Note that only html or text can be supplied, not both.
   * @member {array} [attachments] Any message attachments.
   */
  constructor(data = {}) {
    this.text = data.text;
    this.html = data.html;
    this.attachments = data.attachments;
  }
}

module.exports = MessageReplyOptions;
