/**
 * Options used to create a new Mailosaur server.
 */
class ServerCreateOptions {
  /**
   * A name used to identify the server.
   */
  name?: string;

  constructor(name?: string) {
    this.name = name;
  }
}

export default ServerCreateOptions;
