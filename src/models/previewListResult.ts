import Preview from './preview';

class PreviewListResult {
  items?: Preview[];

  constructor(data: Record<string, any> = {}) {
    this.items = (data.items || []).map((i: any) => (new Preview(i)));
  }
}

export default PreviewListResult;
