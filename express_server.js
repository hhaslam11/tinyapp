const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8080;

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//setup app
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

/**
 * Generate a unique ID
 * @param {number} length the length of the string you want
 * @returns a random ID using chars a-z and 0-9
 */
const generateUID = length => {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let returnString = '';

  for (let i = 0; i < length; i++) {
    returnString += chars[Math.floor(Math.random() * chars.length)];
  }
  return returnString;
};

// ===============================================
// ||               Get requests                ||
// ===============================================
// website root
app.get('/', (req, res) => {
  res.send('Hello!');
});

//url object as json string
app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

//urls page. lists all urls, gives option to edit/delete
app.get('/urls', (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render('urls_index', templateVars);
});

//create a new url
app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

//shows specific url, lets user edit it from here
app.get('/urls/:shortURL', (req, res) => {
  let templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL]
  };
  res.render('urls_show', templateVars);
});

//redirect user to full url
app.get('/u/:url', (req, res) => {
  res.redirect(urlDatabase[req.params.url]);
});

// ===============================================
// ||               Post requests               ||
// ===============================================
// deletes url
app.post('/urls/:shortURL/delete', (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect('/urls');
});

//edits existing url
app.post('/urls/:id', (req, res) => {
  urlDatabase[req.params.id] = req.body.longURL;
  res.redirect('/urls');
});

//creates new url
app.post('/urls', (req, res) => {
  const uid = generateUID(6);
  urlDatabase[uid] = req.body.longURL;
  res.redirect(`/urls/${uid}`);
});

//login form
app.post('/login', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/urls');
});


//starts listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

