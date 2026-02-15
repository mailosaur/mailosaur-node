import EmailClient from './emailClient';

class EmailClientListResult {
  items?: EmailClient[];

  constructor(data: Record<string, any> = {}) {
    this.items = (data.items || []).map((i: any) => new EmailClient(i));
  }
}

export default EmailClientListResult;
