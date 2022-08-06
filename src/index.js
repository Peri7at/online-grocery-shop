const express = require('express');
require('dotenv').config();
const port = process.env.PORT;
const { databaseConnection } = require('./db');
const server = require('./server');

const startServer = async () => {
  const app = express();
  await databaseConnection();
  await server(app);
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  }).on('error', (err) => {
    console.error(err);
    process.exit();
  });
}

startServer();