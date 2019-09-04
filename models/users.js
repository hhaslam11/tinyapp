const users = require('../database/users');

/**
 * returns searches users by email
 * @param {string} email email to search by
 * @returns a user object if user is found
 * @returns false if no user is found
 */
const searchByEmail = (email) => {
  for (let key in users) {
    if (users[key].email === email) {
      return users[key];
    }
  }
  return false;
};

/**
 * register a new user
 * @param {string} userID the id of the object to add to the database
 * @param {string} email
 * @param {string} password
 * @returns true if sucessfully registered user
 * @returns false if failed to register user (user already exists)
 */
const register = (userID, email, password) => {
  if (users[userID]) return false;
  users[userID] = {
    id: userID,
    email: email,
    password: password
  };
  return true;
};

/**
 * Authenticates a user
 * @param {string} email
 * @param {string} password
 * @returns true if email and password is found and correct
 * @returns false if email is not found or password doesnt match
 */
const authenticate = (email, password) => {
  if (!email || !password) return false;
  
  const tempUser = searchByEmail(email);
  if (tempUser) {
    return tempUser.password === password;
  }

  return false;
};

/**
 * @param {string} key
 * @returns entire user database if no parameter is passed
 * @returns single user if parameter is passed and user is found
 * @returns undefined is parameter is passed and user is not found
 */
const get = key => {
  if (key) {
    if (users[key]) {
      return users[key];
    } else {
      return undefined;
    }
  }
  return users;
};

module.exports = { register, authenticate, get, searchByEmail};