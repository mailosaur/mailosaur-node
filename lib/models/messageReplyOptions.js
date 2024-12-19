class MessageReplyOptions {
  constructor(data = {}) {
    this.text = data.text;
    this.html = data.html;
    this.attachments = data.attachments;
    this.cc = data.cc;
  }
}

module.exports = MessageReplyOptions;
