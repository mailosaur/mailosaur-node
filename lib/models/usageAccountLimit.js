/**
 * Class representing a UsageAccountLimit.
 */
 class UsageAccountLimit {
  /**
   * Create a UsageAccountLimit.
   * @member {number} [limit]
   * @member {number} [current]
   */
  constructor(data = {}) {
    this.limit = data.limit || 0;
    this.current = data.current || 0;
  }
}

module.exports = UsageAccountLimit;
