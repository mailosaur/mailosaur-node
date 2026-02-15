import UsageTransaction from './usageTransaction';

/**
 * Usage transactions from your account.
 */
class UsageTransactionListResult {
  /**
   * The individual transactions that have occurred.
   */
  items?: UsageTransaction[];

  constructor(data: Record<string, any> = {}) {
    this.items = (data.items || []).map((i: any) => new UsageTransaction(i));
  }
}

export default UsageTransactionListResult;
