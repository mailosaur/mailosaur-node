const SpamAssassinRule = require('./spamAssassinRule');

class SpamAssassinResult {
  constructor(data = {}) {
      this.score = data.score;
      this.result = data.result;
      this.rules = (data.rules || []).map((i) => (new SpamAssassinRule(i)));
  }
}

module.exports = SpamAssassinResult;
