import UsageAccountLimits from '../models/usageAccountLimits.js';
import UsageTransactionListResult from '../models/usageTransactionListResult.js';
import type { HttpResponse } from '../request.js';
import type MailosaurClient from '../mailosaur.js';

/**
 * Operations for inspecting your account's usage limits and recent transactional usage.
 * These endpoints require authentication with an account-level API key. Accessed via `client.usage`.
 */
class Usage {
  client: MailosaurClient;

  constructor(client: MailosaurClient) {
    this.client = client;
  }

  /**
   * Retrieve account usage limits. Details the current limits and usage for your account.
   * This endpoint requires authentication with an account-level API key.
   * @returns A promise resolving to the {@link UsageAccountLimits} for your account.
   */
  async limits(): Promise<UsageAccountLimits> {
    const url = `api/usage/limits`;

    return new Promise<UsageAccountLimits>((resolve, reject) => {
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
          resolve(new UsageAccountLimits(body as Record<string, unknown>));
        }
      );
    });
  }

  /**
   * Retrieves the last 31 days of transactional usage.
   * This endpoint requires authentication with an account-level API key.
   * @returns A promise resolving to a {@link UsageTransactionListResult} for the last 31 days.
   */
  async transactions(): Promise<UsageTransactionListResult> {
    const url = `api/usage/transactions`;

    return new Promise<UsageTransactionListResult>((resolve, reject) => {
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
          resolve(
            new UsageTransactionListResult(body as Record<string, unknown>)
          );
        }
      );
    });
  }
}

export default Usage;
