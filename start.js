'use strict';
const mongoose = require('mongoose');
require('dotenv').config({ path: 'variables.env' });

// Connect to Database.
mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`${err.message}`);
});

//Import models.
require('./models/farmer');
require('./models/customer');
require('./models/product');
require('./models/personalProduct');

//Server runs at localhost:8000.
const server = require('./app');

server.listen({ port: process.env.PORT || 8000 });
console.log(`Server running on PORT ${process.env.PORT || 8000}`);
