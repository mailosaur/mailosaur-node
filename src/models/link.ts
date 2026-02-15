class Link {
  href?: string;
  text?: string;

  constructor(data: Record<string, any> = {}) {
    this.href = data.href;
    this.text = data.text;
  }
}

export default Link;
