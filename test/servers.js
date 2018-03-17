const MailosaurClient = require('../lib/mailosaur');
const MailosaurError = require('../lib/models/mailosaurError');
const assert = require('chai').assert;

describe('servers', () => {
    let client;
    let apiKey = process.env.MAILOSAUR_API_KEY;
    let baseUrl = process.env.MAILOSAUR_BASE_URL || 'https://mailosaur.com/';

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
                .catch(done);
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
        let serverName = 'My test';
        let createdServer
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
            }).catch(done);
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
                .catch(done);
        });

        it('should update an existing server', (done) => {
            retrievedServer.name += ' EDITED';
            client.servers.update(retrievedServer.id, retrievedServer)
                .then((server) => {
                    assert.equal(server.id, retrievedServer.id);
                    assert.equal(server.name, retrievedServer.name);
                    assert.equal(server.password, retrievedServer.password);
                    assert.deepEqual(server.users, retrievedServer.users);
                    assert.equal(server.messages, retrievedServer.messages);
                    assert.deepEqual(server.forwarding_rules, retrievedServer.forwarding_rules);
                    done();
                })
                .catch(done);
        });

        it('should delete an existing server', (done) => {
            client.servers.del(retrievedServer.id)
                .then(done)
                .catch(done);
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
                    assert.equal(err.message, 'Operation returned an invalid status code \'400\'');
                    assert.equal(err.mailosaurError.type, 'ValidationError');
                    assert.equal(Object.keys(err.mailosaurError.messages).length, 1);
                    assert.isNotEmpty(err.mailosaurError.messages.name);
                    done();
                });
        });
    });
});