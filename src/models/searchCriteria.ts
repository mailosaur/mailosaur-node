class SearchCriteria {
  sentFrom?: string;
  sentTo?: string;
  subject?: string;
  body?: string;
  match?: 'ALL' | 'ANY';

  constructor(data: Record<string, any> = {}) {
    this.sentFrom = data.sentFrom;
    this.sentTo = data.sentTo;
    this.subject = data.subject;
    this.body = data.body;
    this.match = data.match;
  }
}

export default SearchCriteria;
