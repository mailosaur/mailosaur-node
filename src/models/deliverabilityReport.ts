import EmailAuthenticationResult from './emailAuthenticationResult';
import BlockListResult from './blockListResult';
import Content from './content';
import DnsRecords from './dnsRecords';
import SpamAssassinResult from './spamAssassinResult';

class DeliverabilityReport {
  spf?: EmailAuthenticationResult;
  dkim?: EmailAuthenticationResult[];
  dmarc?: EmailAuthenticationResult;
  blockLists?: BlockListResult[];
  content?: Content;
  dnsRecords?: DnsRecords;
  spamAssassin?: SpamAssassinResult;

  constructor(data: Record<string, any> = {}) {
    this.spf = new EmailAuthenticationResult(data.spf);
    this.dkim = (data.dkim || []).map(
      (i: any) => new EmailAuthenticationResult(i)
    );
    this.dmarc = new EmailAuthenticationResult(data.dmarc);
    this.blockLists = (data.blockLists || []).map(
      (i: any) => new BlockListResult(i)
    );
    this.content = new Content(data.content);
    this.dnsRecords = new DnsRecords(data.dnsRecords);
    this.spamAssassin = new SpamAssassinResult(data.spamAssassin);
  }
}

export default DeliverabilityReport;
