'use strict';

const pkg = require('../package.json');
const request = require('request');
const models = require('./models');
const operations = require('./operations');

/** Class representing a MailosaurClient. */
class MailosaurClient {
  /**
   * Create a MailosaurBaseClient.
   * @param {string} apiKey - Your Mailosaur API key.
   * @param {string} [baseUrl] - The base URL of the Mailosaur service.
   *
   */
  constructor(apiKey, baseUrl) {
    if (!apiKey) {
      throw new Error('\'apiKey\' must be set.');
    }

    this.request = request.defaults({
        baseUrl: baseUrl || 'https://mailosaur.com/',
        json: true,
        auth: {
          user: apiKey,
          pass: ''
        },
        headers: {
            'User-Agent': `mailosaur-node/${pkg.version}`
        }
    });

    this.analysis = new operations.Analysis(this);
    this.files = new operations.Files(this);
    this.messages = new operations.Messages(this);
    this.servers = new operations.Servers(this);
    this.models = models;
  }
}

MailosaurClient.default = MailosaurClient;
module.exports = MailosaurClient;