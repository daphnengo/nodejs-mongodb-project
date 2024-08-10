const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

const { mongoConnect } = require('./util/database');

const User = require('./models/user');

const errorsRoutes = require('./routes/errors');
const storeRoutes = require('./routes/store');
const adminRoutes = require('./routes/admin');

const app = express();

app.set('views', path.join(__dirname, 'views'));
// Set EJS View Engine
app.set('view engine','ejs');
// Set HTML engine
app.engine('html', require('ejs').renderFile);

// parse application/json
// app.use(bodyParser.json());
// "body-parser" module is used to parse HTTP request body
// It parses different types of payloads, such as URL-encoded data or JSON
// then populate the "req.body" object with parsed data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/views'));

// create a middleware to store user in the request
// so that we can access it anywhere in the project
// the middleware is only created after the server is connected successfully
// therefore, we only have a dummy user created below
app.use((req, res, next) => {
  // create user manually in MongoDB Compass
  // then paste userId here
  User.findUserById("66b7fb2deb548930d1fffecb")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use(errorsRoutes);
app.use(storeRoutes);
app.use('/admin', adminRoutes);

mongoConnect(() => {
  app.listen(3000);
});
