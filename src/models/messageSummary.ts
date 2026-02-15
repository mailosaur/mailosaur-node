import MessageAddress from './messageAddress';

class MessageSummary {
  id: string;
  type: 'Email' | 'SMS';
  server?: string;
  from?: MessageAddress[];
  to?: MessageAddress[];
  cc?: MessageAddress[];
  bcc?: MessageAddress[];
  received?: Date;
  subject?: string;
  summary?: string;
  attachments?: number;

  constructor(data: Record<string, any> = {}) {
    this.id = data.id;
    this.type = data.type;
    this.server = data.server;
    this.from = (data.from || []).map((i: any) => (new MessageAddress(i)));
    this.to = (data.to || []).map((i: any) => (new MessageAddress(i)));
    this.cc = (data.cc || []).map((i: any) => (new MessageAddress(i)));
    this.bcc = (data.bcc || []).map((i: any) => (new MessageAddress(i)));
    this.received = new Date(data.received);
    this.subject = data.subject;
    this.summary = data.summary;
    this.attachments = data.attachments || 0;
  }
}

export default MessageSummary;
