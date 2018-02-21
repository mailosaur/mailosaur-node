const MailosaurBaseClient = require('./mailosaurBaseClient');
const msRest = require('ms-rest');

class MailosaurClient extends MailosaurBaseClient {
    constructor(apiKey, baseUri) {
        var credentials = new msRest.BasicAuthenticationCredentials(apiKey, '');

        var options = {
            requestOptions: {
                headers: { 'user-agent': 'mailosaur-node/5.0.0' }
            }
        };

        super(credentials, baseUri, options);

        var self = this;

        // Method aliases
        this.servers.del = this.servers.deleteMethod;
        this.messages.del = this.messages.deleteMethod;
        
        function getFileBuffer(method, id, optionalCallback) {
            var buffers = [];

            if (!optionalCallback) {
                return new Promise((resolve, reject) => {
                    var request = method.call(self.files, id, (err)=>{
                        return err ? reject(err) : null;
                    });
                    
                    request.on('data', (chunk) => buffers.push(chunk));

                    request.on('end', () => {
                        resolve(Buffer.concat(buffers));
                    });
                });
            } else {
                var request = method.call(self.files, id, (err)=>{
                    return err ? optionalCallback(err) : null;
                });
                
                request.on('data', (chunk) => buffers.push(chunk));

                request.on('end', () => {
                    optionalCallback(null, Buffer.concat(buffers));
                });
            }
        }

        var getEmailRaw = this.files.getEmail;
        this.files.getEmail = (emailId, optionalCallback) => {
            return getFileBuffer(getEmailRaw, emailId, optionalCallback);
        };

        var getAttachmentRaw = this.files.getAttachment;
        this.files.getAttachment = (attachmentId, optionalCallback) => {
            return getFileBuffer(getAttachmentRaw, attachmentId, optionalCallback);
        };

        this.servers.generateEmailAddress = (server) => {
            var host = process.env.MAILOSAUR_SMTP_HOST || 'mailosaur.io';
            var random = (Math.random() + 1).toString(36).substring(7);
            return `${random}.${server}@${host}`;
        };
    }
}
module.exports = MailosaurClient;
