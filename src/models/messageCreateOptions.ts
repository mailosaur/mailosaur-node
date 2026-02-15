import Attachment from './attachment';

class MessageCreateOptions {
  to?: string;
  cc?: string;
  from?: string;
  send?: boolean;
  subject?: string;
  text?: string;
  html?: string;
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
