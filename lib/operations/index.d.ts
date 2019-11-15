import * as stream from 'stream';
import * as models from '../models';

type ServiceCallback<T> = (error: Error, data: T) => void;

/**
 * @class
 * Analysis
 * __NOTE__: An instance of this class is automatically created for an
 * instance of the MailosaurClient.
 */
export interface Analysis {


    /**
     * @summary Perform a spam test
     *
     * Perform spam testing on the specified email
     *
     * @param {uuid} email The identifier of the email to be analyzed.
     *
     * @param {ServiceCallback} [optionalCallback] - The optional callback.
     *
     * @returns {ServiceCallback|Promise} If a callback was passed as the last
     * parameter then it returns the callback else returns a Promise.
     *
     * {Promise} A promise is returned.
     *
     *                      @resolve {SpamAnalysisResult} - The deserialized result object.
     *
     *                      @reject {Error|ServiceError} - The error object.
     *
     * {ServiceCallback} optionalCallback(err, result, request, response)
     *
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *
     *                      {SpamAnalysisResult} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link SpamAnalysisResult} for more information.
     */
    spam(email: string): Promise<models.SpamAnalysisResult>;
    spam(email: string, callback: ServiceCallback<models.SpamAnalysisResult>): void;
}

/**
 * @class
 * Files
 * __NOTE__: An instance of this class is automatically created for an
 * instance of the MailosaurClient.
 */
export interface Files {


    /**
     * @summary Download an attachment
     *
     * Downloads a single attachment. Simply supply the unique identifier for the
     * required attachment.
     *
     * @param {uuid} id The identifier of the attachment to be downloaded.
     *
     * @param {ServiceCallback} [optionalCallback] - The optional callback.
     *
     * @returns {ServiceCallback|Promise} If a callback was passed as the last
     * parameter then it returns the callback else returns a Promise.
     *
     * {Promise} A promise is returned.
     *
     *                      @resolve {Object} - The deserialized result object.
     *
     *                      @reject {Error|ServiceError} - The error object.
     *
     * {ServiceCallback} optionalCallback(err, result, request, response)
     *
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *
     *                      {Object} [result]   - The deserialized result object if an error did not occur.
     */
    getAttachment(id: string): Promise<stream.Readable>;
    getAttachment(id: string, callback: ServiceCallback<stream.Readable>): void;


    /**
     * @summary Download EML
     *
     * Downloads an EML file representing the specified email. Simply supply the
     * unique identifier for the required email.
     *
     * @param {uuid} id The identifier of the email to be downloaded.
     *
     * @param {ServiceCallback} [optionalCallback] - The optional callback.
     *
     * @returns {ServiceCallback|Promise} If a callback was passed as the last
     * parameter then it returns the callback else returns a Promise.
     *
     * {Promise} A promise is returned.
     *
     *                      @resolve {Object} - The deserialized result object.
     *
     *                      @reject {Error|ServiceError} - The error object.
     *
     * {ServiceCallback} optionalCallback(err, result, request, response)
     *
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *
     *                      {Object} [result]   - The deserialized result object if an error did not occur.
     */
    getEmail(id: string): Promise<stream.Readable>;
    getEmail(id: string, callback: ServiceCallback<stream.Readable>): void;
}

/**
 * @class
 * Messages
 * __NOTE__: An instance of this class is automatically created for an
 * instance of the MailosaurClient.
 */
export interface Messages {


