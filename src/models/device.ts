class Device {
  id?: string;
  name?: string;

  constructor(data: Record<string, any> = {}) {
    this.id = data.id;
    this.name = data.name;
  }
}

export default Device;
