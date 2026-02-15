const DeviceListResult = require('../models/deviceListResult');
const Device = require('../models/device');
const OtpResult = require('../models/otpResult');

class Devices {
  constructor(client) {
    this.client = client;
  }

  list() {
    const url = `api/devices`;

    return new Promise((resolve, reject) => {
      this.client.request.get(url, (err, response, body) => {
        if (err || response.statusCode !== 200) {
          return reject(err || this.client.httpError(response));
        }
        resolve(new DeviceListResult(body));
      });
    });
  }

  create(options) {
    const url = `api/devices`;

    return new Promise((resolve, reject) => {
      this.client.request.post(
        url,
        { body: options },
        (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(err || this.client.httpError(response));
          }
          resolve(new Device(body));
        }
      );
    });
  }

  otp(query) {
    if (!query || query.indexOf('-') > -1) {
      const url = `api/devices/${query}/otp`;

      return new Promise((resolve, reject) => {
        this.client.request.get(url, (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(err || this.client.httpError(response));
          }
          resolve(new OtpResult(body));
        });
      });
    }

    return new Promise((resolve, reject) => {
      const url = `api/devices/otp`;
      this.client.request.post(
        url,
        { body: { sharedSecret: query } },
        (err, response, body) => {
          if (err || response.statusCode !== 200) {
            return reject(err || this.client.httpError(response));
          }
          resolve(new OtpResult(body));
        }
      );
    });
  }

  del(deviceId) {
    const url = `api/devices/${deviceId}`;

    return new Promise((resolve, reject) => {
      this.client.request.del(url, (err, response) => {
        if (err || response.statusCode !== 204) {
          return reject(err || this.client.httpError(response));
        }
        resolve();
      });
    });
  }
}

module.exports = Devices;
