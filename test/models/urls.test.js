const assert = require('chai').assert;
const get = require('../../models/urls').get;

describe('models/urls.get()', () => {
  it('should return the entire urls database when not passed any arguments', () => {
    assert.deepEqual(get(), {
      b6UTxQ: {
        longURL: "https://www.tsn.ca",
        userID: "aJ48lW",
        timesClicked: 0,
        clientIds: [],
        visitLog: [
          {
            clientID: 'abc',
            date: 'June 10th 2017'
          }
        ]
      },
      i3BoGr: {
        longURL: "https://www.google.ca",
        userID: "aJ48lW",
        timesClicked: 0,
        clientIds: [],
        visitLog: [
          {
            clientID: 'abc',
            date: 'June 10th 2017'
          }
        ]
      }
    });
  });
  it('should return single url object when passed a valid key', () => {
    assert.deepEqual(get('i3BoGr'), {
      longURL: "https://www.google.ca",
      userID: "aJ48lW",
      timesClicked: 0,
      clientIds: [],
      visitLog: [
        {
          clientID: 'abc',
          date: 'June 10th 2017'
        }
      ]
    });
  });
  it('should return undefined when passed a key that doesnt exist', () => {
    assert.isUndefined(get('randomkey'));
  });
});