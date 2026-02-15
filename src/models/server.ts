/**
 * Mailosaur virtual SMTP/SMS server.
 */
class Server {
  /**
   * Unique identifier for the server.
   */
  id?: string;
  /**
   * The name of the server.
   */
  name?: string;
  /**
   * Users (excluding administrators) who have access to the server (if it is restricted).
   */
  users?: string[];
  /**
   * The number of messages currently in the server.
   */
  messages?: number;

  constructor(data: Record<string, any> = {}) {
    this.id = data.id;
    this.name = data.name;
    this.users = data.users;
    this.messages = data.messages;
  }
}

export default Server;
