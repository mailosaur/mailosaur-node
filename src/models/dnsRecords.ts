/**
 * The records found when checking DNS records of an email sender's domain
 */
class DnsRecords {
  /**
   * The A Records of the sender's domain
   */
  a: string[];
  /**
   * The MX Records of the sender's domain
   */
  mx: string[];
  /**
   * The PTR Record of the sender's domain
   */
  ptr: string[];

  constructor(data: Record<string, any> = {}) {
    this.a = data.a;
    this.mx = data.mx;
    this.ptr = data.ptr;
  }
}

export default DnsRecords;
