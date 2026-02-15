/**
 * Mailosaur virtual security device OTP result.
 */
class OtpResult {
  /**
   * The current one-time password.
   */
  code?: string;
  /**
   * The expiry date/time of the current one-time password.
   */
  expires?: Date;

  constructor(data: Record<string, any> = {}) {
    this.code = data.code;
    this.expires = new Date(data.expires);
  }
}

export default OtpResult;
