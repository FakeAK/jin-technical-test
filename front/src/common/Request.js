export default class Request {
  static get() {
    this.method = 'GET';
    return this;
  }

  static post() {
    this.method = 'POST';
    return this;
  }

  static delete() {
    this.method = 'DELETE';
    return this;
  }

  static multipart() {
    this.isMultipart = true;
    return this;
  }

  static put() {
    this.method = 'PUT';
    return this;
  }

  static to(endpoint) {
    this.endpoint = endpoint;
    return this;
  };

  static payload(parameters) {
    this.parameters = parameters;
    return this;
  }

  static setHeaders() {
    let headers = {
      'Content-Type': 'application/json'
    }

    return headers;
  }

  static body() {
    return this.method !== 'GET' ? JSON.stringify(this.parameters) : null;
  }

  static async send() {
    try {
      const request = await fetch(this.endpoint, {
        method: this.method,
        headers: this.setHeaders(),
        body: this.body()
      });

      return await this.formatResponse(request);
    } catch (err) {
      throw err;
    }
  }

  static async formatResponse(request) {
    let response;

    try {
      response = await request.json();
    } catch (err) { } // AVOID WARNING IF RESPONSE HAS NO CONTENT

    if (request.status >= 200 && request.status < 300) {
      return response;
    } else if (request.status === 404) {
      throw new Error('Endpoint not found');
    } else {
      throw new Error(response.message);
    }
  }
}