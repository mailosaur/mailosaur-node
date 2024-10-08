const SpamAnalysisResult = require('../models/spamAnalysisResult');
const DeliverabilityReport = require('../models/deliverabilityReport');

class Analysis {
  constructor(client) {
    this.client = client;
  }

  spam(messageId) {
    const self = this;
    const url = `api/analysis/spam/${messageId}`;

    return new Promise((resolve, reject) => {
      self.client.request.get(url, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return reject(err || self.client.httpError(response));
        }
        resolve(new SpamAnalysisResult(body));
      });
    });
  }

  deliverability(messageId) {
    const self = this;
    const url = `api/analysis/deliverability/${messageId}`;

    return new Promise((resolve, reject) => {
      self.client.request.get(url, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return reject(err || self.client.httpError(response));
        }
        resolve(new DeliverabilityReport(body));
      });
    });
  }
}

module.exports = Analysis;
