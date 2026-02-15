/**
 * Data associated with an automatically-extracted verification code.
 */
class Code {
  /**
   * The value.
   */
  value?: string;

  constructor(data: Record<string, any> = {}) {
    this.value = data.value;
  }
}

export default Code;
