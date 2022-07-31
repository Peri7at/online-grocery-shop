const express = require('express');
const app = express();
const {PORT} = require('./config');
const {db} = require('./db');
const server = require('./server');

const startServer = async () => {
  await db();
  server(app);
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  }).on('error', (err) => {
    console.error(err);
    process.exit();
  });
}

startServer();