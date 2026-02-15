import SpamAnalysisResult from '../models/spamAnalysisResult';
import DeliverabilityReport from '../models/deliverabilityReport';
import type MailosaurClient from '../mailosaur';

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
        (err: Error | null, response?: any, body?: any) => {
          if (err || response?.statusCode !== 200) {
            return reject(err || this.client.httpError(response as any));
          }
          resolve(new SpamAnalysisResult(body));
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
        (err: Error | null, response?: any, body?: any) => {
          if (err || response?.statusCode !== 200) {
            return reject(err || this.client.httpError(response as any));
          }
          resolve(new DeliverabilityReport(body));
        }
      );
    });
  }
}

export default Analysis;
module.exports = Analysis;
