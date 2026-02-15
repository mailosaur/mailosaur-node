class SpamAssassinRule {
  score?: number;
  rule?: string;
  description?: string;

  constructor(data: Record<string, any> = {}) {
    this.score = data.score || 0;
    this.rule = data.rule;
    this.description = data.description;
  }
}

export default SpamAssassinRule;
