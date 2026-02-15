class BlockListResult {
  id: string;
  name: string;
  result: string;

  constructor(data: Record<string, any> = {}) {
    this.id = data.id;
    this.name = data.name;
    this.result = data.result;
  }
}

export default BlockListResult;
