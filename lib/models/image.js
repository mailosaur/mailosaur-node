/**
 * Class representing a Image.
 */
class Image {
  /**
   * Create a Image.
   * @member {string} [src]
   * @member {string} [alt]
   */
  constructor(data = {}) {
    this.src = data.src;
    this.alt = data.alt;
  }
}

module.exports = Image;
