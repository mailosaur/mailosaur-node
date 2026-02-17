/**
 * The result of an individual Spam Assassin rule
 */
class SpamAssassinRule {
  /**
   * Spam Assassin rule score.
   */
  score?: number;
  /**
   * Spam Assassin rule name.
   */
  rule?: string;
  /**
   * Spam Assassin rule description.
   */
  description?: string;

  constructor(data: Record<string, any> = {}) {
    this.score = data.score || 0;
    this.rule = data.rule;
    this.description = data.description;
  }
}

export default SpamAssassinRule;
