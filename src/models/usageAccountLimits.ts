import UsageAccountLimit from './usageAccountLimit';

/**
 * The current limits and usage for your account.
 */
class UsageAccountLimits {
  /**
   * Server limits.
   */
  servers?: UsageAccountLimit;
  /**
   * User limits.
   */
  users?: UsageAccountLimit;
  /**
   * Emails per day limits.
   */
  email?: UsageAccountLimit;
  /**
   * SMS message per month limits.
   */
  sms?: UsageAccountLimit;

  constructor(data: Record<string, any> = {}) {
    this.servers = new UsageAccountLimit(data.servers);
    this.users = new UsageAccountLimit(data.users);
    this.email = new UsageAccountLimit(data.email);
    this.sms = new UsageAccountLimit(data.sms);
  }
}

export default UsageAccountLimits;
