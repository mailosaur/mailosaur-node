import MessageAddress from './messageAddress';
import MessageContent from './messageContent';
import Attachment from './attachment';
import Metadata from './metadata';

class Message {
  id?: string;
  type: 'Email' | 'SMS';
  from?: MessageAddress[];
  to?: MessageAddress[];
  cc?: MessageAddress[];
  bcc?: MessageAddress[];
  received?: Date;
  subject?: string;
  html?: MessageContent;
  text?: MessageContent;
  attachments?: Attachment[];
  metadata?: Metadata;
  server?: string;

  constructor(data: Record<string, any> = {}) {
    this.id = data.id;
    this.type = data.type;
    this.from = (data.from || []).map((i: any) => (new MessageAddress(i)));
    this.to = (data.to || []).map((i: any) => (new MessageAddress(i)));
    this.cc = (data.cc || []).map((i: any) => (new MessageAddress(i)));
    this.bcc = (data.bcc || []).map((i: any) => (new MessageAddress(i)));
    this.received = new Date(data.received);
    this.subject = data.subject;
    this.html = new MessageContent(data.html);
    this.text = new MessageContent(data.text);
    this.attachments = (data.attachments || []).map((i: any) => (new Attachment(i)));
    this.metadata = new Metadata(data.metadata);
    this.server = data.server;
  }
}

export default Message;
