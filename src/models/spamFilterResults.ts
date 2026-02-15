import SpamAssassinRule from './spamAssassinRule';

class SpamFilterResults {
  spamAssassin?: SpamAssassinRule[];

  constructor(data: Record<string, any> = {}) {
    this.spamAssassin = (data.spamAssassin || []).map((i: any) => (new SpamAssassinRule(i)));
  }
}

export default SpamFilterResults;
