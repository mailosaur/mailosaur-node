const MailosaurError = require('../models/mailosaurError');
const Message = require('../models/message');
const MessageListResult = require('../models/messageListResult');
const PreviewListResult = require('../models/previewListResult');

class Messages {
  constructor(client) {
    this.client = client;
  }

  get(serverId, criteria, options = {}) {
    const getByIdError = new MailosaurError(
      'Must provide a valid Server ID.',
      'invalid_request'
    );

    // Ensure we only return 1 result
    options.page = 0;
    options.itemsPerPage = 1;

    // Default timeout to 10s
    options.timeout = options.timeout || 10000;

    // Default receivedAfter to 1h
    options.receivedAfter =
      options.receivedAfter || new Date(Date.now() - 3600000);

    if (serverId.length !== 8) {
      return new Promise((_resolve, reject) => {
        reject(getByIdError);
      });
    }

    return new Promise((resolve, reject) => {
      this.search(serverId, criteria, options)
        .then(result => this.getById(result.items[0].id))
        .then(message => {
          resolve(message);
        })
        .catch(reject);
    });
  }

  getById(messageId) {
    const url = `api/messages/${messageId}`;

    return new Promise((resolve, reject) => {
      this.client.request.get(url, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return reject(err || this.client.httpError(response));
        }
        resolve(new Message(body));
      });
    });
  }

  del(messageId) {
    const url = `api/messages/${messageId}`;

    return new Promise((resolve, reject) => {
      this.client.request.del(url, (err, response) => {
        if (err || response.statusCode !== 204) {
          return reject(err || this.client.httpError(response));
        }
        resolve();
      });
    });
  }

  list(serverId, options = {}) {
    const url = `api/messages`;

    const qs = {
      server: serverId,
      page: options.page,
      itemsPerPage: options.itemsPerPage,
      receivedAfter: options.receivedAfter,
      dir: options.dir,
    };

    return new Promise((resolve, reject) => {
      this.client.request.get(url, { qs }, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return reject(err || this.client.httpError(response));
        }
        resolve(new MessageListResult(body));
      });
    });
  }

  deleteAll(serverId) {
    const url = `api/messages`;

    const qs = {
      server: serverId,
    };

    return new Promise((resolve, reject) => {
      this.client.request.del(url, { qs }, (err, response) => {
        if (err || response.statusCode !== 204) {
          return reject(err || this.client.httpError(response));
        }
        resolve();
      });
    });
  }

  search(serverId, criteria, options = {}) {
    const url = `api/messages/search`;
    let pollCount = 0;
    const startTime = Date.now();

    const qs = {
      server: serverId,
      page: options.page,
      itemsPerPage: options.itemsPerPage,
      receivedAfter: options.receivedAfter,
      dir: options.dir,
    };

    if (!Number.isInteger(options.timeout)) {
      options.timeout = 0;
    }

    if (typeof options.errorOnTimeout !== 'boolean') {
      options.errorOnTimeout = true;
    }

    const fn = (resolve, reject) => () => {
      this.client.request.post(
        url,
        { qs, body: criteria },
        (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(err || this.client.httpError(response));
          }

          if (options.timeout && !body.items.length) {
            const delayPattern = (response.headers['x-ms-delay'] || '1000')
              .split(',')
              .map(x => parseInt(x, 10));

            const delay =
              pollCount >= delayPattern.length
                ? delayPattern[delayPattern.length - 1]
                : delayPattern[pollCount];

            pollCount += 1;

            // Stop if timeout will be exceeded
            if (Date.now() - startTime + delay > options.timeout) {
              return options.errorOnTimeout === false
                ? resolve(body)
                : reject(
                    new MailosaurError(
                      `No matching messages found in time. By default, only messages received in the last hour are checked (use receivedAfter to override this). The search criteria used for this query was [${JSON.stringify(criteria)}] which timed out after ${options.timeout}ms`,
                      'search_timeout'
                    )
                  );
            }

            return setTimeout(fn(resolve, reject), delay);
          }

          resolve(new MessageListResult(body));
        }
      );
    };

    return new Promise((resolve, reject) => {
      fn(resolve, reject)();
    });
  }

  create(serverId, options) {
    const url = `api/messages`;

    const qs = {
      server: serverId,
    };

    return new Promise((resolve, reject) => {
      this.client.request.post(
        url,
        { qs, body: options },
        (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(err || this.client.httpError(response));
          }
          resolve(new Message(body));
        }
      );
    });
  }

  forward(messageId, options) {
    const url = `api/messages/${messageId}/forward`;

    return new Promise((resolve, reject) => {
      this.client.request.post(
        url,
        { body: options },
        (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(err || this.client.httpError(response));
          }
          resolve(new Message(body));
        }
      );
    });
  }

  reply(messageId, options) {
    const url = `api/messages/${messageId}/reply`;

    return new Promise((resolve, reject) => {
      this.client.request.post(
        url,
        { body: options },
        (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(err || this.client.httpError(response));
          }
          resolve(new Message(body));
        }
      );
    });
  }

  generatePreviews(messageId, options) {
    const url = `api/messages/${messageId}/screenshots`;

    return new Promise((resolve, reject) => {
      this.client.request.post(
        url,
        { body: options },
        (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(err || this.client.httpError(response));
          }
          resolve(new PreviewListResult(body));
        }
      );
    });
  }
}

module.exports = Messages;
