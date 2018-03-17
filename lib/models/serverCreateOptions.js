'use strict';

/**
 * Class representing a ServerCreateOptions.
 */
class ServerCreateOptions {
  /**
   * Create a ServerCreateOptions.
   * @member {string} [name] A name used to identify the server.
   */
  constructor(name) {
    this.name = name;
  }
}

module.exports = ServerCreateOptions;
