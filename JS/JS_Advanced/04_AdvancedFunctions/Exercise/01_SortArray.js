function result(inputArray, sortingMethod) {
  if(sortingMethod == 'asc') {
    inputArray.sort(function (a,b) {
      if(a > b) {
        return 1;
      }
      else{
        return -1;
      }
    });
  }
  else if(sortingMethod == 'desc') {
    inputArray.sort(function (a,b) {
      if(a > b) {
        return -1;
      }
      else{
        return 1;
      }
    });
  }

  return inputArray;
}

var inputArray = [3, 1, 2, 10];
var sortingMethod = 'asc';
var sortedArray = result(inputArray, sortingMethod);