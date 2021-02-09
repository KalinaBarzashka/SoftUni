function getFibonator() {
  let counter = 0;
  function fib(n) {
    if(n <= 1) {
      return 1;
    }
  
    return fib(n - 2) + fib(n - 1);
  }

  return function () {
    let result = fib(counter);
    counter++;
    return result;
  }
}