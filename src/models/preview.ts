/**
 * Describes an email preview.
 */
class Preview {
  /**
   * Unique identifier for the email preview.
   */
  id?: string;
  /**
   * The email client the preview was generated with.
   */
  emailClient?: string;
  /**
   * True if images were disabled in the preview.
   */
  disableImages?: boolean;

  constructor(data: Record<string, any> = {}) {
    this.id = data.id;
    this.emailClient = data.emailClient;
    this.disableImages = data.disableImages;
  }
}

export default Preview;
