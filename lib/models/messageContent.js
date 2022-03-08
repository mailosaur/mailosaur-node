const Link = require('./link');
const Code = require('./code');
const Image = require('./image');

class MessageContent {
  constructor(data = {}) {
    this.links = (data.links || []).map((i) => (new Link(i)));
    this.codes = (data.codes || []).map((i) => (new Code(i)));

    if (data.images) {
      this.images = (data.images || []).map((i) => (new Image(i)));
    }

    this.body = data.body;
  }
}

module.exports = MessageContent;
