/**
 * @class
 * Initializes a new instance of the SpamAssassinRule class.
 * @constructor
 * @member {number} [score]
 * @member {string} [rule]
 * @member {string} [description]
 */
export interface SpamAssassinRule {
  score?: number;
  rule?: string;
  description?: string;
}

/**
 * @class
 * Initializes a new instance of the SpamFilterResults class.
 * @constructor
 * @member {array} [spamAssassin]
 */
export interface SpamFilterResults {
  spamAssassin?: SpamAssassinRule[];
}

/**
 * @class
 * Initializes a new instance of the SpamAnalysisResult class.
 * @constructor
 * @member {object} [spamFilterResults]
 * @member {array} [spamFilterResults.spamAssassin]
 * @member {number} [score]
 */
export interface SpamAnalysisResult {
  spamFilterResults?: SpamFilterResults;
  score?: number;
}

/**
 * @class
 * Initializes a new instance of the MailosaurError class.
 * @constructor
 * @member {string} [errorType]
 * @member {number} [httpStatusCode]
 * @member {string} [httpResponseBody]
 */
export interface MailosaurError {
  errorType?: string;
  httpStatusCode?: number;
  httpResponseBody?: string;
}

/**
 * @class
 * Initializes a new instance of the MessageAddress class.
 * @constructor
 * @member {string} [name] Display name, if one is specified.
 * @member {string} [email] Email address (applicable to email messages).
 * @member {string} [phone] Phone number (applicable to SMS messages).
 */
export interface MessageAddress {
  name?: string;
  email?: string;
  phone?: string;
}

/**
 * @class
 * Initializes a new instance of the Link class.
 * @constructor
 * @member {string} [href]
 * @member {string} [text]
 */
export interface Link {
  href?: string;
  text?: string;
}

/**
 * @class
 * Initializes a new instance of the Image class.
 * @constructor
 * @member {string} [src]
 * @member {string} [alt]
 */
export interface Image {
  src?: string;
  alt?: string;
}

/**
 * @class
 * Initializes a new instance of the MessageContent class.
 * @constructor
 * @member {array} [links]
 * @member {array} [images]
 * @member {string} [body]
 */
export interface MessageContent {
  links?: Link[];
  images?: Image[];
  body?: string;
}

/**
 * @class
 * Initializes a new instance of the Attachment class.
 * @constructor
 * @member {uuid} id
 * @member {string} [contentType]
 * @member {string} [fileName]
 * @member {string} [contentId]
 * @member {number} [length]
 * @member {string} [url]
 */
export interface Attachment {
  id: string;
  contentType?: string;
  fileName?: string;
  contentId?: string;
  length?: number;
  url?: string;
}

/**
 * @class
 * Initializes a new instance of the MessageHeader class.
 * @constructor
 * @member {string} [field] Header key.
 * @member {string} [value] Header value.
 */
export interface MessageHeader {
  field?: string;
  value?: string;
}

/**
 * @class
 * Initializes a new instance of the Metadata class.
 * @constructor
 * Advanced use case content related to the message.
 *
 * @member {array} [headers] Email headers.
 */
export interface Metadata {
  headers?: MessageHeader[];
}

/**
 * @class
 * Initializes a new instance of the Message class.
 * @constructor
 * @member {uuid} [id] Unique identifier for the message.
 * @member {array} [from] The sender of the message.
 * @member {array} [to] The message’s recipient.
 * @member {array} [cc] Carbon-copied recipients for email messages.
 * @member {array} [bcc] Blind carbon-copied recipients for email messages.
 * @member {date} [received] The datetime that this message was received by
 * Mailosaur.
 * @member {string} [subject] The message’s subject.
 * @member {object} [html] Message content that was sent in HTML format.
 * @member {array} [html.links]
 * @member {array} [html.images]
 * @member {string} [html.body]
 * @member {object} [text] Message content that was sent in plain text format.
 * @member {array} [text.links]
 * @member {array} [text.images]
 * @member {string} [text.body]
 * @member {array} [attachments] An array of attachment metadata for any
 * attached files.
 * @member {object} [metadata]
 * @member {array} [metadata.headers] Email headers.
 * @member {string} [server] Identifier for the server in which the message is
 * located.
 */
export interface Message {
  id?: string;
  from?: MessageAddress[];
  to?: MessageAddress[];
  cc?: MessageAddress[];
  bcc?: MessageAddress[];
  received?: Date;
  subject?: string;
  html?: MessageContent;
  text?: MessageContent;
  attachments?: Attachment[];
  metadata?: Metadata;
  server?: string;
}

