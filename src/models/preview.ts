class Preview {
  id?: string;
  emailClient?: string;
  disableImages?: boolean;

  constructor(data: Record<string, any> = {}) {
    this.id = data.id;
    this.emailClient = data.emailClient;
    this.disableImages = data.disableImages;
  }
}

export default Preview;
