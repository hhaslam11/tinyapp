const users = require('../db_objects/users');
const { generateUID, searchByEmail } = require('../tools');

const setupPages = app => {
  // ===============================================
  // ||               Get requests                ||
  // ===============================================
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

  // ===============================================
  // ||               Post requests               ||
  // ===============================================
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
};

module.exports = { setupPages };