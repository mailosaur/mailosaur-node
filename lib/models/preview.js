class Preview {
  constructor(data = {}) {
    this.id = data.id;
    this.emailClient = data.emailClient;
    this.disableImages = data.disableImages;
  }
}

module.exports = Preview;
