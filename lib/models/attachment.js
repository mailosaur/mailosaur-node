'use strict';

/**
 * Class representing a Attachment.
 */
class Attachment {
  /**
   * Create a Attachment.
   * @member {uuid} id
   * @member {string} [contentType]
   * @member {string} [fileName]
   * @member {string} [contentId]
   * @member {number} [length]
   * @member {string} [url]
   */
  constructor(data) {
    data = data || {};
    
    this.id = data.id;
    this.contentType = data.contentType;
    this.fileName = data.fileName;
    this.contentId = data.contentId;
    this.length = data.length;
    this.url = data.url;
  }
}

module.exports = Attachment;
