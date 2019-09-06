const urls = require('../database/urls');

/**
 * Creates a new url in the url database
 * @param {string} shortURL the key of the new url
 * @param {string} longURL full url path
 * @param {string} userID (optional) userID of the user who registered the url
 */
const create = (shortURL, longURL, userID) => {
  urls[shortURL] = {
    longURL: longURL,
    userID: userID,
    timesClicked: 0,
    clientIds: [],
    visitLog: []
  };
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

/**
 * @param {string} id userID that you want to get the urls for
 * @returns array of urlKeys that the user has access to.
 */
const urlsForUser = id => {
  const returnArr = [];
  for (const key in urls) {
    if (urls[key].userID === id) returnArr.push(key);
  }
  return returnArr;
};

/**
 * increments the timesClicked value on a specific url
 * @param {string} id shortURL that is being clicked
 */
const addClick = id => {
  if (urls[id]) {
    urls[id].timesClicked++;
  }
};

/**
 * @param {string} id the requested shortURL
 * @returns the amount of clicks the link has recieved
 * @returns undefined if invalid id is passed in
 */
const getClicks = id => {
  if (urls[id]) {
    return urls[id].timesClicked;
  } else {
    return undefined;
  }
};

/**
 * @param {string} id the id of the url that you want to get clientArray from
 * @returns the clientId array
 */
const getClientArray = id => {
  if (urls[id]) {
    return urls[id].clientIds;
  } else {
    return undefined;
  }
};

/**
 * Adds a new clientID to the array for a given urlID
 * @param {string} urlID array to push to
 * @param {string} clientID value to push to the array
 */
const addClientId = (urlID, clientID) => {
  if (urls[urlID]) {
    urls[urlID].clientIds.push(clientID);
  }
};

/**
 * @param {string} id
 * @returns the amount of unique visiters for a given url (based off the clientIds array)
 */
const getUniqueVisiters = id => {
  if (urls[id]) {
    return urls[id].clientIds.length;
  } else {
    return undefined;
  }
};

/**
 * @param {string} id the id of the url that you want to get visitLog from
 * @returns the visitLog array
 */
const getVisitLog = id => {
  if (urls[id]) {
    return urls[id].visitLog;
  } else {
    return undefined;
  }
};

/**
 * Adds a new visitLog to the array for a given urlID
 * @param {string} urlID array to push to
 * @param {string} clientID value to push to the array
 */
const addVisitLog = (urlID, clientID) => {
  if (urls[urlID]) {
    urls[urlID].visitLog.push({
      clientID: clientID,
      date: Date()
    });
  }
};


module.exports = { create, edit, remove, get, urlsForUser, addClick, getClicks, getClientArray, addClientId, getUniqueVisiters, addVisitLog, getVisitLog };