class EmailAuthenticationResult {
  constructor(data = {}) {
    this.result = data.result;
    this.description = data.description;
    this.rawValue = data.rawValue;
    this.tags = data.tags;
  }
}

module.exports = EmailAuthenticationResult;
