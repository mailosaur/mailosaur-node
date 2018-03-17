'use strict';

const moment = require('moment');
const MessageAddress = require('./messageAddress');
const MessageContent = require('./messageContent');
const Attachment = require('./attachment');
const Metadata = require('./metadata');

/**
 * Class representing a Message.
 */
class Message {
  /**
   * Create a Message.
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
   * @member {object} [text] Message content that was sent in plain text
   * format.
   * @member {array} [text.links]
   * @member {array} [text.images]
   * @member {string} [text.body]
   * @member {array} [attachments] An array of attachment metadata for any
   * attached files.
   * @member {object} [metadata]
   * @member {array} [metadata.headers] Email headers.
   * @member {string} [server] Identifier for the server in which the message
   * is located.
   */
  constructor(data) {
    data = data || {};

    this.id = data.id;
    this.from = (data.from || []).map((i) => (new MessageAddress(i)));
    this.to = (data.to || []).map((i) => (new MessageAddress(i)));
    this.cc = (data.cc || []).map((i) => (new MessageAddress(i)));
    this.bcc = (data.bcc || []).map((i) => (new MessageAddress(i)));
    this.received = moment(data.received).toDate();
    this.subject = data.subject;
    this.html = new MessageContent(data.html);
    this.text = new MessageContent(data.text);
    this.attachments = (data.attachments || []).map((i) => (new Attachment(i)));
    this.metadata = new Metadata(data.metadata);
    this.server = data.server;
  }
}

module.exports = Message;
