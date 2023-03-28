class PreviewRequest {
  constructor(emailClient, disableImages = false) {
    this.emailClient = emailClient;
    this.disableImages = disableImages;
  }
}

module.exports = PreviewRequest;
