function solution() {
  let str = "";

  function append(data) {
    str += data;
  }

  function removeStart(n) {
    str = str.substring(n);
  }

  function removeEnd(n) {
    str = str.substring(0, str.length - n);
  }

  function print() {
    console.log(str);
  }

  return {
    append: append,
    removeStart: removeStart,
    removeEnd: removeEnd,
    print: print
  };
}

let firstZeroTest = solution();

firstZeroTest.append('hello');
firstZeroTest.append('again');
firstZeroTest.removeStart(3);
firstZeroTest.removeEnd(4);
firstZeroTest.print();
