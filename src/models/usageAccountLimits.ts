import UsageAccountLimit from './usageAccountLimit';

class UsageAccountLimits {
  servers?: UsageAccountLimit;
  users?: UsageAccountLimit;
  email?: UsageAccountLimit;
  sms?: UsageAccountLimit;

  constructor(data: Record<string, any> = {}) {
    this.servers = new UsageAccountLimit(data.servers);
    this.users = new UsageAccountLimit(data.users);
    this.email = new UsageAccountLimit(data.email);
    this.sms = new UsageAccountLimit(data.sms);
  }
}

export default UsageAccountLimits;
