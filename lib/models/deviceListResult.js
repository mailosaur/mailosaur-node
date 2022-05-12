const Device = require('./device');

class DeviceListResult {
  constructor(data = {}) {
    this.items = (data.items || []).map((i) => (new Device(i)));
  }
}

module.exports = DeviceListResult;
