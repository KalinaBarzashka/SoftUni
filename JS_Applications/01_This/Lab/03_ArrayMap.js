function arrayMap(array, func) {
  let newArray = [];
  console.log(array.func);
  newArray = array.reduce.call(array, func);
  return newArray;
}

//let nums = [1,2,3,4,5];
//console.log(arrayMap(nums,(item)=> item * 2)); // [ 2, 4, 6, 8, 10 ]

let arr = [1,2,3,4];
let funct = (x)=>x*2;
let actual = arrayMap(arr,funct);
console.log(actual);
//[2,4,6,8]