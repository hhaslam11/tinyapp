const urls = require('../database/urls');

/**
 * Creates a new url in the url database
 * @param {string} shortURL the key of the new url
 * @param {string} longURL full url path
 * @param {string} userID (optional) userID of the user who registered the url
 */
const create = (shortURL, longURL, userID) => {
  urls[shortURL].longURL = longURL;
  urls[shortURL].userID = userID;
};

/**
 * Updates an existing URL.
 * User authentication is left up to the caller
 * @param {string} shortURL the urlID to edit
 * @param {string} longURL the new url value
 */
const edit = (shortURL, longURL) => {
  urls[shortURL].longURL = longURL;
};

/**
 * Deletes a url from the database.
 * Authentication is left up to the caller
 * @param {string} shortURL urlID to delete
 */
const remove = (shortURL) => {
  delete urls[shortURL];
};

/**
 * @param {string} shortURL OPTIONAL
 * @returns the entire url database if no id is specified
 * @returns single url object if id is specified and found
 * @returns undefined if id is specified but no url with that id is found
 */
const get = key => {
  if (key) {
    if (urls[key]) {
      return urls[key];
    } else {
      return undefined;
    }
  }
  return urls;
};

module.exports = { create, edit, remove, get };