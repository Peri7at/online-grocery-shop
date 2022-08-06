const mongoose = require('mongoose');
require('dotenv').config();
const db_url = process.env.MONGODB_URI

module.exports = async () => {
  try {
    await mongoose.connect(db_url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (err) {
    console.log('======= Error =======')
    console.log(err);
    process.exit(1);
  }
};