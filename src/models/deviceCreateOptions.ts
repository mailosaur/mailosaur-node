/**
 * Options used to create a new Mailosaur virtual security device.
 */
class DeviceCreateOptions {
  /**
   * A name used to identify the device.
   */
  name?: string;
  /**
   * The base32-encoded shared secret for this device.
   */
  sharedSecret?: string;

  constructor(data: Record<string, any> = {}) {
    this.name = data.name;
    this.sharedSecret = data.sharedSecret;
  }
}

export default DeviceCreateOptions;