/**
 * @class
 * Initializes a new instance of the MessageSummary class.
 * @constructor
 * @member {uuid} id
 * @member {string} [server]
 * @member {array} [rcpt]
 * @member {array} [from]
 * @member {array} [to]
 * @member {array} [cc]
 * @member {array} [bcc]
 * @member {date} [received]
 * @member {string} [subject]
 * @member {string} [summary]
 * @member {number} [attachments]
 */
export interface MessageSummary {
  id: string;
  server?: string;
  rcpt?: MessageAddress[];
  from?: MessageAddress[];
  to?: MessageAddress[];
  cc?: MessageAddress[];
  bcc?: MessageAddress[];
  received?: Date;
  subject?: string;
  summary?: string;
  attachments?: number;
}

/**
 * @class
 * Initializes a new instance of the MessageListResult class.
 * @constructor
 * The result of a message listing request.
 *
 * @member {array} [items] The individual summaries of each message forming the
 * result. Summaries are returned sorted by received date, with the most
 * recently-received messages appearing first.
 */
export interface MessageListResult {
  items?: MessageSummary[];
}

/**
 * @class
 * Initializes a new instance of the SearchCriteria class.
 * @constructor
 * @member {string} [sentFrom] The full email address from which the target email
 * was sent.
 * @member {string} [sentTo] The full email address to which the target email
 * was sent.
 * @member {string} [subject] The value to seek within the target email's
 * subject line.
 * @member {string} [body] The value to seek within the target email's HTML or
 * text body.
 * @member {string} [match] If set to ALL (default), then only results that match all
 * specified criteria will be returned. If set to ANY, results that match any of the
 * specified criteria will be returned.
 */
export interface SearchCriteria {
  sentFrom?: string;
  sentTo?: string;
  subject?: string;
  body?: string;
  match?: "ALL" | "ANY";
}

/**
 * @class
 * Initializes a new instance of the Server class.
 * @constructor
 * @member {string} [id] Unique identifier for the server. Used as username for
 * SMTP/POP3 authentication.
 * @member {string} [name] A name used to identify the server.
 * @member {array} [users] Users (excluding administrators) who have access to
 * the server.
 * @member {number} [messages] The number of messages currently in the server.
 */
export interface Server {
  id?: string;
  name?: string;
  users?: string[];
  messages?: number;
}

/**
 * @class
 * Initializes a new instance of the ServerListResult class.
 * @constructor
 * The result of a server listing request.
 *
 * @member {array} [items] The individual servers forming the result. Servers
 * are returned sorted by creation date, with the most recently-created server
 * appearing first.
 */
export interface ServerListResult {
  items?: Server[];
}

/**
 * @class
 * Initializes a new instance of the ServerCreateOptions class.
 * @constructor
 * @member {string} [name] A name used to identify the server.
 */
export interface ServerCreateOptions {
  name?: string;
}

/**
 * @class
 * Initializes a new instance of the UsageAccountLimit class.
 * @constructor
 * @member {number} [limit] The limit.
 * @member {number} [current] The current usage.
 */
 export interface UsageAccountLimit {
  limit?: number;
  current?: number;
}

/**
 * @class
 * Initializes a new instance of the UsageAccountLimit class.
 * @constructor
 * @member {UsageAccountLimit} [servers] Server limits.
 * @member {UsageAccountLimit} [users] User limits.
 * @member {UsageAccountLimit} [email] Email limits.
 * @member {UsageAccountLimit} [sms] SMS limits.
 */
 export interface UsageAccountLimits {
  servers?: UsageAccountLimit;
  users?: UsageAccountLimit;
  email?: UsageAccountLimit;
  sms?: UsageAccountLimit;
}

/**
 * @class
 * Initializes a new instance of the UsageTransaction class.
 * @constructor
 * @member {date} [timestamp] The date/time of the transaction.
 * @member {number} [email] The number of emails.
 * @member {number} [sms] The number of SMS messages.
 */
 export interface UsageTransaction {
  timestamp?: Date;
  email?: number;
  sms?: number;
}

/**
 * @class
 * Initializes a new instance of the UsageTransactionListResult class.
 * @constructor
 * The result of a usage transactions request.
 *
 * @member {array} [items] The individual transactions that have occurred.
 */
 export interface UsageTransactionListResult {
  items?: UsageTransaction[];
}
