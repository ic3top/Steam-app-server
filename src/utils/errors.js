class NodeError extends Error {
  constructor(message) {
    super(message);
    this.status = 500;
  }
}

class InvalidRequestError extends NodeError {
  constructor(message = 'Invalid request', status=400) {
    super(message);
    this.status = status;
  }
}

module.exports = {
  NodeError,
  InvalidRequestError,
};
