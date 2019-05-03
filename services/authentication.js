const path = require('path');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('../config/database');
const port = require('../config/server');
const users = require('../routes/users');
const database = require('./database');


function initialize() {

  return new Promise((resolve, reject) => {

    mongoose.connect(config.Mongoose.database, {useNewUrlParser: true});

    // On Connection
    mongoose.connection.on('connected', () => {
      console.log('Connected to User authentication database ');
    });

    // On Error
    mongoose.connection.on('error', (err) => {
      console.log('Database error: '+err);
    });

    const authapp = express();

    // Set Static Folder
    authapp.use(express.static(path.join(__dirname, '../angular')));

    // CORS MiddleWare
    authapp.use(cors());

    // Body Parser MiddleWare
    authapp.use(bodyParser.json());

    // Set user routes separate from query routes
    authapp.use('/users', users);

    // Default Database Startup message after Get '/'
    authapp.get('/', async (req, res) => {
        res.send('Invalid Endpoint');
    });

    authapp.listen(port.auth, () => {
      console.log('Auth server listening on localhost: ' + port.auth);
    });
  });
}

module.exports.initialize = initialize;
