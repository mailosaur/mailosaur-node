const UsageTransaction = require('./usageTransaction');

/**
 * The result of a server listing request.
 *
 */
class UsageTransactionListResult {
  /**
   * Create a UsageTransactionListResult.
   * @member {array} [items] The individual usage transactions.
   */
  constructor(data = {}) {
    this.items = (data.items || []).map((i) => (new UsageTransaction(i)));
  }
}

module.exports = UsageTransactionListResult;
