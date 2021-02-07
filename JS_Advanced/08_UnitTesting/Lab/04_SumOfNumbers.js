const assert = require("chai").assert;

function sum(arr) {
  let sum = 0;
  for (num of arr)
      sum += Number(num);
  return sum;
}

describe('Function Sum', function() {
  it('should work properly with proper data', function() {
    let data = sum([1, 2, 3]);
    let expect = 6;
    assert.equal(data, expect);
  });

  it('should return NaN with incorrect data', function() {
    let data = sum([1, 2, 'kalina']);
    assert.isNaN(data);
  });
});