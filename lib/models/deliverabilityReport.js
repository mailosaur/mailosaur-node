const EmailAuthenticationResult = require('./emailAuthenticationResult');
const BlockListResult = require('./blockListResult');
const Content = require('./content');
const DnsRecords = require('./dnsRecords');
const SpamAssassinResult = require('./spamAssassinResult');

class DeliverabilityReport {
  constructor(data = {}) {
    this.spf = new EmailAuthenticationResult(data.spf);
    this.dkim = (data.dkim || []).map((i) => (new EmailAuthenticationResult(i)));
    this.dmarc = new EmailAuthenticationResult(data.dmarc);
    this.blockLists = (data.blockLists || []).map((i) => (new BlockListResult(i)));
    this.content = new Content(data.content);
    this.dnsRecords = new DnsRecords(data.dnsRecords);
    this.spamAssassin = new SpamAssassinResult(data.spamAssassin);
  }
}

module.exports = DeliverabilityReport;
