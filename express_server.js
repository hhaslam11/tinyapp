const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8080;

const urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//setup app
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));


const generateUID = length => {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let returnString = '';

  for (let i = 0; i < length; i++) {
    returnString += chars[Math.floor(Math.random() * chars.length)];
  }
  return returnString;
};

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.get('/urls.json', (req, res) => {
  res.json(urlDatabase);
});

app.get('/urls', (req, res) => {
  const templateVars = { urls: urlDatabase };
  res.render('urls_index', templateVars);
});

app.get('/urls/new', (req, res) => {
  res.render('urls_new');
});

app.get('/urls/:shortURL', (req, res) => {
  let templateVars = {
    shortURL: req.params.shortURL,
    longURL: urlDatabase[req.params.shortURL]
  };
  res.render('urls_show', templateVars);
});
app.post('/urls/:shortURL/delete', (req, res) => {
  delete urlDatabase[req.params.shortURL];
  res.redirect('/urls');
});

app.get('/u/:url', (req, res) => {
  res.redirect(urlDatabase[req.params.url]);
});

app.post('/urls', (req, res) => {
  const uid = generateUID(6);
  console.log(req.body);
  urlDatabase[uid] = req.body.longURL;
  res.redirect(`/urls/${uid}`);
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

