class OtpResult {
  code?: string;
  expires?: Date;

  constructor(data: Record<string, any> = {}) {
    this.code = data.code;
    this.expires = new Date(data.expires);
  }
}

export default OtpResult;
