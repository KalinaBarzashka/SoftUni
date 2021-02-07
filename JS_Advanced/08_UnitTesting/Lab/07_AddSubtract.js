let assert = require('chai').assert;

function createCalculator() {
  let value = 0;
  return {
      add: function(num) { value += Number(num); },
      subtract: function(num) { value -= Number(num); },
      get: function() { return value; }
  }
}

describe("createCalculator", function() {
 
  it("check object", function(){
    let calculator = createCalculator();
    assert.isObject(calculator);
  });
 
  it("check properties", function() {
    let calculator = createCalculator();
    assert.property(calculator, "add");
    assert.property(calculator, "subtract");
    assert.property(calculator, "get");
  });
 
  it("check internal sum", function() {
    let calculator = createCalculator();
    let expect = 0;
    let actual = calculator.get();
    assert.equal(actual, expect);
  });
 
  it("check internal sum, not modifiable", function() {
    let calculator = createCalculator();
    calculator.value = 5;
    let expect = 0;
    let actual = calculator.get();
    assert.equal(actual, expect);
  });
 
  // Test Methods
  it("add should work with number and string", function() {
    let calculator = createCalculator();
    calculator.add(5);
    let actual = calculator.get();
    let expect = 5;
 
    assert.equal(actual, expect);
 
    calculator.add("5");
    actual = calculator.get();
    expect = 10;
    assert.equal(actual, expect);
  })
 
  it("subtract should work with number and string", function(){
    let calculator = createCalculator();
    calculator.subtract(5);
    let actual = calculator.get();
    let expect = -5;
 
    assert.equal(actual, expect);
 
    calculator.subtract("-5");
    actual = calculator.get();
    expect = 0;
    assert.equal(actual, expect);
  });
 
});