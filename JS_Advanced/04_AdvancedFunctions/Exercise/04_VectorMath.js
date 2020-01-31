let result = (function () {
  function add(arr1, arr2) {
    let resultArr = [];
    resultArr.push(arr1[0] + arr2[0]);
    resultArr.push(arr1[1] + arr2[1]);
    return resultArr;
  }

  function multiply(arr, multiplier) {
    let resultArr = [];
    resultArr.push(arr[0] * multiplier);
    resultArr.push(arr[1] * multiplier);
    return resultArr;
  }

  function length(arr) {
    let a = Math.abs(arr[0]);
    let b = Math.abs(arr[1]);
    return Math.sqrt(a * a + b * b);
  }

  function dot(arr1, arr2) {
    return (arr1[0] * arr1[0] + arr1[1] * arr2[1]);
  }

  function cross(arr1, arr2) {
    return (arr1[0] * arr2[1] - arr2[0] * arr1[1]);
  }

  return {
    add: add,
    multiply: multiply,
    length: length,
    dot: dot,
    cross: cross
  }
})();

//var answer = result.add([1, 1], [1, 0]);
//var answer = result.multiply([3.5, -2], 2);
//var answer = result.dot([2, 3], [2, -1]);