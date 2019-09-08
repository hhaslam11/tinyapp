# Tiny app
**A simple url shortener**


Description
=
Tinyapp is a URL minifier, similar to [Bitly](https://bitly.com/). You enter a full URL, and Tinyapp will create a smaller, shorter link to it.
This project is part of the [Lighthouse Labs bootcamp](https://www.lighthouselabs.ca/web-bootcamp) curriculum, the focus is on learning how to use http, cookies, and create a server in [nodejs](https://nodejs.org)
_Warning: Databases were not a part of this project, the "databases" here are just objects stored in memory. See Disclaimers for more information_

<a href="https://postimg.cc/qzXkZ70X" target="_blank"><img src="https://i.postimg.cc/xTBc8k47/Screenshot-2019-09-05-New-URL-Tiny-App-Example.png" alt="Screenshot-2019-09-05-New-URL-Tiny-App-Example"/></a><a href="https://postimg.cc/2qHg6szL" target="_blank"><img src="https://i.postimg.cc/B6s3h3kp/Screenshot-2019-09-06-Tiny-App-nso40x.png" alt="Screenshot-2019-09-06-Tiny-App-nso40x"/></a> <a href="https://postimg.cc/wtxS9qdd" target="_blank"><img src="https://i.postimg.cc/KYtFrjq4/Screenshot-2019-09-06-Tiny-App-Url-s.png" alt="Screenshot-2019-09-06-Tiny-App-Url-s"/></a> 

Features
=
 - Make tiny urls that redirect to full urls
 - Login/register system
 - See all your created links
 - Create/edit/delete your own links
 - See how many times your link have been clicked
 - See how many unique users have clicked your link
 - Keep track of when/how often your links are clicked
 

Installing
=
#### Requirements:

 - node
 - npm
 - git (optional)

####  Download
With git:

 - `git clone https://github.com/hhaslam11/tinyapp`

Without git:
- Download [https://github.com/hhaslam11/tinyapp/archive/master.zip](https://github.com/hhaslam11/tinyapp/archive/master.zip)
- Extract the archive

#### Install dependencies

 - Change into the project directory
 -- `cd tinyapp`
 - Install node dependencies
 -- `npm install`
 - Run the server
 -- `npm start`

You should now be able to access Tinyapp by visiting [http://localhost:8080/](http://localhost:8080/)

Technology stack
=
#### Server
 - [Nodejs](https://nodejs.org/)
 - [Node Package Manager](https://www.npmjs.com/)
 - [Express](https://expressjs.com/)
#### Front end
 - [Bootstrap 4](https://getbootstrap.com/)
 - [EJS](https://ejs.co/)

Node Dependencies
=
_run `npm install` to install these automatically_
- [bcrypt](https://www.npmjs.com/package/bcrypt) ⇒ used to encrypt passwords
- [body-parser](https://www.npmjs.com/package/body-parser) ⇒ middleware for parsing request bodies
- [cookie-session](https://www.npmjs.com/package/cookie-session) ⇒ store and access encrypted cookies
- [ejs](https://www.npmjs.com/package/ejs) ⇒ javascript/html templating language
- [express](https://www.npmjs.com/package/express) ⇒ http server 
#### Dev dependencies
- [mocha](https://www.npmjs.com/package/mocha) ⇒ Automated unit testing
- [chai](https://www.npmjs.com/package/chai) ⇒ Assertion library (used with mocha)
- [nodemon](https://www.npmjs.com/package/nodemon) ⇒ Automatically restart server on file change

Folder/File structure
=
The structure of this app is based off the [Model-view-controller (MCV)](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller) pattern. The article this is heavily following is [here](https://www.terlici.com/2014/08/25/best-practices-express-structure.html)

The structure looks like this
```
app.js
color/
controllers/
database/
helpers/
models/
public/
test/
  |- controllers/
  |- helpers/
  |- models/
views/
  |- partials/ 
```

Here's a rundown of what each one of these are, and what their job is:
### app.js
This is the starting point of the app. It will create the server, attach the middleware, require the controllers, etc.
It should not contain any functionality other than creating the server and tying the parts of the program together.
### color/
Contains colour pallet information for if I decide to redesign the website with a more consistent colour-scheme. It's not a part of making the app run. Don't worry too much about it.

### controllers/
This is where all the routes are defined for handling http requests. It contains a file for each group of related routes (`urls` and `users`). 
Controllers should never directly access the database. Functionality for checking cookie data, handling different types of http requests and interacts with models should be in this directory.

The `index.js` file in this directory loads all the controllers, so the app only has to load this one file.

### database/
This contains the 'database' files. Since databases in this project are currently just objects stored in memory, this directory holds template/example objects that get used in the app.

### helpers/
This holds all the functions with functionality that does belong in `controllers/` or `models/`. 
Each file in here should be it's own function/task.

### models/
These are the files that interact with the databases. Each file in this directory should be responsible for each database. It will have all the functionality for creating, updating, deleting, and retrieving data in the databases.
These files should be completely independent, and not rely on or reference any other part of the program (including other files in this directory), except for the database files. They should not handle, or have access to the `request` or `response` objects.

### public/
This is where all static files that should be severed to the user lives. This includes static html files, css files, public javascript files, etc.
_There is currently no files in this directory, but it is here in case I get around to redesigning the site_

### test/
This contains all the automated tests (mocha). It has a sub-directory for each part of the program that can be tested, and in those sub-directories, it has a test file corresponding to the file that it is testing. 
_There is only a couple of tests at the moment._

### views/
This is where the front-end template files belong. This project uses [ejs](https://www.npmjs.com/package/ejs), so the `.ejs` files will be in here.
##### `views/partials/`
This is where the templates that should not be used by themselves (only included in other `.ejs` files) go.
These files should start with an underscore- for example: `_header.ejs`

Testing
=
As mentioned, testing is done via [mocha](https://www.npmjs.com/package/mocha) and  [chai](https://www.npmjs.com/package/chai). This makes testing really easy. 
To run the automated tests, simply run `npm test`, which will run every test file in `/test`
Tests should _always_ pass before a commit is made.

Lighthouse Labs
=
This project was made as part of the [Lighthouse Labs Full-Stack bootcamp](https://www.lighthouselabs.ca/web-bootcamp), located in Vancouver, BC. 

Disclaimers
=
**This project does not use real databases.**
Instead, it runs off objects in memory.
This means that any changes made while the app is running will be completely wiped every time the server restarts. 

**There is currently no support for https out of the box.**
While it encrypts cookies and passwords on the server side, the data is still being sent from the client in plaintext. 
Do not use any real user information on the site unless you first implement https.

In short, don't run this in a production environment. It should be used as a reference and learning resource only.




