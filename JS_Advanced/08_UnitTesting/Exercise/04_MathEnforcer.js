let assert = require('chai').assert;

let mathEnforcer = {
  addFive: function (num) {
      if (typeof(num) !== 'number') {
          return undefined;
      }
      return num + 5;
  },
  subtractTen: function (num) {
      if (typeof(num) !== 'number') {
          return undefined;
      }
      return num - 10;
  },
  sum: function (num1, num2) {
      if (typeof(num1) !== 'number' || typeof(num2) !== 'number') {
          return undefined;
      }
      return num1 + num2;
  }
};

describe('test mathEnforcer', function() {
  it('test addFive returns undefined', function() {
    let actual = mathEnforcer.addFive('kalina');
    assert.isUndefined(actual);

    let actualTwo = mathEnforcer.addFive({name: 'kalina'});
    assert.isUndefined(actualTwo);
  });

  it('test subtractTen returns undefined', function() {
    let actual = mathEnforcer.subtractTen('kalina');
    assert.isUndefined(actual);
  });

  it('test sum returns undefined', function() {
    let actualOne = mathEnforcer.sum('kalina', 1);
    assert.isUndefined(actualOne);

    let actualTwo = mathEnforcer.sum(1, '1');
    assert.isUndefined(actualTwo);
  });

  it('subtractTen works properly', function() {
    let actualOne = mathEnforcer.subtractTen(0);
    assert.equal(actualOne, -10);

    let actualTwo = mathEnforcer.subtractTen(10);
    assert.equal(actualTwo, 0);

    let actualThree = mathEnforcer.subtractTen(-10);
    assert.equal(actualThree, -20);

    let actualFour = mathEnforcer.subtractTen(10.5);
    assert.equal(actualFour, 0.5);

    let actualFive = mathEnforcer.subtractTen(-10.5);
    assert.equal(actualFive, -20.5);
  });

  it('addFive works properly', function() {
    let actualOne = mathEnforcer.addFive(1);
    assert.equal(actualOne, 6);

    let actualTwo = mathEnforcer.addFive(-4);
    assert.equal(actualTwo, 1);

    let actualThree = mathEnforcer.addFive(-4.5);
    assert.equal(actualThree, 0.5);

    let actualFour = mathEnforcer.addFive(4.5);
    assert.equal(actualFour, 9.5);
  });

  it('sum works properly', function() {
    let actualOne = mathEnforcer.sum(1, 1);
    assert.equal(actualOne, 2);

    let actualTwo = mathEnforcer.sum(-4, 1);
    assert.equal(actualTwo, -3);

    let actualThree = mathEnforcer.sum(4, -1);
    assert.equal(actualThree, 3);

    let actualFour = mathEnforcer.sum(4.1, 1);
    assert.equal(actualFour, 5.1);

    let actualFive = mathEnforcer.sum(4, 1.1);
    assert.equal(actualFive, 5.1);
  });
});