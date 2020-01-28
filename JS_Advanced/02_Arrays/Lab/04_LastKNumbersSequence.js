function main(n, k) {
  let result = [];
  result.push(1);

  for(let i = 1; i < n; i++){
    let sum = 0;
    let length = i - k;
    if(length < 0) {
      length = 0;
    }
    for(let j = i - 1; j >= length; j--){
      sum += result[j];
    }

    result.push(sum);
  }

  console.log(result.join(" "));
}