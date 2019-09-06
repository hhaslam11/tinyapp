const express = require('express');
const router = express.Router();

const users = require('../models/users');
const urls = require('../models/urls');
const generateUID = require('../helpers/generateUID');

// ===============================================
// ||               Get requests                ||
// ===============================================
//urls page. lists all urls, gives option to edit/delete
router.get('/urls', (req, res) => {

  //filter through urls that the user has access to, and
  //adds required info to a seperate object (urlDB) for
  //reading in urls_index.ejs
  const urlDB = {};
  for (let urlKey of urls.urlsForUser(req.session.userID)) {
    urlDB[urlKey] = {
      longURL: urls.get(urlKey).longURL,
      clicked: urls.getClicks(urlKey),
      uniqueVisiters: urls.getUniqueVisiters(urlKey)
    };
  }
  const templateVars = {
    userID: req.session.userID,
    users: users.get(),
    urlDB: urlDB
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

  //redirects back to /urls if the shortURL doesnt exist
  if (!urls.get(req.params.shortURL)) {
    res.redirect('/urls/');
    return;
  }

  //check if user has permission to edit the url
  const permission = urls.get(req.params.shortURL).userID === req.session.userID;
  const templateVars = {
    shortURL: req.params.shortURL,
    longURL: urls.get(req.params.shortURL).longURL,
    userID: req.session.userID,
    permission: permission,
    users: users.get(),
    visitLog: urls.getVisitLog(req.params.shortURL)
  };
  res.render('urls_show', templateVars);
});

//redirect user to full url
router.get('/u/:url', (req, res) => {

  const url = req.params.url;

  if (urls.get(url)) {
    urls.addClick(url);
    
    //create new clientID cookie if user doesnt already have one
    if (!req.session.clientID) req.session.clientID = generateUID(10);
    
    //if clientID is not already in the array, then add it.
    if (!urls.getClientArray(url).includes(req.session.clientID)) urls.addClientId(url, req.session.clientID);

    //add visitLog to urldatabase
    urls.addVisitLog(url, req.session.clientID);
    
    res.redirect(urls.get(url).longURL);

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
  if (urls.get(req.params.id).userID === req.session.userID) {
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