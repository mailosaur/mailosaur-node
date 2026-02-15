import MailosaurError from '../models/mailosaurError';
import Message from '../models/message';
import MessageListResult from '../models/messageListResult';
import PreviewListResult from '../models/previewListResult';
import type SearchCriteria from '../models/searchCriteria';
import type SearchOptions from '../models/searchOptions';
import type MessageListOptions from '../models/messageListOptions';
import type MessageCreateOptions from '../models/messageCreateOptions';
import type MessageForwardOptions from '../models/messageForwardOptions';
import type MessageReplyOptions from '../models/messageReplyOptions';
import type PreviewRequestOptions from '../models/previewRequestOptions';
import type MailosaurClient from '../mailosaur';

class Messages {
  client: MailosaurClient;

  constructor(client: MailosaurClient) {
    this.client = client;
  }

  async get(
    serverId: string,
    criteria: SearchCriteria,
    options: SearchOptions = {}
  ): Promise<Message> {
    const getByIdError = new MailosaurError(
      'Must provide a valid Server ID.',
      'invalid_request'
    );

    // Ensure we only return 1 result
    options.page = 0;
    options.itemsPerPage = 1;

    // Default timeout to 10s
    options.timeout = options.timeout || 10000;

    // Default receivedAfter to 1h
    options.receivedAfter =
      options.receivedAfter || new Date(Date.now() - 3600000);

    if (serverId.length !== 8) {
      return Promise.reject(getByIdError);
    }

    try {
      const result = await this.search(serverId, criteria, options);
      if (!result.items || result.items.length === 0) {
        throw new MailosaurError(
          'No messages found matching criteria.',
          'no_messages_found'
        );
      }
      return await this.getById(result.items[0].id);
    } catch (err) {
      throw err;
    }
  }

  async getById(messageId: string): Promise<Message> {
    const url = `api/messages/${messageId}`;

    return new Promise<Message>((resolve, reject) => {
      this.client.request.get(
        url,
        {},
        (err: Error | null, response?: any, body?: any) => {
          if (err || response?.statusCode !== 200) {
            return reject(err || this.client.httpError(response as any));
          }
          resolve(new Message(body));
        }
      );
    });
  }

  async del(messageId: string): Promise<void> {
    const url = `api/messages/${messageId}`;

    return new Promise<void>((resolve, reject) => {
      this.client.request.del(url, {}, (err: Error | null, response?: any) => {
        if (err || response?.statusCode !== 204) {
          return reject(err || this.client.httpError(response as any));
        }
        resolve();
      });
    });
  }

  async list(
    serverId: string,
    options: MessageListOptions = {}
  ): Promise<MessageListResult> {
    const url = `api/messages`;

    const qs = {
      server: serverId,
      page: options.page,
      itemsPerPage: options.itemsPerPage,
      receivedAfter: options.receivedAfter,
      dir: options.dir,
    };

    return new Promise<MessageListResult>((resolve, reject) => {
      this.client.request.get(
        url,
        { qs },
        (err: Error | null, response?: any, body?: any) => {
          if (err || response?.statusCode !== 200) {
            return reject(err || this.client.httpError(response as any));
          }
          resolve(new MessageListResult(body));
        }
      );
    });
  }

  async deleteAll(serverId: string): Promise<void> {
    const url = `api/messages`;

    const qs = {
      server: serverId,
    };

    return new Promise<void>((resolve, reject) => {
      this.client.request.del(
        url,
        { qs },
        (err: Error | null, response?: any) => {
          if (err || response?.statusCode !== 204) {
            return reject(err || this.client.httpError(response as any));
          }
          resolve();
        }
      );
    });
  }

