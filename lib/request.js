const https = require('https');
const { URL } = require('url');
const pkg = require('../package.json');

class Request {
  constructor(options) {
    this.baseUrl = options.baseUrl || 'https://mailosaur.com/';
    const encodedKey = Buffer.from(`${options.apiKey}:`).toString('base64');
    this.headers = {
      Accept: 'application/json',
      Authorization: `Basic ${encodedKey}`,
      'User-Agent': options.agent || `mailosaur-node/${pkg.version}`
    };
  }

  buildOptions(method, path, options = {}) {
    const result = {
      method,
      url: `${this.baseUrl}${path}`,
      headers: {
        Accept: this.headers.Accept,
        Authorization: this.headers.Authorization,
        'User-Agent': this.headers['User-Agent']
      }
    };

    if (options.buffer) {
      result.buffer = true;
    }

    if (options.qs) {
      Object.keys(options.qs).forEach((key, index) => {
        let value = options.qs[key];
        if (!value) {
          return;
        }
        if (value instanceof Date) {
          value = value.toISOString();
        }
        const prefix = !index ? '?' : '&';
        result.url += `${prefix}${key}=${value}`;
      });
    }

    if (options.body) {
      result.data = JSON.stringify(options.body);
      result.headers['Content-Type'] = 'application/json';
      result.headers['Content-Length'] = result.data.length;
    }
    return result;
  }

  invoke(options, callback) {
    const url = new URL(options.url);

    // Ignoring as spread is not compatible with Node 6
    // eslint-disable-next-line prefer-object-spread
    const spread = Object.assign({}, options, {
      protocol: url.protocol,
      hostname: url.hostname,
      path: url.pathname + url.search
    });
    const req = https.request(spread, (res) => {
      const data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => {
        try {
          if (data) {
            res.body = options.buffer ?
              Buffer.concat(data) :
              JSON.parse(Buffer.concat(data).toString());
          }
        } catch (e) {
          res.body = data;
        }

        callback(null, res, res.body);
      });
    });

    req.on('error', (e) => callback(e));

    if (options.data) {
      req.write(options.data);
    }

    req.end();
  }

  request(method, path, options, callback) {
    /* eslint-disable no-param-reassign */
    if (typeof options === 'function') {
      callback = options;
      options = undefined;
    }
    /* eslint-enable no-param-reassign */

    const requestOptions = this.buildOptions(method, path, options);
    this.invoke(requestOptions, callback);
  }

  get(path, options, callback) {
    this.request('GET', path, options, callback);
  }

  put(path, options, callback) {
    this.request('PUT', path, options, callback);
  }

  post(path, options, callback) {
    this.request('POST', path, options, callback);
  }

  del(path, options, callback) {
    this.request('DELETE', path, options, callback);
  }
}

module.exports = Request;
