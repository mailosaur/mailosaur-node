class Server {
  id?: string;
  name?: string;
  users?: string[];
  messages?: number;

  constructor(data: Record<string, any> = {}) {
    this.id = data.id;
    this.name = data.name;
    this.users = data.users;
    this.messages = data.messages;
  }
}

export default Server;
