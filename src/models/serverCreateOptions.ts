/**
 * Options used to create a new Mailosaur inbox (server).
 */
class ServerCreateOptions {
  /**
   * A name used to identify the inbox (server).
   */
  name?: string;

  constructor(name?: string) {
    this.name = name;
  }
}

export default ServerCreateOptions;
