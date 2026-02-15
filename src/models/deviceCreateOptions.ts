class DeviceCreateOptions {
  name?: string;
  sharedSecret?: string;

  constructor(data: Record<string, any> = {}) {
    this.name = data.name;
    this.sharedSecret = data.sharedSecret;
  }
}

export default DeviceCreateOptions;
