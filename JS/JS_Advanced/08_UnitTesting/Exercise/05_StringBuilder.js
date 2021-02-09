let assert = require('chai').assert;

class StringBuilder {
  constructor(string) {
    if (string !== undefined) {
      StringBuilder._vrfyParam(string);
      this._stringArray = Array.from(string);
    } else {
      this._stringArray = [];
    }
  }

  append(string) {
    StringBuilder._vrfyParam(string);
    for(let i = 0; i < string.length; i++) {
      this._stringArray.push(string[i]);
    }
  }

  prepend(string) {
    StringBuilder._vrfyParam(string);
    for(let i = string.length - 1; i >= 0; i--) {
      this._stringArray.unshift(string[i]);
    }
  }

  insertAt(string, startIndex) {
    StringBuilder._vrfyParam(string);
    this._stringArray.splice(startIndex, 0, ...string);
  }

  remove(startIndex, length) {
    this._stringArray.splice(startIndex, length);
  }

  static _vrfyParam(param) {
    if (typeof param !== 'string') throw new TypeError('Argument must be string');
  }

  toString() {
    return this._stringArray.join('');
  }
}

describe('test class StringBuilder', function() {
  it('test constructor', function() {
    let sb = new StringBuilder();
    assert.isArray(sb._stringArray);
    assert.equal(sb._stringArray.length, 0);

    let sb1 = new StringBuilder('kali');
    assert.isArray(sb._stringArray);
    let arr = ['k', 'a', 'l', 'i'];
    assert.deepEqual(sb1._stringArray, arr);
 
    assert.throws(function() {
      new StringBuilder(14);
    }, "Argument must be string");
  });

  it('test append', function() {
    let sb = new StringBuilder('k');
    sb.append('a');
    assert.deepEqual(sb._stringArray, ['k', 'a']);

    
    assert.throws(function() {
      let sb1 = new StringBuilder('k');
      sb1.append(14);
    }, "Argument must be string");
  });

  it('test prepend', function() {
    let sb = new StringBuilder('k');
    sb.prepend('a');
    assert.deepEqual(sb._stringArray, ['a', 'k']);

    
    assert.throws(function() {
      let sb1 = new StringBuilder('k');
      sb1.prepend(14);
    }, "Argument must be string");
  });

  it('test insertAt', function() {
    assert.throws(function() {
      let sb = new StringBuilder('k');
      sb.insertAt(14, 0);
    }, "Argument must be string");

    let sb1 = new StringBuilder('ka');
    sb1.insertAt('li', 2);
    assert.deepEqual(sb1._stringArray, ['k', 'a', 'l', 'i']);
  });

  it('test remove', function() {
    let sb = new StringBuilder('kalina');
    sb.remove(4, 2);
    assert.deepEqual(sb._stringArray, ['k', 'a', 'l', 'i']);
  });

  it('test toString', function() {
    let sb = new StringBuilder('kalina');
    let actual = sb.toString();
    assert.equal(actual, 'kalina');
  });

  it('last test judge', function() {
    assert.throws(function() {
      let str = new StringBuilder('hello');
      str._vrfyParam('kali');
    }, "str._vrfyParam is not a function");
  });
});