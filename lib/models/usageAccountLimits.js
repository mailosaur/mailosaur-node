const UsageAccountLimit = require('./usageAccountLimit');

/**
 * Account usage limits.
 *
 */
 class UsageAccountLimits {
  /**
   * Create UsageAccountLimits.
   * @member {object} [servers]
   * @member {object} [users]
   * @member {object} [email]
   * @member {object} [sms]
   */
  constructor(data = {}) {
    this.servers = new UsageAccountLimit(data.servers);
    this.users = new UsageAccountLimit(data.users);
    this.email = new UsageAccountLimit(data.email);
    this.sms = new UsageAccountLimit(data.sms);
  }
}

module.exports = UsageAccountLimits;
