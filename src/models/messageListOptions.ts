class MessageListOptions {
  receivedAfter?: Date;
  page?: number;
  itemsPerPage?: number;
  dir?: string;

  constructor(data: Record<string, any> = {}) {
    this.receivedAfter = data.receivedAfter;
    this.page = data.page;
    this.itemsPerPage = data.itemsPerPage;
    this.dir = data.dir;
  }
}

export default MessageListOptions;
