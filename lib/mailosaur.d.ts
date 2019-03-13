import * as operations from "./operations";

declare class MailosaurClient {
  /**
   * @class
   * Initializes a new instance of the MailosaurBaseClient class.
   * @constructor
   *
   * @param {string} apiKey - Your Mailosaur API key.
   *
   * @param {string} [baseUrl] - The base URL of the Mailosaur service.
   *
   */
  constructor(apiKey: string, baseUrl?: string);
  
  // Operation groups
  analysis: operations.Analysis;
  files: operations.Files;
  messages: operations.Messages;
  servers: operations.Servers;
}

export default MailosaurClient;
