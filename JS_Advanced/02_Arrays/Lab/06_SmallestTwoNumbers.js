function main(arr){
  let first = Number.MAX_VALUE;
  let second = Number.MAX_VALUE;

  for(let i = 0; i < arr.length; i++){
    if(arr[i] < first)
    {
      second = first;
      first = Number(arr[i]);
    }
    else if(arr[i] < second)
    {
      second = arr[i];
    }
  }

  if(second == Number.MAX_VALUE){
    console.log(first);
  }
  else{
    console.log(first + " " + second);
  }
}

main([30, 15, 50, 5]); //5 15
main([3, 0, 10, 4, 7, 3]); //0 3
main([3]); //3 0