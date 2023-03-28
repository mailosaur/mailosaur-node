class PreviewEmailClient {
  constructor(data = {}) {
    this.id = data.id;
    this.name = data.emailClient;
    this.platformGroup = data.platformGroup;
    this.platformType = data.platformType;
    this.platformVersion = data.platformVersion;
    this.canDisableImages = data.canDisableImages;
    this.status = data.status;
  }
}

module.exports = PreviewEmailClient;
