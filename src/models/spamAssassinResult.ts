import SpamAssassinRule from './spamAssassinRule';

class SpamAssassinResult {
  score: number;
  result: string;
  rules?: SpamAssassinRule[];

  constructor(data: Record<string, any> = {}) {
    this.score = data.score;
    this.result = data.result;
    this.rules = (data.rules || []).map((i: any) => (new SpamAssassinRule(i)));
  }
}

export default SpamAssassinResult;
