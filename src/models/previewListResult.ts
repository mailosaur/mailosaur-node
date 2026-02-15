import Preview from './preview';

/**
 * A list of requested email previews.
 */
class PreviewListResult {
  /**
   * The summaries for each requested preview.
   */
  items?: Preview[];

  constructor(data: Record<string, any> = {}) {
    this.items = (data.items || []).map((i: any) => new Preview(i));
  }
}

export default PreviewListResult;
