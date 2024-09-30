class BlockListResult {
  constructor(data = {}) {
    this.id = data.id;
    this.name = data.name;
    this.result = data.result;
  }
}

module.exports = BlockListResult;