    /**
     * @summary Retrieve a message using search criteria
     *
     * Returns as soon as a message matching the specified search criteria is
     * found. This is the most efficient method of looking up a message.
     *
     * @param {string} server The identifier of the server hosting the message.
     *
     * @param {object} criteria The search criteria to use in order to find a
     * match.
     *
     * @param {string} [criteria.sentTo] The full email address to which the target
     * email was sent.
     *
     * @param {string} [criteria.subject] The value to seek within the target
     * email's subject line.
     *
     * @param {string} [criteria.body] The value to seek within the target email's
     * HTML or text body.
     *
     * @param {object} [options] Optional Parameters.
     *
     * @param {number} [options.timeout] Specify how long to wait for a matching
     * result (in milliseconds).
     *
     * @param {date} [options.receivedAfter] Limits results to only messages
     * received after this date/time (default 20 seconds ago).
     *
     * @param {ServiceCallback} [optionalCallback] - The optional callback.
     *
     * @returns {ServiceCallback|Promise} If a callback was passed as the last
     * parameter then it returns the callback else returns a Promise.
     *
     * {Promise} A promise is returned.
     *
     *                      @resolve {Message} - The deserialized result object.
     *
     *                      @reject {Error|ServiceError} - The error object.
     *
     * {ServiceCallback} optionalCallback(err, result, request, response)
     *
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *
     *                      {Message} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Message} for more information.
     */
    get(server: string, criteria: models.SearchCriteria, options?: { timeout? : number, receivedAfter? : Date }): Promise<models.Message>;
    get(server: string, criteria: models.SearchCriteria, options: { timeout? : number, receivedAfter? : Date }, callback: ServiceCallback<models.Message>): void;


    /**
     * @summary Retrieve a message using message id
     *
     * Retrieves the detail for a single email message. Simply supply the unique
     * identifier for the required message.
     *
     * @param {uuid} id The identifier of the email message to be retrieved.
     *
     * @param {ServiceCallback} [optionalCallback] - The optional callback.
     *
     * @returns {ServiceCallback|Promise} If a callback was passed as the last
     * parameter then it returns the callback else returns a Promise.
     *
     * {Promise} A promise is returned.
     *
     *                      @resolve {Message} - The deserialized result object.
     *
     *                      @reject {Error|ServiceError} - The error object.
     *
     * {ServiceCallback} optionalCallback(err, result, request, response)
     *
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *
     *                      {Message} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Message} for more information.
     */
    getById(id: string): Promise<models.Message>;
    getById(id: string, callback: ServiceCallback<models.Message>): void;


    /**
     * @summary Delete a message
     *
     * Permanently deletes a message. This operation cannot be undone. Also deletes
     * any attachments related to the message.
     *
     * @param {uuid} id The identifier of the message to be deleted.
     *
     * @param {ServiceCallback} [optionalCallback] - The optional callback.
     *
     * @returns {ServiceCallback|Promise} If a callback was passed as the last
     * parameter then it returns the callback else returns a Promise.
     *
     * {Promise} A promise is returned.
     *
     *                      @resolve {null} - The deserialized result object.
     *
     *                      @reject {Error|ServiceError} - The error object.
     *
     * {ServiceCallback} optionalCallback(err, result, request, response)
     *
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *
     *                      {null} [result]   - The deserialized result object if an error did not occur.
     */
    del(id: string): Promise<void>;
    del(id: string, callback: ServiceCallback<void>): void;


    /**
     * @summary List all messages
     *
     * Returns a list of your messages in summary form. The summaries are returned
     * sorted by received date, with the most recently-received messages appearing
     * first.
     *
     * @param {string} server The identifier of the server hosting the messages.
     *
     * @param {object} [options] Optional Parameters.
     *
     * @param {number} [options.page] Used in conjunction with `itemsPerPage` to
     * support pagination.
     *
     * @param {number} [options.itemsPerPage] A limit on the number of results to
     * be returned per page. Can be set between 1 and 1000 items, the default is
     * 50.
     *
     * @param {ServiceCallback} [optionalCallback] - The optional callback.
     *
     * @returns {ServiceCallback|Promise} If a callback was passed as the last
     * parameter then it returns the callback else returns a Promise.
     *
     * {Promise} A promise is returned.
     *
     *                      @resolve {MessageListResult} - The deserialized result object.
     *
     *                      @reject {Error|ServiceError} - The error object.
     *
     * {ServiceCallback} optionalCallback(err, result, request, response)
     *
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *
     *                      {MessageListResult} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link MessageListResult} for more information.
     */
    list(server: string, options?: { page? : number, itemsPerPage? : number }): Promise<models.MessageListResult>;
    list(server: string, callback: ServiceCallback<models.MessageListResult>): void;
    list(server: string, options: { page? : number, itemsPerPage? : number }, callback: ServiceCallback<models.MessageListResult>): void;


