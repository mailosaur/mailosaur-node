import Device from './device';

class DeviceListResult {
  items?: Device[];

  constructor(data: Record<string, any> = {}) {
    this.items = (data.items || []).map((i: any) => (new Device(i)));
  }
}

export default DeviceListResult;
