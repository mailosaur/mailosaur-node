import EmailClientListResult from '../models/emailClientListResult.js';
import type { HttpResponse } from '../request.js';
import type MailosaurClient from '../mailosaur.js';

/**
 * Operations for discovering the email clients available for generating email previews
 * (screenshots of an email rendered in real clients). Accessed via `client.previews`.
 */
class Previews {
  client: MailosaurClient;

  constructor(client: MailosaurClient) {
    this.client = client;
  }

  /**
   * List all email clients that can be used to generate email previews.
   * @returns A promise resolving to an {@link EmailClientListResult} of available email clients.
   */
  async listEmailClients(): Promise<EmailClientListResult> {
    const url = `api/screenshots/clients`;

    return new Promise<EmailClientListResult>((resolve, reject) => {
      this.client.request.get(
        url,
        {},
        (err: Error | null, response?: HttpResponse, body?: unknown) => {
          if (err) {
            return reject(err);
          }
          if (!response || response.statusCode !== 200) {
            return reject(
              response
                ? this.client.httpError(response)
                : new Error('No response received')
            );
          }
          resolve(new EmailClientListResult(body as Record<string, unknown>));
        }
      );
    });
  }
}

export default Previews;
