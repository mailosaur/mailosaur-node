/**
 * Class representing a UsageTransaction.
 */
class UsageTransaction {
  /**
   * Create a UsageTransaction.
   * @member {date} [timestamp]
   * @member {number} [email]
   * @member {number} [sms]
   */
  constructor(data = {}) {
    this.timestamp = new Date(data.timestamp);
    this.email = data.email || 0;
    this.sms = data.sms || 0;
  }
}

module.exports = UsageTransaction;
