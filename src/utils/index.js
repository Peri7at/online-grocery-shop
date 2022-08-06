const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const APP_SECRET = process.env.APP_SECRET;

module.exports.GenerateSalt = async () => {
  return await bcrypt.genSalt(10);
}

module.exports.GeneratePassword = async (salt, password) => {
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

module.exports.FormateData = (data) => {
  if (data) {
    return data;
  } else {
    throw new Error('Data is not found');
  }
}