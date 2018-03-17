'use strict';

const SpamFilterResults = require('./spamFilterResults');

/**
 * Class representing a SpamAnalysisResult.
 */
class SpamAnalysisResult {
  /**
   * Create a SpamAnalysisResult.
   * @member {object} [spamFilterResults]
   * @member {array} [spamFilterResults.spamAssassin]
   * @member {number} [score]
   */
  constructor(data) {
    data = data || {};

    this.spamFilterResults = new SpamFilterResults(data.spamFilterResults);
    this.score = data.score || 0;
  }
}

module.exports = SpamAnalysisResult;
