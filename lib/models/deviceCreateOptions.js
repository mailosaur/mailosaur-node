class DeviceCreateOptions {
  constructor(data = {}) {
    this.name = data.name;
    this.sharedSecret = data.sharedSecret;
  }
}

module.exports = DeviceCreateOptions;
