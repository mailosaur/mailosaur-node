import MessageSummary from './messageSummary';

/**
 * The result of a message listing request.
 */
class MessageListResult {
  /**
   * The individual summaries of each message forming the
   * result. Summaries are returned sorted by received date, with the most
   * recently-received messages appearing first.
   */
  items?: MessageSummary[];

  constructor(data: Record<string, any> = {}) {
    this.items = (data.items || []).map((i: any) => new MessageSummary(i));
  }
}

export default MessageListResult;
