import MessageAddress from './messageAddress';
import MessageHeader from './messageHeader';

/**
 * Further metadata related to the message, including email headers.
 */
class Metadata {
  /**
   * Message headers
   */
  headers?: MessageHeader[];
  /**
   * The fully-qualified domain name or IP address that was provided with the
   * Extended HELLO (EHLO) or HELLO (HELO) command. This value is generally
   * used to identify the SMTP client.
   * https://datatracker.ietf.org/doc/html/rfc5321#section-4.1.1.1
   */
  ehlo: string;
  /**
   * The source mailbox/email address, referred to as the 'reverse-path',
   * provided via the MAIL command during the SMTP transaction.
   * https://datatracker.ietf.org/doc/html/rfc5321#section-4.1.1.2
   */
  mailFrom?: string;
  /**
   * The recipient email addresses, each referred to as a 'forward-path',
   * provided via the RCPT command during the SMTP transaction.
   * https://datatracker.ietf.org/doc/html/rfc5321#section-4.1.1.3
   */
  rcptTo?: MessageAddress[];

  constructor(data: Record<string, any> = {}) {
    this.headers = (data.headers || []).map(
      (i: Record<string, unknown>) => new MessageHeader(i)
    );
    this.ehlo = data.ehlo;
    this.mailFrom = data.mailFrom;
    this.rcptTo = (data.rcptTo || []).map(
      (i: Record<string, unknown>) => new MessageAddress(i)
    );
  }
}

export default Metadata;
