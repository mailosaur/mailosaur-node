import { assert } from 'chai';
import fs from 'fs';
import MailosaurClient from '../src/mailosaur';
import PreviewRequestOptions from '../src/models/previewRequestOptions';
import mailer from './mailer';

const getRandomString = (length: number): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

describe('previews', () => {
  const apiKey = process.env.MAILOSAUR_API_KEY;
  const baseUrl = process.env.MAILOSAUR_BASE_URL || 'https://mailosaur.com/';
  const server = process.env.MAILOSAUR_SERVER;
  let client: MailosaurClient;

  before(async () => {
    if (!apiKey || !server) {
      throw new Error(
        'Missing necessary environment variables - refer to README.md'
      );
    }

    client = new MailosaurClient(apiKey, baseUrl);
  });

  describe('listEmailClients', () => {
    it('should return a list of email clients', async () => {
      const result = await client.previews.listEmailClients();
      assert.isOk(result);
      assert.isTrue(result.items!.length > 1);
    });
  });

  describe('generatePreviews', () => {
    it('should generate previews', async () => {
      const randomString = getRandomString(7);
      const host = process.env.MAILOSAUR_SMTP_HOST || 'mailosaur.net';
      const testEmailAddress = `${randomString}@${server}.${host}`;

      await mailer.sendEmail(client, server!, testEmailAddress);

      const email = await client.messages.get(server!, {
        sentTo: testEmailAddress,
      });

      const options = new PreviewRequestOptions([
        'iphone-16plus-applemail-lightmode-portrait',
      ]);
      const result = await client.messages.generatePreviews(email.id!, options);

      assert.isOk(result);
      assert.isTrue(result.items!.length > 0);

      // Ensure we can download one of the generated preview
      const file = await client.files.getPreview(result.items![0].id!);
      fs.writeFileSync('test-result.png', file);
      assert.isOk(file);
    });
  });
});
