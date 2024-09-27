class Content {
  constructor(data = {}) {
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

module.exports = Content;
