import EmailClient from './emailClient';

/**
 * A list of available email clients with which to generate email previews.
 */
class EmailClientListResult {
  /**
   * A list of available email clients.
   */
  items?: EmailClient[];

  constructor(data: Record<string, any> = {}) {
    this.items = (data.items || []).map((i: any) => new EmailClient(i));
  }
}

export default EmailClientListResult;
