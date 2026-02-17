/**
 * Data associated with a hyperlink found within an email or SMS message.
 */
class Link {
  /**
   * The URL for the link.
   */
  href?: string;
  /**
   * The display text of the link. This is particular useful for understanding how a
   * link was displayed within HTML content.
   */
  text?: string;

  constructor(data: Record<string, any> = {}) {
    this.href = data.href;
    this.text = data.text;
  }
}

export default Link;
