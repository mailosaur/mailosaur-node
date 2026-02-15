class MessageHeader {
  field?: string;
  value?: string;

  constructor(data: Record<string, any> = {}) {
    this.field = data.field;
    this.value = data.value;
  }
}

export default MessageHeader;
