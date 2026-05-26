import DeviceListResult from '../models/deviceListResult.js';
import Device from '../models/device.js';
import OtpResult from '../models/otpResult.js';
import type DeviceCreateOptions from '../models/deviceCreateOptions.js';
import type { HttpResponse } from '../request.js';
import type MailosaurClient from '../mailosaur.js';

/**
 * Operations for managing virtual security devices and retrieving their current one-time
 * passwords (OTPs), used to automate testing of app-based multi-factor authentication.
 * Accessed via `client.devices`.
 */
class Devices {
  client: MailosaurClient;

  constructor(client: MailosaurClient) {
    this.client = client;
  }

  /**
   * Returns a list of your virtual security devices.
   * @returns A promise resolving to a {@link DeviceListResult} containing your devices.
   */
  async list(): Promise<DeviceListResult> {
    const url = `api/devices`;

    return new Promise<DeviceListResult>((resolve, reject) => {
      this.client.request.get(
        url,
        {},
        (err: Error | null, response?: HttpResponse, body?: unknown) => {
          if (err) {
            return reject(err);
          }
          if (!response || response.statusCode !== 200) {
            return reject(
              response
                ? this.client.httpError(response)
                : new Error('No response received')
            );
          }
          resolve(new DeviceListResult(body as Record<string, unknown>));
        }
      );
    });
  }

  /**
   * Creates a new virtual security device.
   * @param options Options used to create a new Mailosaur virtual security device.
   * @returns A promise resolving to the newly-created {@link Device}.
   */
  async create(options: DeviceCreateOptions): Promise<Device> {
    const url = `api/devices`;

    return new Promise<Device>((resolve, reject) => {
      this.client.request.post(
        url,
        { body: options },
        (err: Error | null, response?: HttpResponse, body?: unknown) => {
          if (err) {
            return reject(err);
          }
          if (!response || response.statusCode !== 200) {
            return reject(
              response
                ? this.client.httpError(response)
                : new Error('No response received')
            );
          }
          resolve(new Device(body as Record<string, unknown>));
        }
      );
    });
  }

  /**
   * Retrieves the current one-time password for a saved device, or given base32-encoded shared secret.
   * @param query Either the unique identifier of the device, or a base32-encoded shared secret.
   * @returns A promise resolving to an {@link OtpResult} containing the current one-time password.
   */
  async otp(query: string): Promise<OtpResult> {
    if (!query || query.indexOf('-') > -1) {
      const url = `api/devices/${query}/otp`;

      return new Promise<OtpResult>((resolve, reject) => {
        this.client.request.get(
          url,
          {},
          (err: Error | null, response?: HttpResponse, body?: unknown) => {
            if (err) {
              return reject(err);
            }
            if (!response || response.statusCode !== 200) {
              return reject(
                response
                  ? this.client.httpError(response)
                  : new Error('No response received')
              );
            }
            resolve(new OtpResult(body as Record<string, unknown>));
          }
        );
      });
    }

    return new Promise<OtpResult>((resolve, reject) => {
      const url = `api/devices/otp`;
      this.client.request.post(
        url,
        { body: { sharedSecret: query } },
        (err: Error | null, response?: HttpResponse, body?: unknown) => {
          if (err) {
            return reject(err);
          }
          if (!response || response.statusCode !== 200) {
            return reject(
              response
                ? this.client.httpError(response)
                : new Error('No response received')
            );
          }
          resolve(new OtpResult(body as Record<string, unknown>));
        }
      );
    });
  }

  /**
   * Permanently delete a virtual security device. This operation cannot be undone.
   * @param deviceId The unique identifier of the device.
   * @returns A promise resolving once the device has been deleted.
   */
  async del(deviceId: string): Promise<void> {
    const url = `api/devices/${deviceId}`;

    return new Promise<void>((resolve, reject) => {
      this.client.request.del(
        url,
        {},
        (err: Error | null, response?: HttpResponse) => {
          if (err) {
            return reject(err);
          }
          if (!response || response.statusCode !== 204) {
            return reject(
              response
                ? this.client.httpError(response)
                : new Error('No response received')
            );
          }
          resolve();
        }
      );
    });
  }
}

export default Devices;
