/**
 * The result of an email domain check
 */
class EmailAuthenticationResult {
  /**
   * The result of the check
   */
  result: string;
  /**
   * A description of any issue/notes found
   */
  description: string;
  /**
   * The raw values returned from the check
   */
  rawValue: string;
  /**
   * The seperated tags returned from the check
   */
  tags: { [key: string]: string };

  constructor(data: Record<string, any> = {}) {
    this.result = data.result;
    this.description = data.description;
    this.rawValue = data.rawValue;
    this.tags = data.tags;
  }
}

export default EmailAuthenticationResult;
