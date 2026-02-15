class UsageAccountLimit {
  limit?: number;
  current?: number;

  constructor(data: Record<string, any> = {}) {
    this.limit = data.limit || 0;
    this.current = data.current || 0;
  }
}

export default UsageAccountLimit;