  async search(
    serverId: string,
    criteria: SearchCriteria,
    options: SearchOptions = {}
  ): Promise<MessageListResult> {
    const url = `api/messages/search`;
    let pollCount = 0;
    const startTime = Date.now();

    const qs = {
      server: serverId,
      page: options.page,
      itemsPerPage: options.itemsPerPage,
      receivedAfter: options.receivedAfter,
      dir: options.dir,
    };

    if (!Number.isInteger(options.timeout)) {
      options.timeout = 0;
    }

    if (typeof options.errorOnTimeout !== 'boolean') {
      options.errorOnTimeout = true;
    }

    const fn =
      (
        resolve: (value: MessageListResult) => void,
        reject: (reason?: any) => void
      ) =>
      (): void => {
        this.client.request.post(
          url,
          { qs, body: criteria },
          (err: Error | null, response?: any, body?: any) => {
            if (err || response?.statusCode !== 200) {
              return reject(err || this.client.httpError(response as any));
            }

            if (options.timeout && !body.items.length) {
              const delayPattern = (
                (response?.headers?.['x-ms-delay'] as string) || '1000'
              )
                .split(',')
                .map((x: string) => parseInt(x, 10));

              const delay =
                pollCount >= delayPattern.length
                  ? delayPattern[delayPattern.length - 1]
                  : delayPattern[pollCount];

              pollCount += 1;

              // Stop if timeout will be exceeded
              if (Date.now() - startTime + delay > options.timeout) {
                return options.errorOnTimeout === false
                  ? resolve(body)
                  : reject(
                      new MailosaurError(
                        `No matching messages found in time. By default, only messages received in the last hour are checked (use receivedAfter to override this). The search criteria used for this query was [${JSON.stringify(criteria)}] which timed out after ${options.timeout}ms`,
                        'search_timeout'
                      )
                    );
              }

              return setTimeout(fn(resolve, reject), delay);
            }

            resolve(new MessageListResult(body));
          }
        );
      };

    return new Promise<MessageListResult>((resolve, reject) => {
      fn(resolve, reject)();
    });
  }

  async create(
    serverId: string,
    options: MessageCreateOptions
  ): Promise<Message> {
    const url = `api/messages`;

    const qs = {
      server: serverId,
    };

    return new Promise<Message>((resolve, reject) => {
      this.client.request.post(
        url,
        { qs, body: options },
        (err: Error | null, response?: any, body?: any) => {
          if (err || response?.statusCode !== 200) {
            return reject(err || this.client.httpError(response as any));
          }
          resolve(new Message(body));
        }
      );
    });
  }

  async forward(
    messageId: string,
    options: MessageForwardOptions
  ): Promise<Message> {
    const url = `api/messages/${messageId}/forward`;

    return new Promise<Message>((resolve, reject) => {
      this.client.request.post(
        url,
        { body: options },
        (err: Error | null, response?: any, body?: any) => {
          if (err || response?.statusCode !== 200) {
            return reject(err || this.client.httpError(response as any));
          }
          resolve(new Message(body));
        }
      );
    });
  }

  async reply(
    messageId: string,
    options: MessageReplyOptions
  ): Promise<Message> {
    const url = `api/messages/${messageId}/reply`;

    return new Promise<Message>((resolve, reject) => {
      this.client.request.post(
        url,
        { body: options },
        (err: Error | null, response?: any, body?: any) => {
          if (err || response?.statusCode !== 200) {
            return reject(err || this.client.httpError(response as any));
          }
          resolve(new Message(body));
        }
      );
    });
  }

  async generatePreviews(
    messageId: string,
    options: PreviewRequestOptions
  ): Promise<PreviewListResult> {
    const url = `api/messages/${messageId}/screenshots`;

    return new Promise<PreviewListResult>((resolve, reject) => {
      this.client.request.post(
        url,
        { body: options },
        (err: Error | null, response?: any, body?: any) => {
          if (err || response?.statusCode !== 200) {
            return reject(err || this.client.httpError(response as any));
          }
          resolve(new PreviewListResult(body));
        }
      );
    });
  }
}

export default Messages;
module.exports = Messages;
