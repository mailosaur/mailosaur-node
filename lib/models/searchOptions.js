class SearchOptions {
  constructor(data = {}) {
    this.timeout = data.timeout;
    this.receivedAfter = data.receivedAfter;
    this.page = data.page;
    this.itemsPerPage = data.itemsPerPage;
    this.errorOnTimeout = data.errorOnTimeout;
    this.dir = data.dir;
  }
}

module.exports = SearchOptions;
