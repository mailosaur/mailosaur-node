import MessageAddress from './messageAddress';

/**
 * A summary of the message processed by Mailosaur. This summary does not include
 * the contents of the email or SMS message, for which you will need the full
 * message object.
 */
class MessageSummary {
  /**
   * Unique identifier for the message.
   */
  id: string;
  /**
   * The type of message.
   */
  type: 'Email' | 'SMS';
  /**
   * Identifier for the server in which the message is located.
   */
  server?: string;
  /**
   * The sender of the message.
   */
  from?: MessageAddress[];
  /**
   * The recipients of the message.
   */
  to?: MessageAddress[];
  /**
   * Carbon-copied recipients for email messages.
   */
  cc?: MessageAddress[];
  /**
   * Blind carbon-copied recipients for email messages.
   */
  bcc?: MessageAddress[];
  /**
   * The date/time that this message was received by Mailosaur.
   */
  received?: Date;
  /**
   * The subject of the message.
   */
  subject?: string;
  /**
   * A short, summarized version of the message content.
   */
  summary?: string;
  /**
   * The number of attachments associated with the message.
   */
  attachments?: number;

  constructor(data: Record<string, any> = {}) {
    this.id = data.id;
    this.type = data.type;
    this.server = data.server;
    this.from = (data.from || []).map((i: any) => new MessageAddress(i));
    this.to = (data.to || []).map((i: any) => new MessageAddress(i));
    this.cc = (data.cc || []).map((i: any) => new MessageAddress(i));
    this.bcc = (data.bcc || []).map((i: any) => new MessageAddress(i));
    this.received = new Date(data.received);
    this.subject = data.subject;
    this.summary = data.summary;
    this.attachments = data.attachments || 0;
  }
}

export default MessageSummary;
