import UsageTransaction from './usageTransaction';

class UsageTransactionListResult {
  items?: UsageTransaction[];

  constructor(data: Record<string, any> = {}) {
    this.items = (data.items || []).map((i: any) => (new UsageTransaction(i)));
  }
}

export default UsageTransactionListResult;
