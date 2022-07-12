const { assert } = require('chai');
const MailosaurClient = require('../lib/mailosaur');

describe('usage', () => {
  let client;
  const apiKey = process.env.MAILOSAUR_API_KEY;
  const baseUrl = process.env.MAILOSAUR_BASE_URL || 'https://mailosaur.com/';

  before(() => {
    if (!apiKey) {
      throw new Error('Missing necessary environment variables - refer to README.md');
    }

    client = new MailosaurClient(apiKey, baseUrl);
  });

  describe('limits', () => {
    it('should return account limits', async () => {
      const result = await client.usage.limits();
      assert.isNotNull(result.servers);
      assert.isNotNull(result.users);
      assert.isNotNull(result.email);
      assert.isNotNull(result.sms);

      assert.isAtLeast(result.servers.limit, 1);
      assert.isAtLeast(result.users.limit, 1);
      assert.isAtLeast(result.email.limit, 1);
      assert.isAtLeast(result.sms.limit, 1);
    });
  });

  describe('transactions', () => {
    it('should return usage transactions', async () => {
      const result = await client.usage.transactions();
      assert.isAtLeast(result.items.length, 2);
      assert.isNotNull(result.items[0].timestamp);
      assert.isNotNull(result.items[0].email);
      assert.isNotNull(result.items[0].sms);
    });
  });
});
