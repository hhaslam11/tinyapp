const assert = require('chai').assert;

const generateUID = require('../../helpers/generateUID');

describe('generateUID()', () => {
  it('should generate string with the length of 5 when passed in 5', () => {
    assert.isTrue(generateUID(5).length === 5);
  });
  it('should return undefined when not passed any value', () => {
    assert.isUndefined(generateUID());
  });
  it('should return undefined when passed a negative value', () => {
    assert.isUndefined(generateUID(-5));
  });
  it('should return undefined when passed a value that isnt a number', () => {
    assert.isUndefined(generateUID('five'));
  });
  it('should return undefined when passed a float', () => {
    assert.isUndefined(generateUID(5.5));
  });
  it('should return undefined when passed 0', () => {
    assert.isUndefined(generateUID(0));
  });
});