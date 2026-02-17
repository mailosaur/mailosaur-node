/**
 * The result of an domain check against a blocklist checker
 */
class BlockListResult {
  /**
   * The identifier of the blocklist
   */
  id: string;
  /**
   * The name of the blocklist
   */
  name: string;
  /**
   * The result of the blocklist check
   */
  result: string;

  constructor(data: Record<string, any> = {}) {
    this.id = data.id;
    this.name = data.name;
    this.result = data.result;
  }
}

export default BlockListResult;
