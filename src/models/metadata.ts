import MessageAddress from './messageAddress';
import MessageHeader from './messageHeader';

class Metadata {
  headers?: MessageHeader[];
  ehlo: string;
  mailFrom?: string;
  rcptTo?: MessageAddress[];

  constructor(data: Record<string, any> = {}) {
    this.headers = (data.headers || []).map((i: any) => (new MessageHeader(i)));
    this.ehlo = data.ehlo;
    this.mailFrom = data.mailFrom;
    this.rcptTo = (data.rcptTo || []).map((i: any) => (new MessageAddress(i)));
  }
}

export default Metadata;
