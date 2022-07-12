const { assert } = require('chai');
const MailosaurClient = require('../lib/mailosaur');

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

    it('should create a new device', async () => {
      createdDevice = await client.devices.create({
        name: deviceName,
        sharedSecret
      });

      assert.isNotEmpty(createdDevice.id);
      assert.equal(createdDevice.name, deviceName);
    });

    it('retrieve an otp via device ID', async () => {
      const otpResult = await client.devices.otp(createdDevice.id);

      assert.isString(otpResult.code);
      assert.equal(otpResult.code.length, 6);
    });

    it('should delete an existing device', async () => {
      const resultBefore = await client.devices.list();
      assert.isTrue(resultBefore.items.some(x => x.id === createdDevice.id));

      await client.devices.del(createdDevice.id);
      const resultAfter = await client.devices.list();
      assert.isFalse(resultAfter.items.some(x => x.id === createdDevice.id));
    });

    it('retrieve an otp via shared secret', async () => {
      const otpResult = await client.devices.otp(sharedSecret);

      assert.isString(otpResult.code);
      assert.equal(otpResult.code.length, 6);
    });
  });
});
