const { assert } = require('chai');
const MailosaurClient = require('../lib/mailosaur');

describe('error handling', () => {
  it('Unauthorized', (done) => {
    const client = new MailosaurClient('invalid_key');
    client.servers.list().catch((err) => {
      assert.equal(err.toString(), 'Error: Authentication failed, check your API key.');
      done();
    });
  });

  it('Not Found', (done) => {
    const client = new MailosaurClient(process.env.MAILOSAUR_API_KEY);
    client.servers.get('not_found').catch((err) => {
      assert.equal(err.toString(), 'Error: Not found, check input parameters.');
      done();
    });
  });

  it('Bad Request', (done) => {
    const client = new MailosaurClient(process.env.MAILOSAUR_API_KEY);
    client.servers.create({}).catch((err) => {
      assert.equal(err.toString(), 'Error: (name) Servers need a name\r\n');
      done();
    });
  });
});
