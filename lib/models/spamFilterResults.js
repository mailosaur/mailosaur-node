const SpamAssassinRule = require('./spamAssassinRule');

/**
 * Class representing a SpamFilterResults.
 */
class SpamFilterResults {
  /**
   * Create a SpamFilterResults.
   * @member {array} [spamAssassin]
   */
  constructor(data = {}) {
    this.spamAssassin = (data.spamAssassin || []).map((i) => (new SpamAssassinRule(i)));
  }
}

module.exports = SpamFilterResults;
