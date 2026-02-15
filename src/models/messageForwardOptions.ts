class MessageForwardOptions {
  to: string;
  cc?: string;
  text?: string;
  html?: string;

  constructor(data: Record<string, any> = {}) {
    this.to = data.to;
    this.cc = data.cc;
    this.text = data.text;
    this.html = data.html;
  }
}

export default MessageForwardOptions;
