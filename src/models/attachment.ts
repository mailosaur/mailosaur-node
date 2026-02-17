/**
 * Describes a message attachment.
 */
class Attachment {
  /**
   * Unique identifier for the attachment.
   */
  id: string;
  /**
   * The MIME type of the attachment.
   */
  contentType?: string;
  /**
   * The filename of the attachment.
   */
  fileName?: string;
  /**
   * The base64-encoded content of the attachment. Note: This is only populated when sending attachments.
   */
  content?: string;
  /**
   * The content identifier (for attachments that are embedded within the body of the message).
   */
  contentId?: string;
  /**
   * The file size, in bytes.
   */
  length?: number;
  /**
   * The URL from which the attachment can be downloaded.
   */
  url?: string;

  constructor(data: Record<string, any> = {}) {
    this.id = data.id;
    this.contentType = data.contentType;
    this.fileName = data.fileName;
    this.content = data.content;
    this.contentId = data.contentId;
    this.length = data.length;
    this.url = data.url;
  }
}

export default Attachment;
