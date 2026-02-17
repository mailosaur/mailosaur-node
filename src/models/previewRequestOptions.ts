/**
 * Preview request options.
 */
class PreviewRequestOptions {
  /**
   * The list email clients to generate previews with.
   */
  emailClients: string[];

  constructor(emailClients: string[] = []) {
    this.emailClients = emailClients;
  }
}

export default PreviewRequestOptions;
