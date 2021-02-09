function main(n1, n2, n3)
{
  let max;
  if(n1 > n2 && n1 > n3)
  {
    max = n1;
  }
  else if(n2 > n1 && n2 > n3)
  {
    max = n2;
  }
  else if(n3 > n1 && n3 > n2)
  {
    max = n3;
  }
  console.log(`The largest number is ${max}.`);
}

function main1(n1, n2, n3) {

  let arr = [n1, n2, n3];
  arr.sort(function(a, b){
    if (a > b) { return -1; }
    else if (a < b) { return 1; }
  });
  console.log(`The largest number is ${arr[0]}.`);
}

function main3(n1, n2, n3) {

  let arr = [n1, n2, n3];
  arr.sort(function(a, b){
    return b - a;
  });
  console.log(`The largest number is ${arr[0]}.`);
}