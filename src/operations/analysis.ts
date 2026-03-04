import SpamAnalysisResult from '../models/spamAnalysisResult.js';
import DeliverabilityReport from '../models/deliverabilityReport.js';
import type { HttpResponse } from '../request.js';
import type MailosaurClient from '../mailosaur.js';

/**
 * Message analysis operations.
 */
class Analysis {
  client: MailosaurClient;

  constructor(client: MailosaurClient) {
    this.client = client;
  }

  /**
   * Perform a spam analysis of an email.
   * @param messageId The identifier of the message to be analyzed.
   */
  async spam(messageId: string): Promise<SpamAnalysisResult> {
    const url = `api/analysis/spam/${messageId}`;

    return new Promise<SpamAnalysisResult>((resolve, reject) => {
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
          resolve(new SpamAnalysisResult(body as Record<string, unknown>));
        }
      );
    });
  }

  /**
   * Perform a deliverability report of an email.
   * @param messageId The identifier of the message to be analyzed.
   */
  async deliverability(messageId: string): Promise<DeliverabilityReport> {
    const url = `api/analysis/deliverability/${messageId}`;

    return new Promise<DeliverabilityReport>((resolve, reject) => {
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
          resolve(new DeliverabilityReport(body as Record<string, unknown>));
        }
      );
    });
  }
}

export default Analysis;
