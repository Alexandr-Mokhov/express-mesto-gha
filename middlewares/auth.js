const jwt = require('jsonwebtoken');
const AuthorizationRequiredError = require('../errors/AuthorizationRequiredError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationRequiredError('Требуется авторизация.'));
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (e) {
    return next(new AuthorizationRequiredError('Требуется авторизация.'));
  }

  req.user = payload;

  return next();
};
