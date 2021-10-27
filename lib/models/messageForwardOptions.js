/**
 * Class representing a MessageForwardOptions.
 */
class MessageForwardOptions {
  /**
   * Create a MessageForwardOptions.
   * @member {string} [to] The email address to which the email will be sent.
   * @member {string} [text] Any additional plain text content to forward the email with. Note that only text or html can be supplied, not both.
   * @member {string} [html] Any additional HTML content to forward the email with. Note that only html or text can be supplied, not both.
   */
  constructor(data = {}) {
    this.to = data.to;
    this.text = data.text;
    this.html = data.html;
  }
}

module.exports = MessageForwardOptions;
