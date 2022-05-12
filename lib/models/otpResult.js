class OtpResult {
  constructor(data = {}) {
    this.code = data.code;
    this.expires = new Date(data.expires);
  }
}

module.exports = OtpResult;
