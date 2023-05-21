module.exports = class ConflictingRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictingRequestError';
    this.statusCode = 409;
  }
};
