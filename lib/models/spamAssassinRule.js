'use strict';

/**
 * Class representing a SpamAssassinRule.
 */
class SpamAssassinRule {
  /**
   * Create a SpamAssassinRule.
   * @member {number} [score]
   * @member {string} [rule]
   * @member {string} [description]
   */
  constructor(data) {
    data = data || {};

    this.score = data.score || 0;
    this.rule = data.rule;
    this.description = data.description;
  }
}

module.exports = SpamAssassinRule;
