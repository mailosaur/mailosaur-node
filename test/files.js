const { assert } = require('chai');
const MailosaurClient = require('../lib/mailosaur');
const mailer = require('./mailer');

describe('files', () => {
  const apiKey = process.env.MAILOSAUR_API_KEY;
  const server = process.env.MAILOSAUR_SERVER;
  const baseUrl = process.env.MAILOSAUR_BASE_URL || 'https://mailosaur.com/';
  let client;
  let email;

  before(async () => {
    if (!apiKey || !server) {
      throw new Error('Missing necessary environment variables - refer to README.md');
    }

    client = new MailosaurClient(apiKey, baseUrl);

    await client.messages.deleteAll(server);
    const host = process.env.MAILOSAUR_SMTP_HOST || 'mailosaur.net';
    const testEmailAddress = `files_test@${server}.${host}`;
    await mailer.sendEmail(client, server, testEmailAddress);
    email = await client.messages.get(server, {
      sentTo: testEmailAddress
    });
  });

  describe('getEmail', () => {
    it('should return a file', async () => {
      const result = await client.files.getEmail(email.id);
      assert.isOk(result);
      assert.isTrue(result.length > 1);
      assert.isTrue(result.indexOf(email.subject) !== -1);
    });
  });

  describe('getAttachment', () => {
    it('should return a file', async () => {
      const attachment = email.attachments[0];

      const result = await client.files.getAttachment(attachment.id);
      assert.isOk(result);
      assert.equal(result.length, attachment.length);
    });
  });
});
