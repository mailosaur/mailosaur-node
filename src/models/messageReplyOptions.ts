import type Attachment from './attachment';

/**
 * Options to use when replying to a message.
 */
class MessageReplyOptions {
  /**
   * The email address to which the email will be CC'd to. Must be a verified email address.
   */
  cc?: string;
  /**
   * Any additional plain text content to include in the reply. Note that only text or html can be supplied, not both.
   */
  text?: string;
  /**
   * Any additional HTML content to include in the reply. Note that only html or text can be supplied, not both.
   */
  html?: string;
  /**
   * Any message attachments.
   */
  attachments?: Attachment[];

  constructor(data: Record<string, any> = {}) {
    this.text = data.text;
    this.html = data.html;
    this.attachments = data.attachments;
    this.cc = data.cc;
  }
}

export default MessageReplyOptions;
