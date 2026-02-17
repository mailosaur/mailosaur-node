/**
 * Mailosaur virtual security device.
 */
class Device {
  /**
   * Unique identifier for the device.
   */
  id?: string;
  /**
   * The name of the device.
   */
  name?: string;

  constructor(data: Record<string, any> = {}) {
    this.id = data.id;
    this.name = data.name;
  }
}

export default Device;
