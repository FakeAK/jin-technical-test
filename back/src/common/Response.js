class Response {
  constructor(res) {
    this.res = res;
    this._status = null;
    this._message = null;
    this._payload = null;

    return this;
  }

  sendOk() {
    return this.res.status(200).send();
  }

  status(status) {
    this._status = status;
    return this;
  }

  withMessage(message) {
    this._message = message;
    return this;
  }

  withPayload(payload) {
    this._payload = payload;
    return this;
  }

  send() {
    return this.res.status(this._status).json({
      message: this._message,
      payload: this._payload,
      status: this._status
    });
  }
}

module.exports = {
  Response
}