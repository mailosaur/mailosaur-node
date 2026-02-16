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
import type { HttpResponse } from '../request';
import type MailosaurClient from '../mailosaur';

class Messages {
  client: MailosaurClient;

  constructor(client: MailosaurClient) {
    this.client = client;
  }

  /**
   * Waits for a message to be found. Returns as soon as a message matching the specified search criteria is found.
   * **Recommended:** This is the most efficient method of looking up a message, therefore we recommend using it wherever possible.
   * @param serverId The unique identifier of the containing server.
   * @param criteria The criteria with which to find messages during a search.
   * @param options Search options
   */
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

  /**
   * Retrieves the detail for a single message. Must be used in conjunction with either list or
   * search in order to get the unique identifier for the required message.
   * @param messageId The unique identifier of the message to be retrieved.
   */
  async getById(messageId: string): Promise<Message> {
    const url = `api/messages/${messageId}`;

    return new Promise<Message>((resolve, reject) => {
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
          resolve(new Message(body as Record<string, unknown>));
        }
      );
    });
  }

  /**
   * Permanently deletes a message. Also deletes any attachments related to the message. This operation cannot be undone.
   * @param messageId The identifier for the message.
   */
  async del(messageId: string): Promise<void> {
    const url = `api/messages/${messageId}`;

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
   * Returns a list of your messages in summary form. The summaries are returned sorted by received date, with the most recently-received messages appearing first.
   * @param serverId The unique identifier of the required server.
   * @param options Message listing options
   */
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
          resolve(new MessageListResult(body as Record<string, unknown>));
        }
      );
    });
  }

  /**
   * Permenantly delete all messages within a server.
   * @param serverId The unique identifier of the server.
   */
  async deleteAll(serverId: string): Promise<void> {
    const url = `api/messages`;

    const qs = {
      server: serverId,
    };

    return new Promise<void>((resolve, reject) => {
      this.client.request.del(
        url,
        { qs },
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
   * Returns a list of messages matching the specified search criteria, in summary form.
   * The messages are returned sorted by received date, with the most recently-received messages appearing first.
   * @param serverId The unique identifier of the server to search.
   * @param criteria The criteria with which to find messages during a search.
   * @param options Search options
   */
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
        reject: (reason?: unknown) => void
      ) =>
      (): void => {
        this.client.request.post(
          url,
          { qs, body: criteria },
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

            if (
              options.timeout &&
              !(body as Record<string, unknown[]>).items.length
            ) {
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
                  ? resolve(
                      new MessageListResult(body as Record<string, unknown>)
                    )
                  : reject(
                      new MailosaurError(
                        `No matching messages found in time. By default, only messages received in the last hour are checked (use receivedAfter to override this). The search criteria used for this query was [${JSON.stringify(criteria)}] which timed out after ${options.timeout}ms`,
                        'search_timeout'
                      )
                    );
              }

              return setTimeout(fn(resolve, reject), delay);
            }

            resolve(new MessageListResult(body as Record<string, unknown>));
          }
        );
      };

    return new Promise<MessageListResult>((resolve, reject) => {
      fn(resolve, reject)();
    });
  }

  /**
   * Creates a new message that can be sent to a verified email address. This is useful
   * in scenarios where you want an email to trigger a workflow in your product.
   * @param serverId The unique identifier of the required server.
   * @param options Options to use when creating a new message.
   */
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
          resolve(new Message(body as Record<string, unknown>));
        }
      );
    });
  }

  /**
   * @param messageId The unique identifier of the message to be forwarded.
   * @param options Options to use when forwarding a message.
   */
  async forward(
    messageId: string,
    options: MessageForwardOptions
  ): Promise<Message> {
    const url = `api/messages/${messageId}/forward`;

    return new Promise<Message>((resolve, reject) => {
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
          resolve(new Message(body as Record<string, unknown>));
        }
      );
    });
  }

  /**
   * Sends a reply to the specified message. This is useful for when simulating a user replying to one of your email or SMS messages.
   * @param messageId The unique identifier of the message to be forwarded.
   * @param options Options to use when replying to a message.
   */
  async reply(
    messageId: string,
    options: MessageReplyOptions
  ): Promise<Message> {
    const url = `api/messages/${messageId}/reply`;

    return new Promise<Message>((resolve, reject) => {
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
          resolve(new Message(body as Record<string, unknown>));
        }
      );
    });
  }

  /**
   * Generates screenshots of an email rendered in the specified email clients.
   * @param messageId The identifier of the email to preview.
   * @param options The options with which to generate previews.
   */
  async generatePreviews(
    messageId: string,
    options: PreviewRequestOptions
  ): Promise<PreviewListResult> {
    const url = `api/messages/${messageId}/screenshots`;

    return new Promise<PreviewListResult>((resolve, reject) => {
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
          resolve(new PreviewListResult(body as Record<string, unknown>));
        }
      );
    });
  }
}

export default Messages;
module.exports = Messages;
