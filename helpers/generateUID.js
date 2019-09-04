/**
 * Generate a unique ID
 * @param {number} length the length of the string you want
 * @returns a random ID using chars a-z and 0-9
 * @returns undefined if passed an invalid value
 */
module.exports = length => {

  //validate input
  if (!length) return undefined;
  if (!Number.isInteger(length)) return undefined;
  if (length <= 0) return undefined;

  const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
  let returnString = '';

  for (let i = 0; i < length; i++) {
    returnString += chars[Math.floor(Math.random() * chars.length)];
  }
  return returnString;
};