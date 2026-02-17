import type Request from '../request';
import type { HttpResponse } from '../request';
import MailosaurError from '../models/mailosaurError';

// Interface to avoid circular dependency issues
interface IMailosaurClient {
  request: Request;
  httpError(response: HttpResponse): MailosaurError;
}

/**
 * File operations.
 */
class Files {
  client: IMailosaurClient;

  constructor(client: IMailosaurClient) {
    this.client = client;
  }

  /**
   * Downloads a single attachment.
   * @param attachmentId The identifier for the required attachment.
   */
  async getAttachment(attachmentId: string): Promise<Buffer> {
    const url = `api/files/attachments/${attachmentId}`;

    return new Promise<Buffer>((resolve, reject) => {
      this.client.request.get(
        url,
        { buffer: true },
        (err: Error | null, _response?: HttpResponse, body?: unknown) =>
          err ? reject(err) : resolve(body as Buffer)
      );
    });
  }

  /**
   * Downloads an EML file representing the specified email.
   * @param messageId The identifier for the required message.
   */
  async getEmail(messageId: string): Promise<Buffer> {
    const url = `api/files/email/${messageId}`;

    return new Promise<Buffer>((resolve, reject) => {
      this.client.request.get(
        url,
        { buffer: true },
        (err: Error | null, _response?: HttpResponse, body?: unknown) =>
          err ? reject(err) : resolve(body as Buffer)
      );
    });
  }

  /**
   * Downloads a screenshot of your email rendered in a real email client. Simply supply
   * the unique identifier for the required preview.
   * @param previewId The identifier of the email preview to be downloaded.
   */
  async getPreview(previewId: string): Promise<Buffer> {
    const timeout = 120000;
    let pollCount = 0;
    const startTime = Date.now();

    const fn =
      (resolve: (value: Buffer) => void, reject: (reason?: unknown) => void) =>
      (): void => {
        const url = `api/files/screenshots/${previewId}`;

        this.client.request.get(
          url,
          { buffer: true },
          (err: Error | null, response?: HttpResponse, body?: unknown) => {
            if (err) {
              return reject(err);
            }

            const statusCode = response?.statusCode;

            if (statusCode === 200) {
              return resolve(body as Buffer);
            }

            if (statusCode !== 202) {
              return reject(
                response
                  ? this.client.httpError(response)
                  : new Error('No response received')
              );
            }

            const delayPattern = (
              (response?.headers?.['x-ms-delay'] as string) || '1000'
            )
              .split(',')
              .map((x: string) => parseInt(x, 10));

            const delay =
              pollCount >= delayPattern.length
                ? delayPattern[delayPattern.length - 1]
                : delayPattern[pollCount];

            pollCount += 1;

            // Stop if timeout will be exceeded
            if (Date.now() - startTime + delay > timeout) {
              return reject(
                new MailosaurError(
                  `An email preview was not generated in time. The email client may not be available, or the preview ID [${previewId}] may be incorrect.`,
                  'preview_timeout'
                )
              );
            }

            return setTimeout(fn(resolve, reject), delay);
          }
        );
      };

    return new Promise<Buffer>((resolve, reject) => {
      fn(resolve, reject)();
    });
  }
}

export default Files;
module.exports = Files;
