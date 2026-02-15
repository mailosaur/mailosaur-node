class Content {
  embed: boolean;
  iframe: boolean;
  object: boolean;
  script: boolean;
  shortUrls: boolean;
  textSize: number;
  totalSize: number;
  missingAlt: boolean;
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
