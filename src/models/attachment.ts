class Attachment {
  id: string;
  contentType?: string;
  fileName?: string;
  content?: string;
  contentId?: string;
  length?: number;
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
