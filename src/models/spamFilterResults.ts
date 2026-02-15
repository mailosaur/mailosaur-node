import SpamAssassinRule from './spamAssassinRule';

/**
 * Results for this email against various spam filters.
 */
class SpamFilterResults {
  /**
   * Spam Assassin filter results.
   */
  spamAssassin?: SpamAssassinRule[];

  constructor(data: Record<string, any> = {}) {
    this.spamAssassin = (data.spamAssassin || []).map(
      (i: any) => new SpamAssassinRule(i)
    );
  }
}

export default SpamFilterResults;
