let assert = require('chai').assert;

function rgbToHexColor(red, green, blue) {
  if (!Number.isInteger(red) || (red < 0) || (red > 255))
      return undefined; // Red value is invalid
  if (!Number.isInteger(green) || (green < 0) || (green > 255))
      return undefined; // Green value is invalid
  if (!Number.isInteger(blue) || (blue < 0) || (blue > 255))
      return undefined; // Blue value is invalid
  return "#" +
      ("0" + red.toString(16).toUpperCase()).slice(-2) +
      ("0" + green.toString(16).toUpperCase()).slice(-2) +
      ("0" + blue.toString(16).toUpperCase()).slice(-2);
}

describe('Test function rgbToHexColor', function() {
  it('test with invalid input', function() {
      assert.isUndefined(rgbToHexColor("kali", 2, 3));
      assert.isUndefined(rgbToHexColor(1, "pesho", 3));
      assert.isUndefined(rgbToHexColor(1, 2, "blue"));
      assert.isUndefined(rgbToHexColor(1.2, 2, 5));
  });

  it('test with out of range numbers', function() {
    assert.isUndefined(rgbToHexColor(300, 2, 3));
    assert.isUndefined(rgbToHexColor(-300, 2, 3));
    assert.isUndefined(rgbToHexColor(1, -2, 3));
    assert.isUndefined(rgbToHexColor(1, 400, 3));
    assert.isUndefined(rgbToHexColor(1, 2, -3));
    assert.isUndefined(rgbToHexColor(1, 2, 300));
  });

  it('should work properly', function() {
      assert.equal(rgbToHexColor(0, 0, 0), '#000000');
      assert.equal(rgbToHexColor(255, 255, 255), '#FFFFFF');
  });
});