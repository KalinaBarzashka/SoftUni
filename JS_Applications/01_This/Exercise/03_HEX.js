class Hex {
  constructor(number) {
    this.value = Number(number);
  }

  valueOf() {
    return this.value;
  }

  toString() {
    return "0x" + (this.value.toString(16).toLocaleUpperCase());
  }

  plus(mainObj) {
    let newObj = new Hex(this.value + mainObj.valueOf());
    return newObj;
  }

  minus(mainObj) {
    let newObj = new Hex(this.value - mainObj.valueOf());
    return newObj;
  }

  parse(hexaNum) {
    return parseInt(hexaNum, 10);
  }
}