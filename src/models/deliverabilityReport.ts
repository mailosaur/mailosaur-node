import EmailAuthenticationResult from './emailAuthenticationResult';
import BlockListResult from './blockListResult';
import Content from './content';
import DnsRecords from './dnsRecords';
import SpamAssassinResult from './spamAssassinResult';

/**
 * The results of deliverability report performed by Mailosaur.
 */
class DeliverabilityReport {
  /**
   * The result of checking for SPF issues
   */
  spf?: EmailAuthenticationResult;
  /**
   * The result of checking for DKIM issues
   */
  dkim?: EmailAuthenticationResult[];
  /**
   * The result of checking for DMARC issues
   */
  dmarc?: EmailAuthenticationResult;
  /**
   * The result of each blocklist that was checked
   */
  blockLists?: BlockListResult[];
  /**
   * The result of content checks made on the email
   */
  content?: Content;
  /**
   * The DNS records checks made against the sender's domain
   */
  dnsRecords?: DnsRecords;
  /**
   * The result of spam analysis performed by Mailosaur
   */
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
