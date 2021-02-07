let assert = require('chai').assert;
function lookupChar(string, index) {
  if (typeof(string) !== 'string' || !Number.isInteger(index)) {
      return undefined;
  }
  if (string.length <= index || index < 0) {
      return "Incorrect index";
  }

  return string.charAt(index);
}

describe('test lookupChar', function() {
  it('invalid input', function() {
    let actualOne = lookupChar(14, 1);
    assert.isUndefined(actualOne);

    let actualTwo = lookupChar('kalina', '14');
    assert.isUndefined(actualTwo);

    let actualThree = lookupChar('kalina', 14.5);
    assert.isUndefined(actualThree);
  });

  it('Incorrect index', function() {
    let expected = 'Incorrect index';
    assert.equal(lookupChar('kalina', -14), expected);
    assert.equal(lookupChar('kalina', 6), expected);
  });

  it('', function() {
    assert.equal(lookupChar('kalina', 0), 'k');
    assert.equal(lookupChar('kalina', 5), 'a');
  });
});