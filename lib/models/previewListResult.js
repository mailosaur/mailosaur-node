const Preview = require('./preview');

class PreviewListResult {
  constructor(data = {}) {
    this.items = (data.items || []).map((i) => (new Preview(i)));
  }
}

module.exports = PreviewListResult;
