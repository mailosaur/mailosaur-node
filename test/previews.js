const { assert } = require('chai');
const MailosaurClient = require('../lib/mailosaur');
const PreviewRequest = require('../lib/models/previewRequest');
const PreviewRequestOptions = require('../lib/models/previewRequestOptions');
const mailer = require('./mailer');

const getRandomString = (length) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() *
      characters.length));
  }
  return result;
};

describe('previews', () => {
  const apiKey = process.env.MAILOSAUR_API_KEY;
  const baseUrl = process.env.MAILOSAUR_BASE_URL || 'https://mailosaur.com/';
  const server = process.env.MAILOSAUR_PREVIEWS_SERVER;
  let client;

  before(async () => {
    if (!apiKey) {
      throw new Error('Missing necessary environment variables - refer to README.md');
    }

    client = new MailosaurClient(apiKey, baseUrl);
  });

  describe('listEmailClients', () => {
    it('should return a list of email clients', async () => {
      const result = await client.previews.listEmailClients();
      assert.isOk(result);
      assert.isTrue(result.items.length > 1);
    });
  });

  (server ? describe : describe.skip)('generatePreviews', () => {
    it('should generate previews', async () => {
      const randomString = getRandomString(7);
      const host = process.env.MAILOSAUR_SMTP_HOST || 'mailosaur.net';
      const testEmailAddress = `${randomString}@${server}.${host}`;

      await mailer.sendEmail(client, server, testEmailAddress);

      const email = await client.messages.get(server, {
        sentTo: testEmailAddress
      });

      const request = new PreviewRequest('OL2021');
      const options = new PreviewRequestOptions([request]);
      const result = await client.messages.generatePreviews(email.id, options);

      assert.isOk(result);
      assert.isTrue(result.items.length > 0);

      // Ensure we can download one of the generated preview
      const file = await client.files.getPreview(result.items[0].id);
      assert.isOk(file);
    });
  });
});
