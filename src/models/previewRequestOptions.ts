class PreviewRequestOptions {
  emailClients: string[];

  constructor(emailClients: string[] = []) {
    this.emailClients = emailClients;
  }
}

export default PreviewRequestOptions;
