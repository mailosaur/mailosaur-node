# Mailosaur Node.js Client Library

[Mailosaur](https://mailosaur.com) lets you automate email and SMS tests, like account verification and password resets, and integrate these into your CI/CD pipeline.

[![](https://github.com/mailosaur/mailosaur-node/workflows/CI/badge.svg)](https://github.com/mailosaur/mailosaur-node/actions)

## Installation

### Install Mailosaur via npm

```
npm install mailosaur --save-dev
```

## Documentation

Please see the [Node client reference](https://mailosaur.com/docs/email-testing/nodejs/client-reference/) for the most up-to-date documentation.

## Usage

example.js

```js
const MailosaurClient = require('mailosaur');

(async() => {
  const client = new MailosaurClient('YOUR_API_KEY');

  const result = await client.servers.list();

  console.log('You have a server called:', result.items[0].name);
})();
```

## Development

Install all development dependencies:

```sh
npm i
```

The test suite requires the following environment variables to be set:

```sh
export MAILOSAUR_API_KEY=your_api_key
export MAILOSAUR_SERVER=server_id
```

Run all tests:

```sh
npm test
```

## Contacting us

You can get us at [support@mailosaur.com](mailto:support@mailosaur.com)
