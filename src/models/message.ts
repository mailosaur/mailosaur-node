import MessageAddress from './messageAddress';
import MessageContent from './messageContent';
import Attachment from './attachment';
import Metadata from './metadata';

/**
 * The email or SMS message processed by Mailosaur.
 */
class Message {
  /**
   * Unique identifier for the message.
   */
  id?: string;
  /**
   * The type of message.
   */
  type: 'Email' | 'SMS';
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
   * Message content that was sent in HTML format.
   */
  html?: MessageContent;
  /**
   * Message content that was sent in plain text format.
   */
  text?: MessageContent;
  /**
   * An array of attachment metadata for any attached files.
   */
  attachments?: Attachment[];
  /**
   * Further metadata related to the message, including email headers.
   */
  metadata?: Metadata;
  /**
   * Identifier for the server in which the message is located.
   */
  server?: string;

  constructor(data: Record<string, any> = {}) {
    this.id = data.id;
    this.type = data.type;
    this.from = (data.from || []).map(
      (i: Record<string, unknown>) => new MessageAddress(i)
    );
    this.to = (data.to || []).map(
      (i: Record<string, unknown>) => new MessageAddress(i)
    );
    this.cc = (data.cc || []).map(
      (i: Record<string, unknown>) => new MessageAddress(i)
    );
    this.bcc = (data.bcc || []).map(
      (i: Record<string, unknown>) => new MessageAddress(i)
    );
    this.received = new Date(data.received);
    this.subject = data.subject;
    this.html = new MessageContent(data.html);
    this.text = new MessageContent(data.text);
    this.attachments = (data.attachments || []).map(
      (i: Record<string, unknown>) => new Attachment(i)
    );
    this.metadata = new Metadata(data.metadata);
    this.server = data.server;
  }
}

export default Message;
