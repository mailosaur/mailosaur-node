class UsageTransaction {
  timestamp?: Date;
  email?: number;
  sms?: number;

  constructor(data: Record<string, any> = {}) {
    this.timestamp = new Date(data.timestamp);
    this.email = data.email || 0;
    this.sms = data.sms || 0;
  }
}

export default UsageTransaction;
