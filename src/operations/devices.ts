import DeviceListResult from '../models/deviceListResult';
import Device from '../models/device';
import OtpResult from '../models/otpResult';
import type DeviceCreateOptions from '../models/deviceCreateOptions';
import type MailosaurClient from '../mailosaur';

class Devices {
  client: MailosaurClient;

  constructor(client: MailosaurClient) {
    this.client = client;
  }

  async list(): Promise<DeviceListResult> {
    const url = `api/devices`;

    return new Promise<DeviceListResult>((resolve, reject) => {
      this.client.request.get(
        url,
        {},
        (err: Error | null, response?: any, body?: any) => {
          if (err || response?.statusCode !== 200) {
            return reject(err || this.client.httpError(response as any));
          }
          resolve(new DeviceListResult(body));
        }
      );
    });
  }

  async create(options: DeviceCreateOptions): Promise<Device> {
    const url = `api/devices`;

    return new Promise<Device>((resolve, reject) => {
      this.client.request.post(
        url,
        { body: options },
        (err: Error | null, response?: any, body?: any) => {
          if (err || response?.statusCode !== 200) {
            return reject(err || this.client.httpError(response as any));
          }
          resolve(new Device(body));
        }
      );
    });
  }

  async otp(query: string): Promise<OtpResult> {
    if (!query || query.indexOf('-') > -1) {
      const url = `api/devices/${query}/otp`;

      return new Promise<OtpResult>((resolve, reject) => {
        this.client.request.get(
          url,
          {},
          (err: Error | null, response?: any, body?: any) => {
            if (err || response?.statusCode !== 200) {
              return reject(err || this.client.httpError(response as any));
            }
            resolve(new OtpResult(body));
          }
        );
      });
    }

    return new Promise<OtpResult>((resolve, reject) => {
      const url = `api/devices/otp`;
      this.client.request.post(
        url,
        { body: { sharedSecret: query } },
        (err: Error | null, response?: any, body?: any) => {
          if (err || response?.statusCode !== 200) {
            return reject(err || this.client.httpError(response as any));
          }
          resolve(new OtpResult(body));
        }
      );
    });
  }

  async del(deviceId: string): Promise<void> {
    const url = `api/devices/${deviceId}`;

    return new Promise<void>((resolve, reject) => {
      this.client.request.del(url, {}, (err: Error | null, response?: any) => {
        if (err || response?.statusCode !== 204) {
          return reject(err || this.client.httpError(response as any));
        }
        resolve();
      });
    });
  }
}

export default Devices;
module.exports = Devices;
