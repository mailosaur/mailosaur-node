/**
 * The detail of an individual account limit.
 */
class UsageAccountLimit {
  /**
   * The limit for your account.
   */
  limit?: number;
  /**
   * Your account usage so far.
   */
  current?: number;

  constructor(data: Record<string, any> = {}) {
    this.limit = data.limit || 0;
    this.current = data.current || 0;
  }
}

export default UsageAccountLimit;
