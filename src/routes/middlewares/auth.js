const { ValidateSignature } = require('../../utils');

module.exports = async (req, res, next) => {
  const isAuth = await ValidateSignature(req);
  if (isAuth) {
    return next();
  }

  return res.status(403).json({ message: 'Not Authorized' });
}