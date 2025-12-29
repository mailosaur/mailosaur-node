const EmailClient = require('./emailClient');

class EmailClientListResult {
    constructor(data = {}) {
        this.items = (data.items || []).map((i) => (new EmailClient(i)));
    }
}

module.exports = EmailClientListResult;
