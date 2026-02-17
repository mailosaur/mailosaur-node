/**
 * Describes an email client with which email previews can be generated.
 */
class EmailClient {
  /**
   * The unique email client label. Used when generating email preview requests.
   */
  label?: string;
  /**
   * The display name of the email client.
   */
  name?: string;

  constructor(data: Record<string, any> = {}) {
    this.label = data.label;
    this.name = data.name;
  }
}

export default EmailClient;
