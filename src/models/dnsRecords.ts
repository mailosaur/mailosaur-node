class DnsRecords {
  a: string[];
  mx: string[];
  ptr: string[];

  constructor(data: Record<string, any> = {}) {
    this.a = data.a;
    this.mx = data.mx;
    this.ptr = data.ptr;
  }
}

export default DnsRecords;
