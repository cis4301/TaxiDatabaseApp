const path = require('path');
const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('../config/database');
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
    // Set Heroku port
    const port = process.env.PORT || 8080;

    // Set Static Folder
    authapp.use(express.static('./public'));

    // CORS MiddleWare
    authapp.use(cors());

    // Body Parser MiddleWare
    authapp.use(bodyParser.json());

    // Passport MiddleWare
    authapp.use(passport.initialize());
    authapp.use(passport.session());

    require('../config/passport.js')(passport);

    // Set user routes separate from query routes
    authapp.use('/users', users);

    // Default Database Startup message after Get '/'
    authapp.get('/', async (req, res) => {
        res.send('Invalid Endpoint');
    });

    authapp.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../public/index.html'));
    });

    authapp.listen(port, () => {
      console.log('Auth server listening on localhost: ' + port);
    });
  });
}

module.exports.initialize = initialize;
