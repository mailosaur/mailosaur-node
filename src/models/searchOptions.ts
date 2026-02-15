class SearchOptions {
  timeout?: number;
  receivedAfter?: Date;
  page?: number;
  itemsPerPage?: number;
  errorOnTimeout?: boolean;
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
