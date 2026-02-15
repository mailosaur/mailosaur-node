/**
 * Message listing options
 */
class MessageListOptions {
  /**
   * Limits results to only messages received after this date/time (default 1 hour ago).
   */
  receivedAfter?: Date;
  /**
   * Used alongside `itemsPerPage` to paginate through results. This is zero-based, meaning `0` is the first page of results.
   */
  page?: number;
  /**
   * A limit on the number of results to be returned. This can be set between `1` and `1000`, with the default being `50`.
   */
  itemsPerPage?: number;
  /**
   * Optionally limits results based on the direction (`Sent` or `Received`), with the default being `Received`.
   */
  dir?: string;

  constructor(data: Record<string, any> = {}) {
    this.receivedAfter = data.receivedAfter;
    this.page = data.page;
    this.itemsPerPage = data.itemsPerPage;
    this.dir = data.dir;
  }
}

export default MessageListOptions;
