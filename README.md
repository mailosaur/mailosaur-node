# Mailosaur Node.js Client Library

[Mailosaur](https://mailosaur.com) allows you to automate tests involving email. Allowing you to perform end-to-end automated and functional email testing.

[![Build Status](https://travis-ci.org/mailosaur/mailosaur-node.svg?branch=master)](https://travis-ci.org/mailosaur/mailosaur-node)

## Installation

### Install Mailosaur via npm

```
npm install mailosaur --save-dev
```

## Documentation and usage examples

[Mailosaur's documentation](https://mailosaur.com/docs) includes all the information and usage examples you'll need.

## Building

1. Install [Node.js](https://nodejs.org/) (LTS)

2. Install [AutoRest](https://github.com/Azure/autorest) using `npm`

```
# Depending on your configuration you may need to be elevated or root to run this. (on OSX/Linux use 'sudo')
npm install -g autorest
```

3. Run the build script

```
./build.sh
```

### AutoRest Configuration

This project uses [AutoRest](https://github.com/Azure/autorest), below is the configuration that the `autorest` command will automatically pick up.

> see https://aka.ms/autorest

```yaml
input-file: https://mailosaur.com/swagger/latest/swagger.json
```

```yaml
nodejs:
    output-folder: lib
    add-credentials: true
    sync-methods: essential
    use-internal-constructors: true
    override-client-name: MailosaurBaseClient
```

## Running tests

Once you've cloned this repository locally, you can simply run:

```
npm install

export MAILOSAUR_API_KEY=your_api_key
export MAILOSAUR_SERVER=server_id

npm test
```

## Contacting us

You can get us at [support@mailosaur.com](mailto:support@mailosaur.com)
