class MessageAddress {
  name?: string;
  email?: string;
  phone?: string;

  constructor(data: Record<string, any> = {}) {
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
  }
}

export default MessageAddress;
