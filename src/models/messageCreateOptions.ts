import type Attachment from './attachment';

/**
 * Options to use when creating a new message.
 */
class MessageCreateOptions {
  /**
   * The email address to which the email will be sent. Must be a verified email address.
   */
  to?: string;
  /**
   * The email address to which the email will be CC'd to. Must be a verified email address.
   */
  cc?: string;
  /**
   * Allows for the partial override of the message's 'from' address. This **must** be an address ending with `YOUR_SERVER.mailosaur.net`, such as `my-emails@a1bcdef2.mailosaur.net`.
   */
  from?: string;
  /**
   * If true, email will be sent upon creation.
   */
  send?: boolean;
  /**
   * The email subject line.
   */
  subject?: string;
  /**
   * The plain text body of the message. Note that only text or html can be supplied, not both.
   */
  text?: string;
  /**
   * The HTML body of the message. Note that only text or html can be supplied, not both.
   */
  html?: string;
  /**
   * Any message attachments.
   */
  attachments?: Attachment[];

  constructor(data: Record<string, any> = {}) {
    this.to = data.to;
    this.cc = data.cc;
    this.from = data.from;
    this.send = data.send;
    this.subject = data.subject;
    this.text = data.text;
    this.html = data.html;
    this.attachments = data.attachments;
  }
}

export default MessageCreateOptions;
