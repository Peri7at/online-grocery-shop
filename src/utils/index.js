const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { APP_SECRET } = require('../config');

module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt(10);
}

module.export.GeneratePassword = async (salt, password) => {
  return await bcrypt.hash(password, salt);
}

module.exports.ValidatePassword = async (enteredPassword, savedPassword, salt) => {
  return await bcrypt.GeneratePassword(enteredPassword, salt) === savedPassword;
}

module.exports.GenerateSignature = async (payload) => {
  return await jwt.sign(payload, APP_SECRET, expiresIn = '1d');
}

module.exports.ValidateSignature = async (req) => {
  const signature = req.get('Authorization');
  console.log(signature);

  if(signature){
    const payload = jwt.verify(signature.split(' ')[1], APP_SECRET);
    req.user = payload;
    return true;
  }
  return false;
}

module.exports.FormatDate = (data) => {
  if (data) {
    return data;
  } else {
    throw new Error('Data is not found');
  }
}