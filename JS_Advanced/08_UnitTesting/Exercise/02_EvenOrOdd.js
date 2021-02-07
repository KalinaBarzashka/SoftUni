let assert = require('chai').assert;

function isOddOrEven(string) {
  if (typeof(string) !== 'string') {
      return undefined;
  }
  if (string.length % 2 === 0) {
      return "even";
  }

  return "odd";
}

describe('test isOddOrEven', function() {
  it('invalid input', function() {
    assert.isUndefined(isOddOrEven(1));
  });

  it('return even', function() {
    let expected = 'even';
    let actual = isOddOrEven('kali');
    assert.equal(actual, expected);
  });

  it('return odd', function() {
    let expected = 'odd';
    let actual = isOddOrEven('kalin');
    assert.equal(actual, expected);
  });
});