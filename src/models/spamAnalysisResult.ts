import SpamFilterResults from './spamFilterResults';

/**
 * The results of spam analysis performed by Mailosaur.
 */
class SpamAnalysisResult {
  /**
   * Spam filter results.
   */
  spamFilterResults?: SpamFilterResults;
  /**
   * Overall Mailosaur spam score.
   */
  score?: number;

  constructor(data: Record<string, any> = {}) {
    this.spamFilterResults = new SpamFilterResults(data.spamFilterResults);
    this.score = data.score || 0;
  }
}

export default SpamAnalysisResult;
