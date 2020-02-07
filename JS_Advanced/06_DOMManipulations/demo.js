// demo 1:
// function doSmt(callback) {
//   if(true && typeof(callback) === 'function') {
//     callback();
//   }
// }

// function printHelloWorld() {
//   console.log('Hello, World!');
// }

// doSmt(printHelloWorld);

// [1, 2, 3, 4].forEach(console.log);



// demo 2:
// function test() {
//   console.log('Hello from test!');
//   setTimeout(console.log, 0, 'Hello from Event!', 'Second message');
//   console.log('This is after event!');
// }

// test();



// demo 3:
function foo() {
  setTimeout(console.log, 0, 'Event foo');
  console.log('from foo');
}

function bar() {
  foo();
  console.log('from bar');
  //foo();
}

bar();
bar();