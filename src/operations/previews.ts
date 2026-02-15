import EmailClientListResult from '../models/emailClientListResult';
import type MailosaurClient from '../mailosaur';

class Previews {
  client: MailosaurClient;

  constructor(client: MailosaurClient) {
    this.client = client;
  }

  async listEmailClients(): Promise<EmailClientListResult> {
    const url = `api/screenshots/clients`;

    return new Promise<EmailClientListResult>((resolve, reject) => {
      this.client.request.get(url, {}, (err: Error | null, response?: any, body?: any) => {
        if (err || response?.statusCode !== 200) {
          return reject(err || this.client.httpError(response!));
        }
        resolve(new EmailClientListResult(body));
      });
    });
  }
}

export default Previews;
module.exports = Previews;
