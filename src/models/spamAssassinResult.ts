import SpamAssassinRule from './spamAssassinRule';

/**
 * The results of spam assassin check performed by Mailosaur.
 */
class SpamAssassinResult {
  /**
   * Overall Mailosaur spam score.
   */
  score: number;
  /**
   * The result of the spam check
   */
  result: string;
  /**
   * Spam Assassin filter rules.
   */
  rules?: SpamAssassinRule[];

  constructor(data: Record<string, any> = {}) {
    this.score = data.score;
    this.result = data.result;
    this.rules = (data.rules || []).map((i: any) => new SpamAssassinRule(i));
  }
}

export default SpamAssassinResult;
