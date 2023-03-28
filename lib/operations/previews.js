const PreviewEmailClientListResult = require('../models/previewEmailClientListResult');

class Previews {
  constructor(client) {
    this.client = client;
  }

  listEmailClients() {
    const self = this;
    const url = `api/previews/clients`;

    return new Promise((resolve, reject) => {
      self.client.request.get(url, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return reject(err || self.client.httpError(response));
        }
        resolve(new PreviewEmailClientListResult(body));
      });
    });
  }
}

module.exports = Previews;
