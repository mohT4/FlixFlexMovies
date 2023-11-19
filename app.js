const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('DATABASE CONNECTED...'));

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
