/**
 * The results of email content analysis
 */
class Content {
  /**
   * The content contained embed tags
   */
  embed: boolean;
  /**
   * The content contained Iframe tags
   */
  iframe: boolean;
  /**
   * The content contained object tags
   */
  object: boolean;
  /**
   * The content contained script tags
   */
  script: boolean;
  /**
   * The content contained URL's that have been shortened
   */
  shortUrls: boolean;
  /**
   * The length of all text that the content contained
   */
  textSize: number;
  /**
   * The length of all HTML that the content contained
   */
  totalSize: number;
  /**
   * Image(s) were missing "alt" properties
   */
  missingAlt: boolean;
  /**
   * The message is missing a "List-Unsubscribe" header
   */
  missingListUnsubscribe: boolean;

  constructor(data: Record<string, any> = {}) {
    this.embed = data.embed;
    this.iframe = data.iframe;
    this.object = data.object;
    this.script = data.script;
    this.shortUrls = data.shortUrls;
    this.textSize = data.textSize;
    this.totalSize = data.totalSize;
    this.missingAlt = data.missingAlt;
    this.missingListUnsubscribe = data.missingListUnsubscribe;
  }
}

export default Content;
