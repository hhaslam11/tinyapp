const express = require('express');
const router = express.Router();

const generateUID = require('../helpers/generateUID');
const bcrypt = require('bcrypt');
const users = require('../models/users');


// ===============================================
// ||               Get requests                ||
// ===============================================
//user registration page
router.get('/register', (req, res) => {
  const templateVars = {
    userID: req.cookies.userID,
    users: users.get(),
    query: req.query
  };
  res.render('register', templateVars);
});

//login page
router.get('/login', (req, res) => {
  const templateVars = {
    userID: req.cookies.userID,
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
    res.cookie('userID', user.id);
    res.redirect('/urls');
  } else {
    res.redirect('/login?login_failed=true');
  }
});

//logout
router.post('/logout', (req, res) => {
  res.clearCookie('userID');
  res.redirect('/urls');
});

//register new user
router.post('/register', (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.redirect('/register?failed=true');
  } else if (users.searchByEmail(req.body.email)) {
    res.redirect('/register?failed=true');
  } else {
    const uid = generateUID(6);
    users.register(uid, req.body.email, bcrypt.hashSync(req.body.password, 10));
    res.cookie('userID', uid);
    res.redirect('/urls');
  }
});

module.exports = router;