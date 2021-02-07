const assert = require("chai").assert;

function isSymmetric(arr) {
  if (!Array.isArray(arr))
      return false; // Non-arrays are non-symmetric
  let reversed = arr.slice(0).reverse(); // Clone and reverse
  let equal = (JSON.stringify(arr) == JSON.stringify(reversed));
  return equal;
}

describe('isSymmetric function', function() {
  it('function return false', function() {
    let expect = false;
    let data = isSymmetric('[1, 2, 2, 1]');

    assert.equal(data, expect);
  });

  it('return equal from numeric array', function() {
    let expect = true;
    let data = isSymmetric([1, 2, 2, 1]);

    assert.equal(data, expect);
  });

  it('empty array is symmetric', function() {
    assert.isTrue(isSymmetric([]));
  });

  it('is symmetric string array', function() {
    assert.isTrue(isSymmetric(['k', 'a', 'a', 'k']));
  });

  it('return non equal from negative numeric array', function() {
    let expect = false;
    let data = isSymmetric([-1, 14, -14, -1]);

    assert.equal(data, expect);
  });

  it('return equal from negative numeric array', function() {
    let data = isSymmetric([-1, -14, -14, -1]);

    assert.isTrue(data);
  });

  it('isFalse', function() {
    assert.isFalse(isSymmetric(['k', 'r', 'i', 's']));
  });

  it("should return 'false' if input isn't the correct type", function(){
    let input = isSymmetric([1,2,"1"]);
    assert.isFalse(input);
  });
});