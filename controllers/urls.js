const express = require('express');
const router = express.Router();

const users = require('../models/users');
const generateUID = require('../helpers/generateUID');
const urls = require('../models/urls');

// ===============================================
// ||               Get requests                ||
// ===============================================

//urls page. lists all urls, gives option to edit/delete
router.get('/urls', (req, res) => {
  const templateVars = {
    urls: urls.urlsForUser(req.session.userID),
    userID: req.session.userID,
    users: users.get(),
    urlDatabase: urls.get()
  };
  res.render('urls_index', templateVars);
});

//create a new url
router.get('/urls/new', (req, res) => {
  const templateVars = {
    userID: req.session.userID,
    users: users.get(),
    query: req.query
  };
  res.render('urls_new', templateVars);
});

//shows specific url, lets user edit it from here
router.get('/urls/:shortURL', (req, res) => {
  if (!urls.get(req.params.shortURL)) {
    res.redirect('/urls/');
    return;
  }
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urls.get(req.params.shortURL).longURL,
    userID: req.session.userID,
    users: users.get()
  };
  res.render('urls_show', templateVars);
});

//redirect user to full url
router.get('/u/:url', (req, res) => {
  if (urls.get(req.params.url)) {
    res.redirect(urls.get(req.params.url).longURL);
  } else {
    res.redirect('/urls/new?error=noUrl');
  }
});

// ===============================================
// ||               Post requests               ||
// ===============================================

// deletes url
router.post('/urls/:shortURL/delete', (req, res) => {
  if (req.session.userID) {
    urls.remove(req.params.shortURL);
    res.redirect('/urls');
  } else {
    res.sendStatus(403);
  }
});

//edits existing url
router.post('/urls/:id', (req, res) => {
  if (req.session.userID) {
    urls.edit(req.params.id, req.body.longURL);
    res.redirect('/urls');
  } else {
    res.sendStatus(403);
  }
});

//creates new url
router.post('/urls', (req, res) => {
  if (req.session.userID) {
    const uid = generateUID(6);
    urls.create(uid, req.body.longURL, req.session.userID);
    res.redirect(`/urls/${uid}`);
  } else {
    res.sendStatus(403);
  }
});


module.exports = router;