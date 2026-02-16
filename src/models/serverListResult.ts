import Server from './server';

/**
 * The result of the server listing operation.
 */
class ServerListResult {
  /**
   * The individual servers forming the result. Servers
   * are returned sorted by creation date, with the most recently-created server
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
