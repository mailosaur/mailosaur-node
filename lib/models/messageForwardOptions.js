class MessageForwardOptions {
  constructor(data = {}) {
    this.to = data.to;
    this.cc = data.cc;
    this.text = data.text;
    this.html = data.html;
  }
}

module.exports = MessageForwardOptions;
