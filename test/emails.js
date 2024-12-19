const fs = require('fs');
const path = require('path');
const { assert } = require('chai');
const MailosaurClient = require('../lib/mailosaur');
const MailosaurError = require('../lib/models/mailosaurError');
const mailer = require('./mailer');

const isoDateString = new Date().toISOString().slice(0, 10);

const validateHtml = (email) => {
  // Body
  assert.match(email.html.body, /^<div dir="ltr">/, 'HTML body should match');

  // Links
  assert.equal(email.html.links.length, 3, 'Should have HTML links');
  assert.equal(email.html.links[0].href, 'https://mailosaur.com/', 'First link should have href');
  assert.equal(email.html.links[0].text, 'mailosaur', 'First link should have text');
  assert.equal(email.html.links[1].href, 'https://mailosaur.com/', 'Second link should have href');
  assert.isNull(email.html.links[1].text, 'Second link should have no text');
  assert.equal(email.html.links[2].href, 'http://invalid/', 'Third link should have href');
  assert.equal(email.html.links[2].text, 'invalid', 'Third link should have text');

  // Codes
  assert.equal(email.html.codes.length, 2, 'Should have verification codes');
  assert.equal(email.html.codes[0].value, '123456');
  assert.equal(email.html.codes[1].value, 'G3H1Y2');

  // Images
  assert.match(email.html.images[1].src, /cid:/);
  assert.equal(email.html.images[1].alt, 'Inline image 1', 'Second image should have alt text');
};

const validateText = (email) => {
  // Body
  assert.match(email.text.body, /^this is a test/);

  // Links
  assert.equal(email.text.links.length, 2, 'Should have Text links');
  assert.equal(email.text.links[0].href, 'https://mailosaur.com/', 'First link should have href');
  assert.equal(email.text.links[0].text, email.text.links[0].href, 'First text link href & text should match');
  assert.equal(email.text.links[1].href, 'https://mailosaur.com/', 'Second link should have href');
  assert.equal(email.text.links[1].text, email.text.links[1].href, 'Second text link href & text should match');

  // Codes
  assert.equal(email.text.codes.length, 2, 'Should have verification codes');
  assert.equal(email.text.codes[0].value, '654321');
  assert.equal(email.text.codes[1].value, '5H0Y2');
};

const validateHeaders = (email) => {
  const expectedFromHeader = `${email.from[0].name} <${email.from[0].email}>`;
  const expectedToHeader = `${email.to[0].name} <${email.to[0].email}>`;
  const { headers } = email.metadata;

  assert.equal(headers.find(h => h.field.toLowerCase() === 'from').value, expectedFromHeader, 'From header should be accurate');
  assert.equal(headers.find(h => h.field.toLowerCase() === 'to').value, expectedToHeader, 'To header should be accurate');
  assert.equal(headers.find(h => h.field.toLowerCase() === 'subject').value, email.subject, 'Subject header should be accurate');
};

const validateMetadata = (email) => {
  assert.equal(email.type, 'Email');
  assert.equal(email.from.length, 1);
  assert.equal(email.to.length, 1);
  assert.isNotEmpty(email.from[0].email);
  assert.isNotEmpty(email.from[0].name);
  assert.isNotEmpty(email.to[0].email);
  assert.isNotEmpty(email.to[0].name);
  assert.isNotEmpty(email.subject);
  assert.isNotEmpty(email.server);

  assert.equal(email.received.toISOString().slice(0, 10), isoDateString);
};

const validateAttachments = (email) => {
  assert.equal(email.attachments.length, 2, 'Should have attachments');

  const file1 = email.attachments[0];
  assert.isOk(file1.id, 'First attachment should have file id');
  assert.isOk(file1.url);
  assert.equal(file1.length, 82138, 'First attachment should be correct size');
  assert.equal(file1.fileName, 'cat.png', 'First attachment should have filename');
  assert.equal(file1.contentType, 'image/png', 'First attachment should have correct MIME type');

  const file2 = email.attachments[1];
  assert.isOk(file2.id, 'Second attachment should have file id');
  assert.isOk(file2.url);
  assert.equal(file2.length, 212080, 'Second attachment should be correct size');
  assert.equal(file2.fileName, 'dog.png', 'Second attachment should have filename');
  assert.equal(file2.contentType, 'image/png', 'Second attachment should have correct MIME type');
};

const validateEmail = (email) => {
  validateMetadata(email);
  validateAttachments(email);
  validateHtml(email);
  validateText(email);
  assert.isOk(email.metadata.ehlo, 'ehlo is empty');
  assert.isOk(email.metadata.mailFrom, 'mailFrom is empty');
  assert.equal(email.metadata.rcptTo.length, 1);
};

