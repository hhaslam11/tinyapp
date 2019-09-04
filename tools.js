/**
 * Generate a unique ID
 * @param {number} length the length of the string you want
 * @returns a random ID using chars a-z and 0-9
 */
const generateUID = length => {
  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let returnString = '';

  for (let i = 0; i < length; i++) {
    returnString += chars[Math.floor(Math.random() * chars.length)];
  }
  return returnString;
};

/**
 * returns searches users by email
 * @param {string} email email to search by
 * @param {object} users database to search
 * @returns a user object if user is found
 * @returns false if no user is found
 */
const searchByEmail = (email, object) => {
  for (let key in object) {
    if (object[key].email === email) {
      return object[key];
    }
  }
  return false;
};

module.exports = { generateUID, searchByEmail };