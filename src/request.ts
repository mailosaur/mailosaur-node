import * as https from 'https';
import { HttpsProxyAgent } from 'https-proxy-agent';
import * as url from 'url';

interface RequestOptions {
  baseUrl?: string;
  apiKey: string;
  agent?: string;
}

interface BuildOptionsParams {
  qs?: Record<string, string | number | Date | undefined>;
  body?: unknown;
  buffer?: boolean;
}

interface InvokeOptions {
  method: string;
  url: string;
  headers: Record<string, string>;
  data?: Buffer;
  agent?: HttpsProxyAgent<string>;
  buffer?: boolean;
}

interface HttpResponse {
  statusCode: number;
  body?: unknown;
}

class Request {
  private baseUrl: string;
  private headers: Record<string, string>;
  private proxyAgent?: HttpsProxyAgent<string>;

  constructor(options: RequestOptions) {
    this.baseUrl = options.baseUrl || 'https://mailosaur.com/';
    const encodedKey = Buffer.from(`${options.apiKey}:`).toString('base64');

    // Read package.json version for User-Agent
    // eslint-disable-next-line global-require
    const pkg = require('../package.json');

    this.headers = {
      Accept: 'application/json',
      Authorization: `Basic ${encodedKey}`,
      'User-Agent': options.agent || `mailosaur-node/${pkg.version}`,
    };

    const httpProxy =
      process.env.https_proxy ||
      process.env.HTTPS_PROXY ||
      process.env.http_proxy ||
      process.env.HTTP_PROXY;
    if (httpProxy) {
      this.proxyAgent = new HttpsProxyAgent(httpProxy);
    }
  }

  private buildOptions(
    method: string,
    path: string,
    options: BuildOptionsParams = {}
  ): InvokeOptions {
    const result: InvokeOptions = {
      method,
      url: `${this.baseUrl}${path}`,
      headers: {
        Accept: this.headers.Accept,
        Authorization: this.headers.Authorization,
        'User-Agent': this.headers['User-Agent'],
      },
    };

    if (options.buffer) {
      result.buffer = true;
    }

    if (options.qs) {
      const qs = options.qs;
      Object.keys(qs).forEach((key, index) => {
        let value = qs[key];
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
      const data = JSON.stringify(options.body);
      result.data = Buffer.from(data);
      result.headers['Content-Type'] = 'application/json';
      result.headers['Content-Length'] = Buffer.byteLength(result.data) as any;
    }

    if (this.proxyAgent) {
      result.agent = this.proxyAgent;
    }

    return result;
  }

  private invoke(
    options: InvokeOptions,
    callback: (
      err: Error | null,
      response?: HttpResponse,
      body?: unknown
    ) => void
  ): void {
    let urlResult: url.URL | url.UrlWithStringQuery;

    try {
      urlResult = new url.URL(options.url);
    } catch (_ex) {
      urlResult = url.parse(options.url);
    }

    const spread: https.RequestOptions = {
      ...options,
      protocol: urlResult.protocol as any,
      hostname: urlResult.hostname as any,
      path: (urlResult.pathname || '') + (urlResult.search || ''),
    };

    const req = https.request(spread, res => {
      const data: Buffer[] = [];
      res.on('data', (chunk: Buffer) => data.push(chunk));
      res.on('end', () => {
        try {
          if (data) {
            (res as HttpResponse).body = options.buffer
              ? Buffer.concat(data)
              : JSON.parse(Buffer.concat(data).toString());
          }
        } catch (_ex) {
          (res as HttpResponse).body = data;
        }

        callback(null, res as HttpResponse, (res as HttpResponse).body);
      });
    });

    req.on('error', (e: Error) => callback(e));

    if (options.data) {
      req.write(options.data);
    }

    req.end();
  }

  request(
    method: string,
    path: string,
    options?: BuildOptionsParams,
    callback?: (
      err: Error | null,
      response?: HttpResponse,
      body?: unknown
    ) => void
  ): void {
    let cb = callback;
    let opts = options;
    if (typeof options === 'function') {
      cb = options;
      opts = undefined;
    }

    const requestOptions = this.buildOptions(method, path, opts);
    if (!cb) {
      throw new Error('Callback is required.');
    }
    this.invoke(requestOptions, cb);
  }

  get(
    path: string,
    options?: BuildOptionsParams,
    callback?: (
      err: Error | null,
      response?: HttpResponse,
      body?: unknown
    ) => void
  ): void {
    this.request('GET', path, options, callback);
  }

  put(
    path: string,
    options?: BuildOptionsParams,
    callback?: (
      err: Error | null,
      response?: HttpResponse,
      body?: unknown
    ) => void
  ): void {
    this.request('PUT', path, options, callback);
  }

  post(
    path: string,
    options?: BuildOptionsParams,
    callback?: (
      err: Error | null,
      response?: HttpResponse,
      body?: unknown
    ) => void
  ): void {
    this.request('POST', path, options, callback);
  }

  del(
    path: string,
    options?: BuildOptionsParams,
    callback?: (
      err: Error | null,
      response?: HttpResponse,
      body?: unknown
    ) => void
  ): void {
    this.request('DELETE', path, options, callback);
  }
}

export default Request;
