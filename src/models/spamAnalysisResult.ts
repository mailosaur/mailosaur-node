import SpamFilterResults from './spamFilterResults';

class SpamAnalysisResult {
  spamFilterResults?: SpamFilterResults;
  score?: number;

  constructor(data: Record<string, any> = {}) {
    this.spamFilterResults = new SpamFilterResults(data.spamFilterResults);
    this.score = data.score || 0;
  }
}

export default SpamAnalysisResult;
