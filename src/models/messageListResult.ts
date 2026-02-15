import MessageSummary from './messageSummary';

class MessageListResult {
  items?: MessageSummary[];

  constructor(data: Record<string, any> = {}) {
    this.items = (data.items || []).map((i: any) => (new MessageSummary(i)));
  }
}

export default MessageListResult;
