function main(arr){
  let newArray = [];

  for(let i = 1; i < arr.length; i += 2){
    newArray.unshift(arr[i] * 2);
  }

  console.log(newArray.join(" "));
}

main([10, 15, 20, 25]); //50, 30
main([3, 0, 10, 4, 7, 3]); //9, 16, 0
main([10, 15, 20]); //30