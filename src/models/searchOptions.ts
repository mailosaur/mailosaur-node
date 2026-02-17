/**
 * Search options
 */
class SearchOptions {
  /**
   * Specify how long to wait for a matching result (in milliseconds, default value is 10 seconds).
   */
  timeout?: number;
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
   * When using the 'get' method, this option can be used to prevent an error being thrown if no matching message is found in time.
   */
  errorOnTimeout?: boolean;
  /**
   * Optionally limits results based on the direction (`Sent` or `Received`), with the default being `Received`.
   */
  dir?: string;

  constructor(data: Record<string, any> = {}) {
    this.timeout = data.timeout;
    this.receivedAfter = data.receivedAfter;
    this.page = data.page;
    this.itemsPerPage = data.itemsPerPage;
    this.errorOnTimeout = data.errorOnTimeout;
    this.dir = data.dir;
  }
}

export default SearchOptions;
