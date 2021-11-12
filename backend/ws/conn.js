import request from "request";

export default class Conn {
  
  constructor(baseUrl, defaultRequestOpts = {}) {
    this.baseUrl = baseUrl;  
    this.defaultRequestOpts = defaultRequestOpts;  
  }

  set setBaseUrl(baseUrl) {
    this.baseUrl = baseUrl;
  }

  setDefaultRequestOpts(opts) {
    this.defaultRequestOpts = opts;
  }

  request(endpoint, method, extraOpts = {}) {
    return new Promise((resolve, reject) => {
      const opts = {
        method,
        url: this.baseUrl + endpoint,
        json: true,
        ...extraOpts,
        ...this.defaultRequestOpts
      }
      request(opts, (err, response, result) => {
        if (err)  return reject(err);
        return resolve({ result, response });
      });
    })
  }
}