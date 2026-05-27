/**
 * A Mailosaur inbox (server) — a virtual SMTP/SMS endpoint.
 */
class Server {
  /**
   * Unique identifier for the inbox (server).
   */
  id?: string;
  /**
   * The name of the inbox (server).
   */
  name?: string;
  /**
   * Users (excluding administrators) who have access to the inbox (server) when access is restricted.
   */
  users?: string[];
  /**
   * The number of messages currently in the inbox (server).
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
