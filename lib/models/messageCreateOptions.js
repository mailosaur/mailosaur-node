/**
 * Class representing a MessageCreateOptions.
 */
class MessageCreateOptions {
  /**
   * Create a MessageCreateOptions.
   * @member {string} [to] The email address to which the email will be sent.
   * @member {boolean} [send] If true, email will be sent upon creation.
   * @member {string} [subject] The email subject line.
   * @member {string} [text] The plain text body of the email. Note that only text or html can be supplied, not both.
   * @member {string} [html] The HTML body of the email. Note that only text or html can be supplied, not both.
   * @member {array} [attachments] Any message attachments.
   */
  constructor(data = {}) {
    this.to = data.to;
    this.send = data.send;
    this.subject = data.subject;
    this.text = data.text;
    this.html = data.html;
    this.attachments = data.attachments;
  }
}

module.exports = MessageCreateOptions;
