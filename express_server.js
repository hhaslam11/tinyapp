const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = 8080;

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};
const users = require('./users');

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

/**
 * returns searches users by email
 * @param {string} email email to search by
 * @param {object} users database to search
 * @returns a user object if user is found
 * @returns false if no user is found
 */
const searchByEmail = (email, object) => {
  for (let key in object) {
    if (object[key].email === email) {
      return object[key];
    }
  }
  return false;
};

// ===============================================
// ||               Get requests                ||
// ===============================================
// website root
app.get('/', (req, res) => {
  res.redirect('/urls');
});

//url object as json string
app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

//urls page. lists all urls, gives option to edit/delete
app.get('/urls', (req, res) => {
  const templateVars = {
    urls: urlDatabase,
    userID: req.cookies.userID,
    users: users
  };
  res.render('urls_index', templateVars);
});

//create a new url
app.get('/urls/new', (req, res) => {
  const templateVars = { userID: req.cookies.userID, users: users };
  res.render('urls_new', templateVars);
});

//shows specific url, lets user edit it from here
app.get('/urls/:shortURL', (req, res) => {
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL],
    userID: req.cookies.userID,
    users: users
  };
  res.render('urls_show', templateVars);
});

//user registration page
app.get('/register', (req, res) => {
  const templateVars = {
    userID: req.cookies.userID,
    users: users,
    query: req.query
  };
  res.render('register', templateVars);
});

//login page
app.get('/login', (req, res) => {
  const templateVars = {
    userID: req.cookies.userID,
    users: users,
    query: req.query
  };
  res.render('login', templateVars);
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

//login
app.post('/login', (req, res) => {
  const user = searchByEmail(req.body.email, users);
  console.log(user);
  if (user && user.password === req.body.password) {
    res.cookie('userID', user.id);
    res.redirect('/urls');
  } else {
    res.redirect('/login?login_failed=true');
  }
});

//logout
app.post('/logout', (req, res) => {
  res.clearCookie('userID');
  res.redirect('/urls');
});

//register new user
app.post('/register', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.redirect('/register?failed=true');
  } else if (searchByEmail(req.body.email, users)) {
    res.redirect('/register?failed=true');
  } else {
    const uid = generateUID(6);
    users[uid] = {
      id: uid,
      email: req.body.email,
      password: req.body.password
    };
    res.cookie('userID', uid);
    res.redirect('/urls');
  }
});

//starts listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});