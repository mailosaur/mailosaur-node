const UsageAccountLimits = require('../models/usageAccountLimits');
const UsageTransactionListResult = require('../models/usageTransactionListResult');

class Usage {
  constructor(client) {
    this.client = client;
  }

  limits() {
    const url = `api/usage/limits`;

    return new Promise((resolve, reject) => {
      this.client.request.get(url, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return reject(err || this.client.httpError(response));
        }
        resolve(new UsageAccountLimits(body));
      });
    });
  }

  transactions() {
    const url = `api/usage/transactions`;

    return new Promise((resolve, reject) => {
      this.client.request.get(url, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return reject(err || this.client.httpError(response));
        }
        resolve(new UsageTransactionListResult(body));
      });
    });
  }
}

module.exports = Usage;
