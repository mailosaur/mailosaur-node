import Link from './link';
import Code from './code';
import Image from './image';

class MessageContent {
  links?: Link[];
  codes?: Code[];
  images?: Image[];
  body?: string;

  constructor(data: Record<string, any> = {}) {
    this.links = (data.links || []).map((i: any) => new Link(i));
    this.codes = (data.codes || []).map((i: any) => new Code(i));

    if (data.images) {
      this.images = (data.images || []).map((i: any) => new Image(i));
    }

    this.body = data.body;
  }
}

export default MessageContent;
