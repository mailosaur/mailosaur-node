import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import type MailosaurClient from '../src/mailosaur';

const verifiedDomain = process.env.MAILOSAUR_VERIFIED_DOMAIN || 'mailosaur.net';

const html = fs.readFileSync(
  path.join(__dirname, '/resources/testEmail.html'),
  'utf-8'
);
const text = fs.readFileSync(
  path.join(__dirname, '/resources/testEmail.txt'),
  'utf-8'
);

const smtpTransport = nodemailer.createTransport({
  host: process.env.MAILOSAUR_SMTP_HOST || 'mailosaur.net',
  port: process.env.MAILOSAUR_SMTP_PORT || '25',
  secureConnection: false,
  ignoreTLS: false,
  tls: {
    // Do not fail on certificate mismatch
    rejectUnauthorized: false,
  },
});

const getRandomString = (length: number): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < length; i += 1) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

const mailer = {
  sendEmails: (
    mailerModule: typeof mailer,
    client: MailosaurClient,
    server: string,
    quantity: number
  ): Promise<void> => {
    const promises: Promise<void>[] = [];

    let i = 0;
    for (i = 0; i < quantity; i += 1) {
      promises.push(mailerModule.sendEmail(client, server));
    }

    return Promise.all(promises).then(() => {});
  },

  sendEmail: (
    client: MailosaurClient,
    server: string,
    sendToAddress?: string
  ): Promise<void> => {
    const randomString = getRandomString(7);
    const randomFromAddress = `${randomString}@${verifiedDomain}`;
    const randomToAddress =
      sendToAddress || client.servers.generateEmailAddress(server!);

    return smtpTransport.sendMail({
      subject: `${randomString} subject`,
      from: `${randomString} ${randomString} <${randomFromAddress}>`,
      to: `${randomString} ${randomString} <${randomToAddress}>`,
      html: html.replace('REPLACED_DURING_TEST', randomString),
      encoding: 'base64',
      text: text.replace('REPLACED_DURING_TEST', randomString),
      textEncoding: 'base64',
      attachments: [
        {
          filename: 'cat.png',
          path: path.join(__dirname, '/resources/cat.png'),
          cid: 'ii_1435fadb31d523f6',
        },
        {
          fileName: 'dog.png',
          path: path.join(__dirname, '/resources/dog.png'),
        },
      ],
    });
  },
};

export default mailer;
