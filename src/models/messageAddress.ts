/**
 * Contact information for a message sender or recipient.
 */
class MessageAddress {
  /**
   * Display name, if one is specified.
   */
  name?: string;
  /**
   * Email address (applicable to email messages).
   */
  email?: string;
  /**
   * Phone number (applicable to SMS messages).
   */
  phone?: string;

  constructor(data: Record<string, any> = {}) {
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
  }
}

export default MessageAddress;
