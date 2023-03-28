const PreviewEmailClient = require('./previewEmailClient');

class PreviewEmailClientListResult {
  constructor(data = {}) {
    this.items = (data.items || []).map((i) => (new PreviewEmailClient(i)));
  }
}

module.exports = PreviewEmailClientListResult;
