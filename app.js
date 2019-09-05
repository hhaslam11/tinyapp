const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const requestsUsers = require('./controllers/users');
const requestsUrls = require('./controllers/urls');

const app = express();
const PORT = 8080;

//setup app
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// website root
app.get('/', (req, res) => {
  res.redirect('/urls/new');
});

requestsUsers.setupPages(app);
requestsUrls.setupPages(app);

//starts listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});