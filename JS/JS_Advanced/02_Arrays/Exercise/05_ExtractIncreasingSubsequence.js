function main(arr){
  let currentBiggest = arr[0];
  for(let i = 0; i < arr.length; i++){
    if(arr[i] >= currentBiggest){
      currentBiggest = arr[i];
      console.log(arr[i]);
    }
  }
}

main([1, 
  3, 
  8, 
  4, 
  10, 
  12, 
  3, 
  2, 
  24]
  );