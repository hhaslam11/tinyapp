const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const app = express();
const PORT = 8080;

//setup app
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieSession({
  name: 'session',
  keys: ['3124521']
}));

// website root
app.get('/', (req, res) => {
  res.redirect('/urls/new');
});

app.use(require('./controllers'));

//starts listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});