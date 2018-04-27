// Const
const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

// Port
const port = process.env.PORT || 3000;

// Var
var app = express();

// HBS Partials(like components in VueJs)
hbs.registerPartials(__dirname + '/views/partials');

// HBS Helper
hbs.registerHelper('currentYear', () => {
  return new Date().getFullYear();
});
hbs.registerHelper('upperCase', text => {
  return text.toUpperCase();
});

// Set & Use
app.set('view engine', 'hbs');

// Use middleware
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', error => {
    if (error) {
      console.log('Unable to append to server.log');
    }
  });
  next(); // Remenber to call next()
});

// Use maintenance middleware
// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

// Static public dir
app.use(express.static(__dirname + '/public'));

// HOME
app.get('/', (req, res) => {
  //   res.send('<h1>Hello Express</h1>');
  // res.send({
  //   name: 'christina',
  //   likes: ['bilibili', 'Hero of the galaxy']
  // });
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMsg: 'Welcome Home'
  });
});

// ABOUT
app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

// Project
app.get('/projects', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects'
  });
});

// BAD
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

// Express Listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
