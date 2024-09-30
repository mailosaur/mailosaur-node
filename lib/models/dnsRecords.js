class DnsRecords {
  constructor(data = {}) {
    this.a = data.a;
    this.mx = data.mx;
    this.ptr = data.ptr;
  }
}

module.exports = DnsRecords;
