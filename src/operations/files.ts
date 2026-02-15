import { Readable } from 'stream';
import MailosaurError from '../models/mailosaurError';

// Forward declaration to avoid circular dependency issues
type MailosaurClient = any;

class Files {
  client: MailosaurClient;

  constructor(client: MailosaurClient) {
    this.client = client;
  }

  async getAttachment(attachmentId: string): Promise<Readable> {
    const url = `api/files/attachments/${attachmentId}`;

    return new Promise<Readable>((resolve, reject) => {
      this.client.request.get(url, { buffer: true }, (err: Error | null, response?: any, body?: any) => (
        err ? reject(err) : resolve(body)
      ));
    });
  }

  async getEmail(messageId: string): Promise<Readable> {
    const url = `api/files/email/${messageId}`;

    return new Promise<Readable>((resolve, reject) => {
      this.client.request.get(url, { buffer: true }, (err: Error | null, response?: any, body?: any) => (
        err ? reject(err) : resolve(body)
      ));
    });
  }

  async getPreview(previewId: string): Promise<Readable> {
    const timeout = 120000;
    let pollCount = 0;
    const startTime = Date.now();

    const fn = (resolve: (value: Readable) => void, reject: (reason?: any) => void) => (): void => {
      const url = `api/files/screenshots/${previewId}`;

      this.client.request.get(url, { buffer: true }, (err: Error | null, response?: any, body?: any) => {
        if (err) {
          return reject(err);
        }

        if (response!.statusCode === 200) {
          return resolve(body);
        }

        if (response!.statusCode !== 202) {
          return reject(this.client.httpError(response!));
        }

        const delayPattern = (response!.headers['x-ms-delay'] || '1000')
          .split(',')
          .map((x: string) => parseInt(x, 10));

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

    return new Promise<Readable>((resolve, reject) => {
      fn(resolve, reject)();
    });
  }
}

export default Files;
module.exports = Files;
