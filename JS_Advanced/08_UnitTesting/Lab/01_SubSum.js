function main(arr, startIndex, endIndex) {
  if(!Array.isArray(arr)) {
    return NaN;
  }

  if(startIndex < 0) {
    startIndex = 0;
  }

  let lengthArr = arr.length;
  if(endIndex >= lengthArr) {
    endIndex = lengthArr - 1;
  }

  let sum = 0;
  for (let i = startIndex; i <= endIndex; i++) {
    try {
      sum += Number(arr[i]);
    }
    catch {
      return NaN;
    }
  }

  return sum.toFixed(1);
}

//console.log(main([10, 20, 30, 40, 50, 60], 3, 300)); //150
console.log(main([1.1, 2.2, 3.3, 4.4, 5.5], -3, 1)); //3.3
//console.log(main([10, 'twenty', 30, 40], 0, 2)); //NaN
//console.log(main([], 1, 2)); //0
//console.log(main('text', 0, 2)); //NaN