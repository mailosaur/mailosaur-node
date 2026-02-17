/**
 * Options to use when forwarding a message.
 */
class MessageForwardOptions {
  /**
   * The email address to which the email will be sent. Must be a verified email address.
   */
  to: string;
  /**
   * The email address to which the email will be CC'd to. Must be a verified email address.
   */
  cc?: string;
  /**
   * Any plain text to include when forwarding the message. Note that only text or html can be supplied, not both.
   */
  text?: string;
  /**
   * Any HTML content to include when forwarding the message. Note that only text or html can be supplied, not both.
   */
  html?: string;

  constructor(data: Record<string, any> = {}) {
    this.to = data.to;
    this.cc = data.cc;
    this.text = data.text;
    this.html = data.html;
  }
}

export default MessageForwardOptions;
