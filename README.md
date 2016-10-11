# Mailosaur Node.js Client Library

[Mailosaur](https://mailosaur.com) allows you to automate tests involving email. Allowing you to perform end-to-end automated and functional email testing.

[![Build Status](https://travis-ci.org/mailosaur/mailosaur-node.svg?branch=master)](https://travis-ci.org/mailosaur/mailosaur-node)

## Installation

```
npm install mailosaur --save-dev
```

## Documentation and usage examples

[Mailosaur's documentation](https://mailosaur.com/docs) includes all the information and usage examples you'll need.

## Promises

This library also supports Promises. To return a promise from any asynchronous method call (this excludes `generateEmailAddress`), just omit the second callback argument.

## Running tests

Once you've cloned this repository locally, you can simply run:

```
npm install

export MAILOSAUR_MAILBOX_ID=yourmailbox
export MAILOSAUR_API_KEY=yourapikey

npm test
```

## Contacting us

You can get us at [support@mailosaur.com](mailto:support@mailosaur.com)

## License

Copyright (c) 2016 Mailosaur Ltd
Distributed under MIT license.
