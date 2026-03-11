import { assert, describe, it } from 'vitest';
import MailosaurClient from '../src/mailosaur';

describe('error handling', () => {
  const apiKey = process.env.MAILOSAUR_API_KEY;
  const baseUrl = process.env.MAILOSAUR_BASE_URL || 'https://mailosaur.com/';

  it('Unauthorized', async () => {
    const client = new MailosaurClient('invalid_key', baseUrl);
    try {
      await client.servers.list();
      assert.fail('Should have thrown');
    } catch (err: unknown) {
      assert.equal(
        (err as Error).toString(),
        'Error: Authentication failed, check your API key.'
      );
    }
  });

  it('Not Found', async () => {
    const client = new MailosaurClient(apiKey as string, baseUrl);
    try {
      await client.servers.get('not_found');
      assert.fail('Should have thrown');
    } catch (err: unknown) {
      assert.equal(
        (err as Error).toString(),
        'Error: Not found, check input parameters.'
      );
    }
  });

  it('Bad Request', async () => {
    const client = new MailosaurClient(apiKey as string, baseUrl);
    try {
      await client.servers.create({});
      assert.fail('Should have thrown');
    } catch (err: unknown) {
      assert.equal(
        (err as Error).toString(),
        'Error: (name) Servers need a name\r\n'
      );
    }
  });
});
