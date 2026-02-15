class Image {
  src?: string;
  alt?: string;

  constructor(data: Record<string, any> = {}) {
    this.src = data.src;
    this.alt = data.alt;
  }
}

export default Image;
