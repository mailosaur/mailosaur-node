class MessageListOptions {
  constructor(data = {}) {
    this.receivedAfter = data.receivedAfter;
    this.page = data.page;
    this.itemsPerPage = data.itemsPerPage;
    this.dir = data.dir;
  }
}

module.exports = MessageListOptions;
