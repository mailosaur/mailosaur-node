const { assert } = require('chai');
const MailosaurClient = require('../lib/mailosaur');

const outputError = (done) => (err) => {
  // eslint-disable-next-line no-console
  console.log(err.errorType, err.httpStatusCode, err.httpResponseBody);
  done(err);
};

describe('devices', () => {
  let client;
  const apiKey = process.env.MAILOSAUR_API_KEY;
  const baseUrl = process.env.MAILOSAUR_BASE_URL || 'https://mailosaur.com/';

  before(() => {
    if (!apiKey) {
      throw new Error('Missing necessary environment variables - refer to README.md');
    }

    client = new MailosaurClient(apiKey, baseUrl);
  });

  describe('CRUD', () => {
    const deviceName = 'My test';
    const sharedSecret = 'ONSWG4TFOQYTEMY=';
    let createdDevice;

    it('should create a new device', (done) => {
      client.devices.create({
        name: deviceName,
        sharedSecret
      }).then((device) => {
        createdDevice = device;
        assert.isNotEmpty(createdDevice.id);
        assert.equal(createdDevice.name, deviceName);
        done();
      }).catch(outputError(done));
    });

    it('retrieve an otp via device ID', (done) => {
      client.devices.otp(createdDevice.id)
        .then((otpResult) => {
          assert.isString(otpResult.code);
          assert.equal(otpResult.code.length, 6);
          done();
        })
        .catch(outputError(done));
    });

    it('should delete an existing device', (done) => {
      client.devices.list().then((result) => {
        assert.equal(result.items.length, 1);
      }).then(() => (
        client.devices.del(createdDevice.id)
      )).then(() => (
        client.devices.list()
      ))
        .then((result) => {
          assert.equal(result.items.length, 0);
          done();
        })
        .catch(outputError(done));
    });

    it('retrieve an otp via shared secret', (done) => {
      client.devices.otp(sharedSecret)
        .then((otpResult) => {
          assert.isString(otpResult.code);
          assert.equal(otpResult.code.length, 6);
          done();
        })
        .catch(outputError(done));
    });
  });
});
