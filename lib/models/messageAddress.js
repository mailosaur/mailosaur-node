'use strict';

/**
 * Class representing a MessageAddress.
 */
class MessageAddress {
  /**
   * Create a MessageAddress.
   * @member {string} [name] Display name, if one is specified.
   * @member {string} [email] Email address (applicable to email messages).
   * @member {string} [phone] Phone number (applicable to SMS messages).
   */
  constructor(data) {
    data = data || {};
    
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
  }
}

module.exports = MessageAddress;
