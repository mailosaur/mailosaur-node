import ServerListResult from '../models/serverListResult';
import Server from '../models/server';
import ServerCreateOptions from '../models/serverCreateOptions';
import type MailosaurClient from '../mailosaur';

class Servers {
  client: MailosaurClient;

  constructor(client: MailosaurClient) {
    this.client = client;
  }

  async list(): Promise<ServerListResult> {
    const url = `api/servers`;

    return new Promise<ServerListResult>((resolve, reject) => {
      this.client.request.get(url, {}, (err: Error | null, response?: any, body?: any) => {
        if (err || response?.statusCode !== 200) {
          return reject(err || this.client.httpError(response!));
        }
        resolve(new ServerListResult(body));
      });
    });
  }

  async create(options: ServerCreateOptions): Promise<Server> {
    const url = `api/servers`;

    return new Promise<Server>((resolve, reject) => {
      this.client.request.post(url, { body: options }, (err: Error | null, response?: any, body?: any) => {
        if (err || response?.statusCode !== 200) {
          return reject(err || this.client.httpError(response!));
        }
        resolve(new Server(body));
      });
    });
  }

  async get(serverId: string): Promise<Server> {
    const url = `api/servers/${serverId}`;

    return new Promise<Server>((resolve, reject) => {
      this.client.request.get(url, {}, (err: Error | null, response?: any, body?: any) => {
        if (err || response?.statusCode !== 200) {
          return reject(err || this.client.httpError(response!));
        }
        resolve(new Server(body));
      });
    });
  }

  async getPassword(serverId: string): Promise<string> {
    const url = `api/servers/${serverId}/password`;

    return new Promise<string>((resolve, reject) => {
      this.client.request.get(url, {}, (err: Error | null, response?: any, body?: any) => {
        if (err || response?.statusCode !== 200) {
          return reject(err || this.client.httpError(response!));
        }
        resolve(body.value);
      });
    });
  }

  async update(serverId: string, server: Server): Promise<Server> {
    const url = `api/servers/${serverId}`;

    return new Promise<Server>((resolve, reject) => {
      this.client.request.put(url, { body: server }, (err: Error | null, response?: any, body?: any) => {
        if (err || response?.statusCode !== 200) {
          return reject(err || this.client.httpError(response!));
        }
        resolve(new Server(body));
      });
    });
  }

  async del(serverId: string): Promise<void> {
    const url = `api/servers/${serverId}`;

    return new Promise<void>((resolve, reject) => {
      this.client.request.del(url, {}, (err: Error | null, response?: any) => {
        if (err || response?.statusCode !== 204) {
          return reject(err || this.client.httpError(response!));
        }
        resolve();
      });
    });
  }

  generateEmailAddress(serverId: string): string {
    const host = process.env.MAILOSAUR_SMTP_HOST || 'mailosaur.net';
    const random = (Math.random() + 1).toString(36).substring(7);
    return `${random}@${serverId}.${host}`;
  }
}

export default Servers;
module.exports = Servers;
