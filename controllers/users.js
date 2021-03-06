const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const users = require('../models/users');
const generateUID = require('../helpers/generateUID');

// ===============================================
// ||               Get requests                ||
// ===============================================
//user registration page
router.get('/register', (req, res) => {
  //redirect to /urls if user is already logged in
  if (req.session.userID) {
    res.redirect('/urls');
    return;
  }
  const templateVars = {
    userID: req.session.userID,
    users: users.get(),
    query: req.query
  };
  res.render('register', templateVars);
});

//login page
router.get('/login', (req, res) => {
  //redirect to /urls if user is already logged in
  if (req.session.userID) {
    res.redirect('/urls');
    return;
  }
  const templateVars = {
    userID: req.session.userID,
    users: users.get(),
    query: req.query
  };
  res.render('login', templateVars);
});

// ===============================================
// ||               Post requests               ||
// ===============================================
//login
router.post('/login', (req, res) => {
  const user = users.searchByEmail(req.body.email);
  if (user && users.authenticate(req.body.email, req.body.password)) {
    req.session.userID = user.id;
    res.redirect('/urls');
  } else {
    res.redirect('/login?login_failed=true');
  }
});

//logout
router.post('/logout', (req, res) => {
  req.session.userID = null;
  res.redirect('/urls');
});

//register new user
router.put('/register', (req, res) => {

  if (!req.body.email || !req.body.password) {
    res.redirect('/register?failed=true');
    
  } else if (users.searchByEmail(req.body.email)) {
    res.redirect('/register?failed=true');

  } else {
    const uid = generateUID(6);
    users.register(uid, req.body.email, bcrypt.hashSync(req.body.password, 10));
    req.session.userID = uid;
    res.redirect('/urls');
  }

});

module.exports = router;