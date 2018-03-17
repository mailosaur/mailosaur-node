'use strict';

/**
 * Class representing a Image.
 */
class Image {
  /**
   * Create a Image.
   * @member {string} [src]
   * @member {string} [alt]
   */
  constructor(data) {
    data = data || {};
    
    this.src = data.src;
    this.alt = data.alt;
  }
}

module.exports = Image;
