/**
 * Class representing a Server.
 */
class Server {
  /**
   * Create a Server.
   * @member {string} [id] Unique identifier for the server. Used as username
   * for SMTP/POP3 authentication.
   * @member {string} [password] SMTP/POP3 password.
   * @member {string} [name] A name used to identify the server.
   * @member {array} [users] Users (excluding administrators) who have access
   * to the server.
   * @member {number} [messages] The number of messages currently in the
   * server.
   */
  constructor(data = {}) {
    this.id = data.id;
    this.password = data.password;
    this.name = data.name;
    this.users = data.users;
    this.messages = data.messages;
  }
}

module.exports = Server;
