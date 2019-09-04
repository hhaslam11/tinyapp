const urlDatabase = require('../database/urls');
const users = require('../database/users');
const generateUID = require('../helpers/tools').generateUID;

const setupPages = app => {
  // ===============================================
  // ||               Get requests                ||
  // ===============================================

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

};

module.exports = { setupPages };