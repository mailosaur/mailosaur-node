const MailosaurError = require('../models/mailosaurError');

class Files {
  constructor(client) {
    this.client = client;
  }

  getAttachment(attachmentId) {
    const self = this;
    const url = `api/files/attachments/${attachmentId}`;

    return new Promise((resolve, reject) => {
      self.client.request.get(url, { buffer: true }, (err, response, body) => (
        err ? reject(err) : resolve(body)
      ));
    });
  }

  getEmail(messageId) {
    const self = this;
    const url = `api/files/email/${messageId}`;

    return new Promise((resolve, reject) => {
      self.client.request.get(url, { buffer: true }, (err, response, body) => (
        err ? reject(err) : resolve(body)
      ));
    });
  }

  getPreview(previewId) {
    const self = this;
    const timeout = 120000;
    let pollCount = 0;
    const startTime = Date.now();

    const fn = (resolve, reject) => () => {
      const url = `api/files/screenshots/${previewId}`;

      self.client.request.get(url, { buffer: true }, (err, response, body) => {
        if (err) {
          return reject(err);
        }

        if (response.statusCode === 200) {
          return resolve(body);
        }

        if (response.statusCode !== 202) {
          return reject(self.client.httpError(response));
        }

        const delayPattern = (response.headers['x-ms-delay'] || '1000')
          .split(',')
          .map(x => parseInt(x, 10));

        const delay = (pollCount >= delayPattern.length) ?
          delayPattern[delayPattern.length - 1] :
          delayPattern[pollCount];

        pollCount += 1;

        // Stop if timeout will be exceeded
        if (((Date.now() - startTime) + delay) > timeout) {
          return reject(new MailosaurError(`An email preview was not generated in time. The email client may not be available, or the preview ID [${previewId}] may be incorrect.`, 'preview_timeout'));
        }

        return setTimeout(fn(resolve, reject), delay);
      });
    };

    return new Promise((resolve, reject) => {
      fn(resolve, reject)();
    });
  }
}

module.exports = Files;
