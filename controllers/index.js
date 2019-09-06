const express = require('express');
const router = express.Router();

router.use(require('./urls'));
router.use(require('./users'));

// website root
router.get('/', (req, res) => {
  res.redirect('/urls/new');
});

//catch favicon from getting redirected
router.get('/favicon.ico', (req, res) => {
  res.sendStatus(404);
});

//catch 404's
router.get('*', (req, res) => {
  res.redirect('/urls/new?error=404');
});

module.exports = router;