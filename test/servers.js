const { assert } = require('chai');
const MailosaurClient = require('../lib/mailosaur');
const MailosaurError = require('../lib/models/mailosaurError');

const outputError = (done) => (err) => {
  console.log(err.errorType, err.httpStatusCode, err.httpResponseBody);
  done(err);
};

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
    it('should return a list of servers', (done) => {
      client.servers.list()
        .then((result) => {
          assert.isAtLeast(result.items.length, 2);
          done();
        })
        .catch(outputError(done));
    });
  });

  describe('get', () => {
    it('should throw an error if server not found', (done) => {
      client.servers.get('efe907e9-74ed-4113-a3e0-a3d41d914765')
        .catch((err) => {
          assert.instanceOf(err, MailosaurError);
          done();
        });
    });
  });

  describe('CRUD', () => {
    const serverName = 'My test';
    let createdServer;
    let retrievedServer;

    it('should create a new server', (done) => {
      client.servers.create({
        name: serverName
      }).then((server) => {
        createdServer = server;
        assert.isNotEmpty(createdServer.id);
        assert.equal(createdServer.name, serverName);
        assert.isNotEmpty(createdServer.password);
        assert.isArray(createdServer.users);
        assert.isNumber(createdServer.messages);
        assert.isArray(createdServer.forwardingRules);
        done();
      }).catch(outputError(done));
    });

    it('should retrieve an existing server', (done) => {
      client.servers.get(createdServer.id)
        .then((server) => {
          retrievedServer = server;
          assert.equal(retrievedServer.id, createdServer.id);
          assert.equal(retrievedServer.name, createdServer.name);
          assert.isNotEmpty(retrievedServer.password);
          assert.isArray(retrievedServer.users);
          assert.isNumber(retrievedServer.messages);
          assert.isArray(retrievedServer.forwardingRules);
          done();
        })
        .catch(outputError(done));
    });

    it('should update an existing server', (done) => {
      retrievedServer.name += ' updated with ellipsis … and emoji 👨🏿‍🚒';
      client.servers.update(retrievedServer.id, retrievedServer)
        .then((server) => {
          assert.equal(server.id, retrievedServer.id);
          assert.equal(server.name, retrievedServer.name);
          assert.equal(server.password, retrievedServer.password);
          assert.deepEqual(server.users, retrievedServer.users);
          assert.equal(server.messages, retrievedServer.messages);
          assert.deepEqual(server.forwardingRules, retrievedServer.forwardingRules);
          done();
        })
        .catch(outputError(done));
    });

    it('should delete an existing server', (done) => {
      client.servers.del(retrievedServer.id)
        .then(done)
        .catch(outputError(done));
    });

    it('should fail to delete an already deleted server', (done) => {
      client.servers.del(retrievedServer.id)
        .catch((err) => {
          assert.instanceOf(err, MailosaurError);
          done();
        });
    });

    it('should fail to create a server with no name', (done) => {
      client.servers.create({})
        .catch((err) => {
          assert.instanceOf(err, MailosaurError);
          assert.equal(err.message, 'Request had one or more invalid parameters.');
          assert.equal(err.errorType, 'invalid_request');
          assert.equal(err.httpStatusCode, 400);
          assert.equal(err.httpResponseBody, '{"type":"ValidationError","messages":{"name":"Please provide a name for your server"}}');
          done();
        });
    });
  });
});
