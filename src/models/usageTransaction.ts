/**
 * Usage transaction.
 */
class UsageTransaction {
  /**
   * The date/time of the transaction.
   */
  timestamp?: Date;
  /**
   * The number of emails.
   */
  email?: number;
  /**
   * The number of SMS messages.
   */
  sms?: number;

  constructor(data: Record<string, any> = {}) {
    this.timestamp = new Date(data.timestamp);
    this.email = data.email || 0;
    this.sms = data.sms || 0;
  }
}

export default UsageTransaction;