    /**
     * @summary Delete all messages
     *
     * Permanently deletes all messages held by the specified server. This
     * operation cannot be undone. Also deletes any attachments related to each
     * message.
     *
     * @param {string} server The identifier of the server to be emptied.
     *
     * @param {ServiceCallback} [optionalCallback] - The optional callback.
     *
     * @returns {ServiceCallback|Promise} If a callback was passed as the last
     * parameter then it returns the callback else returns a Promise.
     *
     * {Promise} A promise is returned.
     *
     *                      @resolve {null} - The deserialized result object.
     *
     *                      @reject {Error|ServiceError} - The error object.
     *
     * {ServiceCallback} optionalCallback(err, result, request, response)
     *
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *
     *                      {null} [result]   - The deserialized result object if an error did not occur.
     */
    deleteAll(server: string): Promise<void>;
    deleteAll(server: string, callback: ServiceCallback<void>): void;


    /**
     * @summary Search for messages
     *
     * Returns a list of messages matching the specified search criteria, in
     * summary form. The messages are returned sorted by received date, with the
     * most recently-received messages appearing first.
     *
     * @param {string} server The identifier of the server hosting the messages.
     *
     * @param {object} criteria The search criteria to match results against.
     *
     * @param {string} [criteria.sentTo] The full email address to which the target
     * email was sent.
     *
     * @param {string} [criteria.subject] The value to seek within the target
     * email's subject line.
     *
     * @param {string} [criteria.body] The value to seek within the target email's
     * HTML or text body.
     *
     * @param {object} [options] Optional Parameters.
     *
     * @param {number} [options.page] Used in conjunction with `itemsPerPage` to
     * support pagination.
     *
     * @param {number} [options.itemsPerPage] A limit on the number of results to
     * be returned per page. Can be set between 1 and 1000 items, the default is
     * 50.
     *
     * @param {number} [options.timeout] Specify how long to wait for a matching
     * result (in milliseconds).
     *
     * @param {date} [options.receivedAfter] Limits results to only messages
     * received after this date/time.
     *
     * @param {ServiceCallback} [optionalCallback] - The optional callback.
     *
     * @returns {ServiceCallback|Promise} If a callback was passed as the last
     * parameter then it returns the callback else returns a Promise.
     *
     * {Promise} A promise is returned.
     *
     *                      @resolve {MessageListResult} - The deserialized result object.
     *
     *                      @reject {Error|ServiceError} - The error object.
     *
     * {ServiceCallback} optionalCallback(err, result, request, response)
     *
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *
     *                      {MessageListResult} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link MessageListResult} for more information.
     */
    search(server: string, criteria: models.SearchCriteria, options?: { page? : number, itemsPerPage? : number, timeout? : number, receivedAfter? : Date }): Promise<models.MessageListResult>;
    search(server: string, criteria: models.SearchCriteria, callback: ServiceCallback<models.MessageListResult>): void;
    search(server: string, criteria: models.SearchCriteria, options: { page? : number, itemsPerPage? : number, timeout? : number, receivedAfter? : Date }, callback: ServiceCallback<models.MessageListResult>): void;
}

/**
 * @class
 * Servers
 * __NOTE__: An instance of this class is automatically created for an
 * instance of the MailosaurClient.
 */
export interface Servers {


    /**
     * @summary List all servers
     *
     * Returns a list of your virtual SMTP servers. Servers are returned sorted in
     * alphabetical order.
     *
     * @param {ServiceCallback} [optionalCallback] - The optional callback.
     *
     * @returns {ServiceCallback|Promise} If a callback was passed as the last
     * parameter then it returns the callback else returns a Promise.
     *
     * {Promise} A promise is returned.
     *
     *                      @resolve {ServerListResult} - The deserialized result object.
     *
     *                      @reject {Error|ServiceError} - The error object.
     *
     * {ServiceCallback} optionalCallback(err, result, request, response)
     *
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *
     *                      {ServerListResult} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link ServerListResult} for more information.
     */
    list(): Promise<models.ServerListResult>;
    list(callback: ServiceCallback<models.ServerListResult>): void;


