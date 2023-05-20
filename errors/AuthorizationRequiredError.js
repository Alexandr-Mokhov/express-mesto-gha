const Error = require('./Error');

module.exports = class AuthorizationRequiredError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationRequiredError';
    this.statusCode = 401;
  }
};