const validateEmailSummary = (email) => {
  validateMetadata(email);
  assert.isNotEmpty(email.summary);
  assert.equal(email.attachments, 2);
};

describe('emails', () => {
  const apiKey = process.env.MAILOSAUR_API_KEY;
  const server = process.env.MAILOSAUR_SERVER;
  const baseUrl = process.env.MAILOSAUR_BASE_URL || 'https://mailosaur.com/';
  const verifiedDomain = process.env.MAILOSAUR_VERIFIED_DOMAIN;
  let client;
  let emails;

  before(async () => {
    if (!apiKey || !server) {
      throw new Error('Missing necessary environment variables - refer to README.md');
    }

    client = new MailosaurClient(apiKey, baseUrl);

    await client.messages.deleteAll(server);
    await mailer.sendEmails(mailer, client, server, 5);
    const result = await client.messages.list(server);
    emails = result.items;
    emails.forEach(validateEmailSummary);
  });

  describe('list', () => {
    it('should filter on older received after date', async () => {
      const pastDate = new Date();
      pastDate.setMinutes(pastDate.getMinutes() - 10);
      const result = await client.messages.list(server, { receivedAfter: pastDate });
      assert.isTrue(result.items.length > 0);
    });

    it('should filter on received after date', async () => {
      const d = new Date();
      d.setSeconds(d.getSeconds() + 60);
      const result = await client.messages.list(server, { receivedAfter: d });
      assert.equal(result.items.length, 0);
    });
  });

  describe('get', () => {
    it('should return a match once found', async () => {
      const host = process.env.MAILOSAUR_SMTP_HOST || 'mailosaur.net';
      const testEmailAddress = `wait_for_test@${server}.${host}`;
      await mailer.sendEmail(client, server, testEmailAddress);
      const email = await client.messages.get(server, {
        sentTo: testEmailAddress
      });
      validateEmail(email);
    });
  });

  describe('getById', async () => {
    it('should return a single email', async () => {
      const email = await client.messages.getById(emails[0].id);
      validateEmail(email);
      validateHeaders(email);
    });

    it('should throw an error if email not found', async () => {
      try {
        await client.messages.getById('efe907e9-74ed-4113-a3e0-a3d41d914765');
      } catch (err) {
        assert.instanceOf(err, MailosaurError);
      }
    });
  });

  describe('search', () => {
    it('should throw an error if no criteria', async () => {
      try {
        await client.messages.search(server, {});
      } catch (err) {
        assert.instanceOf(err, MailosaurError);
      }
    });

    it('should throw a meaningful error if the timeout is reached', async () => {
      const testFromEmail = 'zzyy@test.com';

      try {
        await client.messages.search(server, {
          sentFrom: testFromEmail
        }, {
          timeout: 1,
        });
      } catch (err) {
        assert.instanceOf(err, MailosaurError);
        assert.equal(err.message, `No matching messages found in time. By default, only messages received in the last hour are checked (use receivedAfter to override this). The search criteria used for this query was [{"sentFrom":"${testFromEmail}"}] which timed out after 1ms`);
      }
    });

    it('should return empty array if errors suppressed', async () => {
      const result = await client.messages.search(server, {
        sentTo: 'neverfound@example.com'
      }, {
        timeout: 1,
        errorOnTimeout: false
      });

      assert.equal(result.items.length, 0);
    });

    describe('by sentFrom', () => {
      it('should return matching results', async () => {
        const targetEmail = emails[1];
        const result = await client.messages.search(server, {
          sentFrom: targetEmail.from[0].email
        });
        assert.equal(result.items.length, 1);
        assert.equal(result.items[0].from[0].email, targetEmail.from[0].email);
        assert.equal(result.items[0].subject, targetEmail.subject);
      });
    });

    describe('by sentTo', () => {
      it('should return matching results', async () => {
        const targetEmail = emails[1];
        const result = await client.messages.search(server, {
          sentTo: targetEmail.to[0].email
        });
        assert.equal(result.items.length, 1);
        assert.equal(result.items[0].to[0].email, targetEmail.to[0].email);
        assert.equal(result.items[0].subject, targetEmail.subject);
      });
    });

    describe('by body', () => {
      it('should return matching results', async () => {
        const targetEmail = emails[1];
        const uniqueString = targetEmail.subject.substr(0, targetEmail.subject.indexOf(' subject'));
        const result = await client.messages.search(server, {
          body: `${uniqueString} html`
        });
        assert.equal(result.items.length, 1);
        assert.equal(result.items[0].to[0].email, targetEmail.to[0].email);
        assert.equal(result.items[0].subject, targetEmail.subject);
      });
    });

    describe('by subject', () => {
      it('should return matching results', async () => {
        const targetEmail = emails[1];
        const uniqueString = targetEmail.subject.substr(0, targetEmail.subject.indexOf(' subject'));
        const result = await client.messages.search(server, {
          subject: uniqueString
        });
        assert.equal(result.items.length, 1);
        assert.equal(result.items[0].to[0].email, targetEmail.to[0].email);
        assert.equal(result.items[0].subject, targetEmail.subject);
      });
    });

    describe('with match all', () => {
      it('should return matching results', async () => {
        const targetEmail = emails[1];
        const uniqueString = targetEmail.subject.substr(0, targetEmail.subject.indexOf(' subject'));
        const result = await client.messages.search(server, {
          subject: uniqueString,
          body: 'this is a link',
          match: 'ALL'
        });
        assert.equal(result.items.length, 1);
      });
    });

    describe('with match any', () => {
      it('should return matching results', async () => {
        const targetEmail = emails[1];
        const uniqueString = targetEmail.subject.substr(0, targetEmail.subject.indexOf(' subject'));
        const result = await client.messages.search(server, {
          subject: uniqueString,
          body: 'this is a link',
          match: 'ANY'
        });
        assert.equal(result.items.length, 6);
      });
    });

    describe('with special characters', () => {
      it('should support special characters', async () => {
        const result = await client.messages.search(server, {
          subject: 'Search with ellipsis … and emoji 👨🏿‍🚒'
        });
        assert.equal(result.items.length, 0);
      });
    });
  });

  describe('spamAnalysis', () => {
    it('should perform a spam analysis on an email', async () => {
      const targetId = emails[0].id;
      const result = await client.analysis.spam(targetId);
      result.spamFilterResults.spamAssassin.forEach((rule) => {
        assert.isNumber(rule.score);
        assert.isOk(rule.rule);
        assert.isOk(rule.description);
      });
    });
  });

  describe('deliverabilityReport', () => {
    it('should perform a deliverability report on an email', async () => {
      const targetId = emails[0].id;
      const result = await client.analysis.deliverability(targetId);

      assert.isOk(result.spf);

      assert.isOk(result.dkim);
      result.dkim.forEach((dkim) => {
        assert.isOk(dkim);
      });

      assert.isOk(result.dmarc);

      assert.isOk(result.blockLists);
      result.blockLists.forEach((blockList) => {
        assert.isOk(blockList);
        assert.isOk(blockList.id);
        assert.isOk(blockList.name);
      });

      assert.isOk(result.content);

      assert.isOk(result.dnsRecords);
      assert.isOk(result.dnsRecords.a);
      assert.isOk(result.dnsRecords.mx);
      assert.isOk(result.dnsRecords.ptr);

      assert.isOk(result.spamAssassin);
      result.spamAssassin.rules.forEach((rule) => {
        assert.isNumber(rule.score);
        assert.isOk(rule.rule);
        assert.isOk(rule.description);
      });
    });
  });

  describe('del', () => {
    it('should delete an email', async () => {
      const targetEmailId = emails[4].id;
      await client.messages.del(targetEmailId);
    });

    it('should fail if attempting to delete again', async () => {
      const targetEmailId = emails[4].id;

      try {
        await client.messages.del(targetEmailId);
      } catch (err) {
        assert.instanceOf(err, MailosaurError);
      }
    });
  });

  (verifiedDomain ? describe : describe.skip)('create and send', () => {
    it('send with text content', async () => {
      const subject = 'New message';
      const message = await client.messages.create(server, {
        to: `anything@${verifiedDomain}`,
        send: true,
        subject,
        text: 'This is a new email'
      });
      assert.isNotEmpty(message.id);
      assert.equal(message.subject, subject);
    });

    it('send with HTML content', async () => {
      const subject = 'New HTML message';
      const message = await client.messages.create(server, {
        to: `anything@${verifiedDomain}`,
        send: true,
        subject,
        html: '<p>This is a new email.</p>'
      });
      assert.isNotEmpty(message.id);
      assert.equal(message.subject, subject);
    });

    it('send with HTML content to CC recipient', async () => {
      const subject = 'CC Message';
      const ccRecipient = `someoneelse@${verifiedDomain}`;
      const message = await client.messages.create(server, {
        to: `anything@${verifiedDomain}`,
        send: true,
        subject,
        cc: ccRecipient,
        html: '<p>This is a new email.</p>'
      });
      assert.isNotEmpty(message.id);
      assert.equal(message.subject, subject);
      assert.equal(message.cc.length, 1);
      assert.equal(message.cc[0].email, ccRecipient);
    });

    it('send with attachment', async () => {
      const subject = 'New message with attachment';

      const buffer = fs.readFileSync(path.join(__dirname, '/resources/cat.png'));
      const attachment = {
        fileName: 'cat.png',
        content: buffer.toString('base64'),
        contentType: 'image/png'
      };

      const message = await client.messages.create(server, {
        to: `anything@${verifiedDomain}`,
        send: true,
        subject,
        html: '<p>This is a new email.</p>',
        attachments: [attachment]
      });
      assert.equal(message.attachments.length, 1, 'Should have attachment');
      const file1 = message.attachments[0];
      assert.isOk(file1.id, 'First attachment should have file id');
      assert.isOk(file1.url);
      assert.equal(file1.length, 82138, 'First attachment should be correct size');
      assert.equal(file1.fileName, 'cat.png', 'First attachment should have filename');
      assert.equal(file1.contentType, 'image/png', 'First attachment should have correct MIME type');
    });
  });

  (verifiedDomain ? describe : describe.skip)('forward', () => {
    it('forward with text content', async () => {
      const targetEmailId = emails[0].id;
      const body = 'Forwarded message';

      const message = await client.messages.forward(targetEmailId, {
        to: `anything@${verifiedDomain}`,
        text: body
      });
      assert.isNotEmpty(message.id);
      assert.isTrue(message.text.body.indexOf(body) >= 0);
    });

    it('forward with HTML content', async () => {
      const targetEmailId = emails[0].id;
      const body = '<p>Forwarded <strong>HTML</strong> message.</p>';

      const message = await client.messages.forward(targetEmailId, {
        to: `anything@${verifiedDomain}`,
        html: body
      });
      assert.isNotEmpty(message.id);
      assert.isTrue(message.html.body.indexOf(body) >= 0);
    });

    it('forward with HTML content to CC recipient', async () => {
      const targetEmailId = emails[0].id;
      const body = '<p>Forwarded <strong>HTML</strong> message.</p>';
      const ccRecipient = `someoneelse@${verifiedDomain}`;

      const message = await client.messages.forward(targetEmailId, {
        to: `anything@${verifiedDomain}`,
        html: body,
        cc: ccRecipient
      });
      assert.isNotEmpty(message.id);
      assert.isTrue(message.html.body.indexOf(body) >= 0);
      assert.equal(message.cc.length, 1);
      assert.equal(message.cc[0].email, ccRecipient);
    });
  });

  (verifiedDomain ? describe : describe.skip)('reply', () => {
    it('reply with text content', async () => {
      const targetEmailId = emails[0].id;
      const body = 'Reply message';

      const message = await client.messages.reply(targetEmailId, {
        text: body
      });
      assert.isNotEmpty(message.id);
      assert.isTrue(message.text.body.indexOf(body) >= 0);
    });

    it('reply with HTML content', async () => {
      const targetEmailId = emails[0].id;
      const body = '<p>Reply <strong>HTML</strong> message.</p>';

      const message = await client.messages.reply(targetEmailId, {
        html: body
      });
      assert.isNotEmpty(message.id);
      assert.isTrue(message.html.body.indexOf(body) >= 0);
    });

    it('reply with HTML content to CC recipient', async () => {
      const targetEmailId = emails[0].id;
      const body = '<p>Reply <strong>HTML</strong> message.</p>';
      const ccRecipient = `someoneelse@${verifiedDomain}`;

      const message = await client.messages.reply(targetEmailId, {
        html: body,
        cc: ccRecipient
      });
      assert.isNotEmpty(message.id);
      assert.isTrue(message.html.body.indexOf(body) >= 0);
      assert.equal(message.cc.length, 1);
      assert.equal(message.cc[0].email, ccRecipient);
    });

    it('reply with attachment', async () => {
      const targetEmailId = emails[0].id;

      const buffer = fs.readFileSync(path.join(__dirname, '/resources/cat.png'));
      const attachment = {
        fileName: 'cat.png',
        content: buffer.toString('base64'),
        contentType: 'image/png'
      };

      const message = await client.messages.reply(targetEmailId, {
        html: '<p>This is a reply with attachment.</p>',
        attachments: [attachment]
      });
      assert.equal(message.attachments.length, 1, 'Should have attachment');
      const file1 = message.attachments[0];
      assert.isOk(file1.id, 'First attachment should have file id');
      assert.isOk(file1.url);
      assert.equal(file1.length, 82138, 'First attachment should be correct size');
      assert.equal(file1.fileName, 'cat.png', 'First attachment should have filename');
      assert.equal(file1.contentType, 'image/png', 'First attachment should have correct MIME type');
    });
  });
});
