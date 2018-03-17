'use strict';

const moment = require('moment');
const MessageAddress = require('./messageAddress');

/**
 * Class representing a MessageSummary.
 */
class MessageSummary {
  /**
   * Create a MessageSummary.
   * @member {uuid} id
   * @member {string} [server]
   * @member {array} [from]
   * @member {array} [to]
   * @member {array} [cc]
   * @member {array} [bcc]
   * @member {date} [received]
   * @member {string} [subject]
   * @member {string} [summary]
   * @member {number} [attachments]
   */
  constructor(data) {
    data = data || {};

    this.id = data.id;
    this.server = data.server;
    this.from = (data.from || []).map((i) => (new MessageAddress(i)));
    this.to = (data.to || []).map((i) => (new MessageAddress(i)));
    this.cc = (data.cc || []).map((i) => (new MessageAddress(i)));
    this.bcc = (data.bcc || []).map((i) => (new MessageAddress(i)));
    this.received = moment(data.received).toDate();
    this.subject = data.subject;
    this.summary = data.summary;
    this.attachments = data.attachments || 0;
  }
}

module.exports = MessageSummary;
