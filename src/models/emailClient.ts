class EmailClient {
  label?: string;
  name?: string;

  constructor(data: Record<string, any> = {}) {
    this.label = data.label;
    this.name = data.name;
  }
}

export default EmailClient;
