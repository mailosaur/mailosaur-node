const MessageHeader = require('./messageHeader');

class Metadata {
  constructor(data = {}) {
    this.headers = (data.headers || []).map((i) => (new MessageHeader(i)));
  }
}

module.exports = Metadata;
