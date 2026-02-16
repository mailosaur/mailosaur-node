import EmailClientListResult from '../models/emailClientListResult';
import type { HttpResponse } from '../request';
import type MailosaurClient from '../mailosaur';

class Previews {
  client: MailosaurClient;

  constructor(client: MailosaurClient) {
    this.client = client;
  }

  /**
   * List all email clients that can be used to generate email previews.
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
module.exports = Previews;
