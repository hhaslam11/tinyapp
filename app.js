const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const methodOverride = require('method-override');

const app = express();
const PORT = 8080;

//setup app
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(cookieSession({
  name: 'session',
  keys: ['3124521']
}));



//routers
app.use(require('./controllers'));


//starts listening
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});