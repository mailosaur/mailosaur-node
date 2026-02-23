import Link from './link.js';
import Code from './code.js';
import Image from './image.js';

/**
 * The content of the message.
 */
class MessageContent {
  /**
   * Any hyperlinks found within this content.
   */
  links?: Link[];
  /**
   * Any verification codes found within this content.
   */
  codes?: Code[];
  /**
   * Any images found within this content.
   */
  images?: Image[];
  /**
   * The HTML or plain text body of the message.
   */
  body?: string;

  constructor(data: Record<string, any> = {}) {
    this.links = (data.links || []).map(
      (i: Record<string, unknown>) => new Link(i)
    );
    this.codes = (data.codes || []).map(
      (i: Record<string, unknown>) => new Code(i)
    );

    if (data.images) {
      this.images = (data.images || []).map(
        (i: Record<string, unknown>) => new Image(i)
      );
    }

    this.body = data.body;
  }
}

export default MessageContent;
