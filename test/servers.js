const { assert } = require('chai');
const MailosaurClient = require('../lib/mailosaur');
const MailosaurError = require('../lib/models/mailosaurError');

describe('servers', () => {
  let client;
  const apiKey = process.env.MAILOSAUR_API_KEY;
  const baseUrl = process.env.MAILOSAUR_BASE_URL || 'https://mailosaur.com/';

  before(() => {
    if (!apiKey) {
      throw new Error('Missing necessary environment variables - refer to README.md');
    }

    client = new MailosaurClient(apiKey, baseUrl);
  });

  describe('list', () => {
    it('should return a list of servers', async () => {
      const result = await client.servers.list();
      assert.isAtLeast(result.items.length, 2);
    });
  });

  describe('get', () => {
    it('should throw an error if server not found', async () => {
      try {
        await client.servers.get('efe907e9-74ed-4113-a3e0-a3d41d914765');
      } catch (err) {
        assert.instanceOf(err, MailosaurError);
      }
    });
  });

  describe('CRUD', () => {
    const serverName = 'My test';
    let createdServer;
    let retrievedServer;

    it('should create a new server', async () => {
      createdServer = await client.servers.create({
        name: serverName
      });
      assert.isNotEmpty(createdServer.id);
      assert.equal(createdServer.name, serverName);
      assert.isArray(createdServer.users);
      assert.isNumber(createdServer.messages);
    });

    it('should retrieve an existing server', async () => {
      retrievedServer = await client.servers.get(createdServer.id);
      assert.equal(retrievedServer.id, createdServer.id);
      assert.equal(retrievedServer.name, createdServer.name);
      assert.isArray(retrievedServer.users);
      assert.isNumber(retrievedServer.messages);
    });

    it('should retrieve password of an existing server', async () => {
      const password = await client.servers.getPassword(createdServer.id);
      assert.isTrue(password.length >= 8);
    });

    it('should update an existing server', async () => {
      retrievedServer.name += ' updated with ellipsis … and emoji 👨🏿‍🚒';
      const server = await client.servers.update(retrievedServer.id, retrievedServer);
      assert.equal(server.id, retrievedServer.id);
      assert.equal(server.name, retrievedServer.name);
      assert.deepEqual(server.users, retrievedServer.users);
      assert.equal(server.messages, retrievedServer.messages);
    });

    it('should delete an existing server', async () => {
      await client.servers.del(retrievedServer.id);
    });

    it('should fail to delete an already deleted server', async () => {
      try {
        await client.servers.del(retrievedServer.id);
      } catch (err) {
        assert.instanceOf(err, MailosaurError);
      }
    });

    it('should fail to create a server with no name', async () => {
      try {
        await client.servers.create({});
      } catch (err) {
        assert.instanceOf(err, MailosaurError);
        assert.equal(err.message, '(name) Servers need a name\r\n');
        assert.equal(err.errorType, 'invalid_request');
        assert.equal(err.httpStatusCode, 400);
        assert.isTrue(err.httpResponseBody.indexOf('{"type":') !== -1);
      }
    });
  });
});