    /**
     * @summary Create a server
     *
     * Creates a new virtual SMTP server and returns it.
     *
     * @param {object} serverCreateOptions
     *
     * @param {string} [serverCreateOptions.name] A name used to identify the
     * server.
     *
     * @param {ServiceCallback} [optionalCallback] - The optional callback.
     *
     * @returns {ServiceCallback|Promise} If a callback was passed as the last
     * parameter then it returns the callback else returns a Promise.
     *
     * {Promise} A promise is returned.
     *
     *                      @resolve {Server} - The deserialized result object.
     *
     *                      @reject {Error|ServiceError} - The error object.
     *
     * {ServiceCallback} optionalCallback(err, result, request, response)
     *
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *
     *                      {Server} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Server} for more information.
     */
    create(serverCreateOptions: models.ServerCreateOptions): Promise<models.Server>;
    create(serverCreateOptions: models.ServerCreateOptions, callback: ServiceCallback<models.Server>): void;


    /**
     * @summary Retrieve a server
     *
     * Retrieves the detail for a single server. Simply supply the unique
     * identifier for the required server.
     *
     * @param {string} id The identifier of the server to be retrieved.
     *
     * @param {ServiceCallback} [optionalCallback] - The optional callback.
     *
     * @returns {ServiceCallback|Promise} If a callback was passed as the last
     * parameter then it returns the callback else returns a Promise.
     *
     * {Promise} A promise is returned.
     *
     *                      @resolve {Server} - The deserialized result object.
     *
     *                      @reject {Error|ServiceError} - The error object.
     *
     * {ServiceCallback} optionalCallback(err, result, request, response)
     *
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *
     *                      {Server} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Server} for more information.
     */
    get(id: string): Promise<models.Server>;
    get(id: string, callback: ServiceCallback<models.Server>): void;


    /**
     * @summary Update a server
     *
     * Updats a single server and returns it.
     *
     * @param {string} id The identifier of the server to be updated.
     *
     * @param {object} server
     *
     * @param {string} [server.id] Unique identifier for the server. Used as
     * username for SMTP/POP3 authentication.
     *
     * @param {string} [server.password] SMTP/POP3 password.
     *
     * @param {string} [server.name] A name used to identify the server.
     *
     * @param {array} [server.users] Users (excluding administrators) who have
     * access to the server.
     *
     * @param {number} [server.messages] The number of messages currently in the
     * server.
     *
     * @param {array} [server.forwardingRules] The rules used to manage email
     * forwarding for this server.
     *
     * @param {ServiceCallback} [optionalCallback] - The optional callback.
     *
     * @returns {ServiceCallback|Promise} If a callback was passed as the last
     * parameter then it returns the callback else returns a Promise.
     *
     * {Promise} A promise is returned.
     *
     *                      @resolve {Server} - The deserialized result object.
     *
     *                      @reject {Error|ServiceError} - The error object.
     *
     * {ServiceCallback} optionalCallback(err, result, request, response)
     *
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *
     *                      {Server} [result]   - The deserialized result object if an error did not occur.
     *                      See {@link Server} for more information.
     */
    update(id: string, server: models.Server): Promise<models.Server>;
    update(id: string, server: models.Server, callback: ServiceCallback<models.Server>): void;


    /**
     * @summary Delete a server
     *
     * Permanently deletes a server. This operation cannot be undone. Also deletes
     * all messages and associated attachments within the server.
     *
     * @param {string} id The identifier of the server to be deleted.
     *
     * @param {ServiceCallback} [optionalCallback] - The optional callback.
     *
     * @returns {ServiceCallback|Promise} If a callback was passed as the last
     * parameter then it returns the callback else returns a Promise.
     *
     * {Promise} A promise is returned.
     *
     *                      @resolve {null} - The deserialized result object.
     *
     *                      @reject {Error|ServiceError} - The error object.
     *
     * {ServiceCallback} optionalCallback(err, result, request, response)
     *
     *                      {Error|ServiceError}  err        - The Error object if an error occurred, null otherwise.
     *
     *                      {null} [result]   - The deserialized result object if an error did not occur.
     */
    del(id: string): Promise<void>;
    del(id: string, callback: ServiceCallback<void>): void;

    /**
   * @summary Generate random email address for a server
   *
   * Generates a random email address for a given server.
   *
   * @param {string} server The identifier of the server to use.
   *
   * @returns {string} Returns a string.
   *
   * {string} A string is returned
   *
   *                      {string} - The randomly generated email address.
   */
    generateEmailAddress(server: string): string;
}
