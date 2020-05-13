/**
 * Class representing a ForwardingRule.
 */
class ForwardingRule {
  /**
   * Create a ForwardingRule.
   * @member {string} [field] Possible values include: 'from', 'to', 'subject'
   * @member {string} [operator] Possible values include: 'endsWith',
   * 'startsWith', 'contains'
   * @member {string} [value]
   * @member {string} [forwardTo]
   */
  constructor(data = {}) {
    this.field = data.field;
    this.operator = data.operator;
    this.value = data.value;
    this.forwardTo = data.forwardTo;
  }
}

module.exports = ForwardingRule;
