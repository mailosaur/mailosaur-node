import Server from './server.js';

/**
 * The result of the inbox (server) listing operation.
 */
class ServerListResult {
  /**
   * The individual inboxes (servers) forming the result. Inboxes (servers)
   * are returned sorted by creation date, with the most recently-created inbox (server)
   * appearing first.
   */
  items?: Server[];

  constructor(data: Record<string, any> = {}) {
    this.items = (data.items || []).map(
      (i: Record<string, unknown>) => new Server(i)
    );
  }
}

export default ServerListResult;
