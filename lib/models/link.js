'use strict';

/**
 * Class representing a Link.
 */
class Link {
  /**
   * Create a Link.
   * @member {string} [href]
   * @member {string} [text]
   */
  constructor(data) {
    data = data || {};
    
    this.href = data.href;
    this.text = data.text;
  }
}

module.exports = Link;
