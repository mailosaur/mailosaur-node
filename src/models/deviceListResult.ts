import Device from './device';

/**
 * The result of the device listing operation.
 */
class DeviceListResult {
  /**
   * The individual devices forming the result.
   */
  items?: Device[];

  constructor(data: Record<string, any> = {}) {
    this.items = (data.items || []).map(
      (i: Record<string, unknown>) => new Device(i)
    );
  }
}

export default DeviceListResult;
