import ServerListResult from '../models/serverListResult';
import Server from '../models/server';
import type ServerCreateOptions from '../models/serverCreateOptions';
import type { HttpResponse } from '../request';
import type MailosaurClient from '../mailosaur';

class Servers {
  client: MailosaurClient;

  constructor(client: MailosaurClient) {
    this.client = client;
  }

  /**
   * Returns a list of your virtual servers. Servers are returned sorted in alphabetical order.
   */
  async list(): Promise<ServerListResult> {
    const url = `api/servers`;

    return new Promise<ServerListResult>((resolve, reject) => {
      this.client.request.get(
        url,
        {},
        (err: Error | null, response?: HttpResponse, body?: unknown) => {
          if (err) {
            return reject(err);
          }
          if (!response || response.statusCode !== 200) {
            return reject(
              response
                ? this.client.httpError(response)
                : new Error('No response received')
            );
          }
          resolve(new ServerListResult(body as Record<string, unknown>));
        }
      );
    });
  }

  /**
   * Creates a new virtual server.
   * @param options Options used to create a new Mailosaur server.
   */
  async create(options: ServerCreateOptions): Promise<Server> {
    const url = `api/servers`;

    return new Promise<Server>((resolve, reject) => {
      this.client.request.post(
        url,
        { body: options },
        (err: Error | null, response?: HttpResponse, body?: unknown) => {
          if (err) {
            return reject(err);
          }
          if (!response || response.statusCode !== 200) {
            return reject(
              response
                ? this.client.httpError(response)
                : new Error('No response received')
            );
          }
          resolve(new Server(body as Record<string, unknown>));
        }
      );
    });
  }

  /**
   * Retrieves the detail for a single server.
   * @param serverId The unique identifier of the server.
   */
  async get(serverId: string): Promise<Server> {
    const url = `api/servers/${serverId}`;

    return new Promise<Server>((resolve, reject) => {
      this.client.request.get(
        url,
        {},
        (err: Error | null, response?: HttpResponse, body?: unknown) => {
          if (err) {
            return reject(err);
          }
          if (!response || response.statusCode !== 200) {
            return reject(
              response
                ? this.client.httpError(response)
                : new Error('No response received')
            );
          }
          resolve(new Server(body as Record<string, unknown>));
        }
      );
    });
  }

  /**
   * Retrieves the password for a server. This password can be used for SMTP, POP3, and IMAP connectivity.
   * @param serverId The unique identifier of the server.
   */
  async getPassword(serverId: string): Promise<string> {
    const url = `api/servers/${serverId}/password`;

    return new Promise<string>((resolve, reject) => {
      this.client.request.get(
        url,
        {},
        (err: Error | null, response?: HttpResponse, body?: unknown) => {
          if (err) {
            return reject(err);
          }
          if (!response || response.statusCode !== 200) {
            return reject(
              response
                ? this.client.httpError(response)
                : new Error('No response received')
            );
          }
          resolve((body as Record<string, string>).value);
        }
      );
    });
  }

  /**
   * Updates the attributes of a server.
   * @param serverId The unique identifier of the server.
   * @param server The updated server.
   */
  async update(serverId: string, server: Server): Promise<Server> {
    const url = `api/servers/${serverId}`;

    return new Promise<Server>((resolve, reject) => {
      this.client.request.put(
        url,
        { body: server },
        (err: Error | null, response?: HttpResponse, body?: unknown) => {
          if (err) {
            return reject(err);
          }
          if (!response || response.statusCode !== 200) {
            return reject(
              response
                ? this.client.httpError(response)
                : new Error('No response received')
            );
          }
          resolve(new Server(body as Record<string, unknown>));
        }
      );
    });
  }

  /**
   * Permanently delete a server. This will also delete all messages, associated attachments, etc. within the server. This operation cannot be undone.
   * @param serverId The unique identifier of the server.
   */
  async del(serverId: string): Promise<void> {
    const url = `api/servers/${serverId}`;

    return new Promise<void>((resolve, reject) => {
      this.client.request.del(
        url,
        {},
        (err: Error | null, response?: HttpResponse) => {
          if (err) {
            return reject(err);
          }
          if (!response || response.statusCode !== 204) {
            return reject(
              response
                ? this.client.httpError(response)
                : new Error('No response received')
            );
          }
          resolve();
        }
      );
    });
  }

  /**
   * Generates a random email address by appending a random string in front of the server's
   * domain name.
   * @param serverId The identifier of the server.
   */
  generateEmailAddress(serverId: string): string {
    const host = process.env.MAILOSAUR_SMTP_HOST || 'mailosaur.net';
    const random = (Math.random() + 1).toString(36).substring(7);
    return `${random}@${serverId}.${host}`;
  }
}

export default Servers;
module.exports = Servers;
