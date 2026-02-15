import UsageAccountLimits from '../models/usageAccountLimits';
import UsageTransactionListResult from '../models/usageTransactionListResult';
import type MailosaurClient from '../mailosaur';

class Usage {
  client: MailosaurClient;

  constructor(client: MailosaurClient) {
    this.client = client;
  }

  /**
   * Retrieve account usage limits. Details the current limits and usage for your account.
   * This endpoint requires authentication with an account-level API key.
   */
  async limits(): Promise<UsageAccountLimits> {
    const url = `api/usage/limits`;

    return new Promise<UsageAccountLimits>((resolve, reject) => {
      this.client.request.get(
        url,
        {},
        (err: Error | null, response?: any, body?: any) => {
          if (err || response?.statusCode !== 200) {
            return reject(err || this.client.httpError(response as any));
          }
          resolve(new UsageAccountLimits(body));
        }
      );
    });
  }

  /**
   * Retrieves the last 31 days of transactional usage.
   * This endpoint requires authentication with an account-level API key.
   */
  async transactions(): Promise<UsageTransactionListResult> {
    const url = `api/usage/transactions`;

    return new Promise<UsageTransactionListResult>((resolve, reject) => {
      this.client.request.get(
        url,
        {},
        (err: Error | null, response?: any, body?: any) => {
          if (err || response?.statusCode !== 200) {
            return reject(err || this.client.httpError(response as any));
          }
          resolve(new UsageTransactionListResult(body));
        }
      );
    });
  }
}

export default Usage;
module.exports = Usage;
