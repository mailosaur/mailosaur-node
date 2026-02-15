class EmailAuthenticationResult {
  result: string;
  description: string;
  rawValue: string;
  tags: { [key: string]: string };

  constructor(data: Record<string, any> = {}) {
    this.result = data.result;
    this.description = data.description;
    this.rawValue = data.rawValue;
    this.tags = data.tags;
  }
}

export default EmailAuthenticationResult;
