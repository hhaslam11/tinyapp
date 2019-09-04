const assert = require('chai').assert;
const get = require('../../models/users').get;

describe('models/users.get()', () => {
  it('should return the entire users database when not passed any arguments', () => {
    assert.deepEqual(get(), {
      "userRandomID": {
        id: "userRandomID",
        email: "user@example.com",
        password: "purple-monkey-dinosaur"
      },
      "user2RandomID": {
        id: "user2RandomID",
        email: "user2@example.com",
        password: "dishwasher-funk"
      }
    });
  });
  it('should return single user object when passed a valid key', () => {
    assert.deepEqual(get('userRandomID'), {
      id: "userRandomID",
      email: "user@example.com",
      password: "purple-monkey-dinosaur"
    });
  });
  it('should return undefined when passed a key that doesnt exist', () => {
    assert.isUndefined(get('randomkey'));
  });
});