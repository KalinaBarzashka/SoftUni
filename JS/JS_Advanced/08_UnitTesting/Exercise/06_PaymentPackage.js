let assert = require('chai').assert;

class PaymentPackage {
  constructor(name, value) {
    this.name = name;
    this.value = value;
    this.VAT = 20;      // Default value    
    this.active = true; // Default value
  }

  get name() {
    return this._name;
  }

  set name(newValue) {
    if (typeof newValue !== 'string') {
      throw new Error('Name must be a non-empty string');
    }
    if (newValue.length === 0) {
      throw new Error('Name must be a non-empty string');
    }
    this._name = newValue;
  }

  get value() {
    return this._value;
  }

  set value(newValue) {
    if (typeof newValue !== 'number') {
      throw new Error('Value must be a non-negative number');
    }
    if (newValue < 0) {
      throw new Error('Value must be a non-negative number');
    }
    this._value = newValue;
  }

  get VAT() {
    return this._VAT;
  }

  set VAT(newValue) {
    if (typeof newValue !== 'number') {
      throw new Error('VAT must be a non-negative number');
    }
    if (newValue < 0) {
      throw new Error('VAT must be a non-negative number');
    }
    this._VAT = newValue;
  }

  get active() {
    return this._active;
  }

  set active(newValue) {
    if (typeof newValue !== 'boolean') {
      throw new Error('Active status must be a boolean');
    }
    this._active = newValue;
  }

  toString() {
    const output = [
      `Package: ${this.name}` + (this.active === false ? ' (inactive)' : ''),
      `- Value (excl. VAT): ${this.value}`,
      `- Value (VAT ${this.VAT}%): ${this.value * (1 + this.VAT / 100)}`
    ];
    return output.join('\n');
  }
}


describe('test PaymentPackage class', function() {
  // it('test constructor', function() {
  //   let payment = new PaymentPackage('kali', 14);
  //   assert.property(payment, 'name');
  //   assert.property(payment, '_name');
  //   assert.property(payment, 'value');
  //   assert.property(payment, '_value');
  //   assert.property(payment, 'VAT');
  //   assert.property(payment, '_VAT');
  //   assert.property(payment, 'active');
  //   assert.property(payment, '_active');
  // });

  it('test get and set of name', function() {
    assert.throws(function() {
      new PaymentPackage('', 14);
    }, "Name must be a non-empty string");

    assert.throws(function() {
      new PaymentPackage(23, 14);
    }, "Name must be a non-empty string");

    let payment = new PaymentPackage('kali', 14);
    let name = payment.name;
    assert.equal(name, 'kali');

    assert.throws(function() {
      payment.name = 14;
    }, "Name must be a non-empty string");
  });

  it('test get and set of value', function() {
    assert.throws(function() {
      new PaymentPackage('kali', -14);
    }, "Value must be a non-negative number");

    assert.throws(function() {
      new PaymentPackage('kali', '14');
    }, "Value must be a non-negative number");

    let payment = new PaymentPackage('kali', 14);
    let value = payment.value;
    assert.equal(value, 14);

    assert.throws(function() {
      payment.value = -14;
    }, "Value must be a non-negative number");
  });

  it('test get and set of vat', function() {
    let a = new PaymentPackage('kali', 14);
    assert.throws(function() {
      a.VAT = -14;
    }, "VAT must be a non-negative number");

    assert.throws(function() {
      a.VAT = 'Pesho';
    }, "VAT must be a non-negative number");

    let payment = new PaymentPackage('kali', 14);
    let vat = payment.VAT;
    assert.equal(vat, 20);
  });

  it('test get and set of active', function() {
    let a = new PaymentPackage('kali', 14);
    assert.equal(a.active, true);

    assert.throws(function() {
      a.active = -14;
    }, "Active status must be a boolean");

    assert.throws(function() {
      a.active = 'Pesho';
    }, "Active status must be a boolean");

    a.active = false;
    assert.equal(a.active, false);
  });

  it('test toString()', function() {
    let a = new PaymentPackage('kali', 14);
    assert.equal(a.toString(), 'Package: kali\n- Value (excl. VAT): 14\n- Value (VAT 20%): 16.8');

    a.active = false;
    assert.equal(a.toString(), 'Package: kali (inactive)\n- Value (excl. VAT): 14\n- Value (VAT 20%): 16.8');

    a.active = true;
    a.VAT = 1.4;
    assert.equal(a.toString(), 'Package: kali\n- Value (excl. VAT): 14\n- Value (VAT 1.4%): 14.196');
  });

  it('final test', function() {
    let a = new PaymentPackage('kali', 0);
    assert.equal(a.toString(), 'Package: kali\n- Value (excl. VAT): 0\n- Value (VAT 20%): 0');
  });
});