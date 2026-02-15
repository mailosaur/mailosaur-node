import Attachment from './attachment';

class MessageReplyOptions {
  cc?: string;
  text?: string;
  html?: string;
  attachments?: Attachment[];

  constructor(data: Record<string, any> = {}) {
    this.text = data.text;
    this.html = data.html;
    this.attachments = data.attachments;
    this.cc = data.cc;
  }
}

export default MessageReplyOptions;
