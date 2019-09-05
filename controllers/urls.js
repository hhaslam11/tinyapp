// const urlDatabase = require('../database/urls');
const users = require('../database/users');
const generateUID = require('../helpers/generateUID');
const urls = require('../models/urls');

const setupPages = app => {
  // ===============================================
  // ||               Get requests                ||
  // ===============================================

  //urls page. lists all urls, gives option to edit/delete
  app.get('/urls', (req, res) => {
    const templateVars = {
      urls: urls.get(),
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
    //TODO make sure :shortURL exists before rendering
    if (!urls.get(req.params.shortURL)) {
      res.redirect('/urls/');
      return;
    }
    const templateVars = {
      shortURL: req.params.shortURL,
      longURL: urls.get(req.params.shortURL).longURL,
      userID: req.cookies.userID,
      users: users
    };
    res.render('urls_show', templateVars);
  });

  //redirect user to full url
  app.get('/u/:url', (req, res) => {
    res.redirect(urls.get(req.params.url).longURL);
  });

  // ===============================================
  // ||               Post requests               ||
  // ===============================================

  // deletes url
  app.post('/urls/:shortURL/delete', (req, res) => {
    urls.remove(req.params.shortURL);
    res.redirect('/urls');
  });

  //edits existing url
  app.post('/urls/:id', (req, res) => {
    urls.edit(req.params.id, req.body.longURL);
    res.redirect('/urls');
  });

  //creates new url
  app.post('/urls', (req, res) => {
    const uid = generateUID(6);
    urls.create(uid, req.body.longURL);
    res.redirect(`/urls/${uid}`);
  });

};

module.exports = { setupPages };