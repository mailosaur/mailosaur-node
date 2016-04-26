# Mailosaur node.js client library

Mailosaur allows you to automate tests that require email. You can also use it for manual testing as it gives you unlimited test email addresses or use it as a fake/dummy SMTP service.

For more info go to [mailosaur.com](https://mailosaur.com/)

## Installation

`npm install mailosaur`

## Usage

Every resource is accessed via a `mailbox`:

```js
var Mailosaur = require('mailosaur')('YOUR_API_KEY'),
    mailbox = new Mailosaur.Mailbox('MAILBOX_ID');

// mailbox.{ METHOD_NAME }
```

Every resource method accepts an optional callback as the last argument:

```js
mailbox.getEmails('customer@example.com',
  function(err, emails) {
    err; // null if no error occurred
    emails; // an array of emails
  }
);
```

##Api

*functions:*

- **getEmails(searchPattern)** -
Retrieves all emails which have the searchPattern text in their body or subject.

- **getEmailsByRecipient(recipientEmail)** -
Retrieves all emails sent to the given recipient.

- **getEmail(emailId)** -
Retrieves the email with the given id.

- **deleteAllEmail()** -
Deletes all emails in a mailbox.

- **deleteEmail(emailId)** -
Deletes the email with the given id.

- **getAttachment(attachmentId)** -
Retrieves the attachment with specified id.

- **getRawEmail(rawId)** -
Retrieves the complete raw EML file for the rawId given. RawId is a property on the email object.

- **generateEmailAddress()** -
Generates a random email address which can be used to send emails into the mailbox.

*structures*

- **Email** - The core object returned by the Mailosaur API
  - **id** - The email identifier
  - **creationdate** - The date your email was received by Mailosaur
  - **senderHost** - The host name of the machine that sent the email
  - **rawId** - Reference for raw email data
  - **html** - The HTML content of the email
    - **links** - All links found within the HTML content of the email
    - **images** - All images found within the HTML content of the email
    - **body** - Unescaped HTML body of the email
  - **text** - The text content of the email
    - **links** - All links found within the text content of the email
    - **body** - Text body of the email
  - **headers** - Contains all email headers as object properties
  - **subject** - Email subject
  - **priority** - Email priority
  - **from** - Details of email sender(s)
    - **address** - Email address
    - **name** - Email sender name
  - **to** - Details of email recipient(s)
    - **address** - Email address
    - **name** - Email recipient name
  - **attachments** - Details of any attachments found within the email
    - **id** - Attachment identifier
    - **fileName** - Attachment file name
    - **length** - Attachment file size (in bytes)
    - **contentType** - Attachment mime type (e.g. "image/png")


## Development


```bash
$ npm install -g mocha
$ npm test
```
