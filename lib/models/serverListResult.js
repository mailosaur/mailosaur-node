'use strict';

const Server = require('./server');

/**
 * The result of a server listing request.
 *
 */
class ServerListResult {
  /**
   * Create a ServerListResult.
   * @member {array} [items] The individual servers forming the result. Servers
   * are returned sorted by creation date, with the most recently-created
   * server appearing first.
   */
  constructor(data) {
    this.items = (data.items || []).map((i) => (new Server(i)));
  }
}

module.exports = ServerListResult;
