/**
 * Data associated with an image found within a message.
 */
class Image {
  /**
   * The value of the `src` attribute of the image.
   */
  src?: string;
  /**
   * The `alt` text (alternative text), used to describe the image.
   */
  alt?: string;

  constructor(data: Record<string, any> = {}) {
    this.src = data.src;
    this.alt = data.alt;
  }
}

export default Image;
