import * as models from './models';
import Analysis from './operations/analysis';
import Devices from './operations/devices';
import Files from './operations/files';
import Messages from './operations/messages';
import Previews from './operations/previews';
import Servers from './operations/servers';
import Usage from './operations/usage';
import Request from './request';
import MailosaurError from './models/mailosaurError';

class MailosaurClient {
  request: Request;
  analysis: Analysis;
  files: Files;
  messages: Messages;
  servers: Servers;
  usage: Usage;
  devices: Devices;
  previews: Previews;
  models: typeof models;

  constructor(apiKey: string, baseUrl?: string) {
    if (!apiKey) {
      throw new Error('\'apiKey\' must be set.');
    }

    this.request = new Request({
      baseUrl: baseUrl || 'https://mailosaur.com/',
      apiKey
    });

    this.analysis = new Analysis(this);
    this.files = new Files(this);
    this.messages = new Messages(this);
    this.servers = new Servers(this);
    this.usage = new Usage(this);
    this.devices = new Devices(this);
    this.previews = new Previews(this);
    this.models = models;
  }

  httpError(response: { statusCode: number; body?: any }): MailosaurError {
    const httpStatusCode = response.statusCode;
    const httpResponseBody = response.body ? JSON.stringify(response.body) : null;
    let message = '';

    switch (httpStatusCode) {
      case 400:
        try {
          const json = JSON.parse(httpResponseBody!);
          json.errors.forEach((err: any) => {
            message += `(${err.field}) ${err.detail[0].description}\r\n`;
          });
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (_e) {
          message = 'Request had one or more invalid parameters.';
        }
        return new MailosaurError(message, 'invalid_request', httpStatusCode, httpResponseBody);
      case 401:
        return new MailosaurError('Authentication failed, check your API key.', 'authentication_error', httpStatusCode, httpResponseBody);
      case 403:
        return new MailosaurError('Insufficient permission to perform that task.', 'permission_error', httpStatusCode, httpResponseBody);
      case 404:
        return new MailosaurError('Not found, check input parameters.', 'invalid_request', httpStatusCode, httpResponseBody);
      case 410:
        return new MailosaurError('Permanently expired or deleted.', 'gone', httpStatusCode, httpResponseBody);
      default:
        return new MailosaurError('An API error occurred, see httpResponse for further information.', 'api_error', httpStatusCode, httpResponseBody);
    }
  }
}

export default MailosaurClient;

// CommonJS compatibility - allows `const MailosaurClient = require('mailosaur')`
// @ts-ignore
if (typeof module !== 'undefined' && module.exports) {
  // @ts-ignore
  module.exports = MailosaurClient;
  // @ts-ignore
  module.exports.default = MailosaurClient;
}
