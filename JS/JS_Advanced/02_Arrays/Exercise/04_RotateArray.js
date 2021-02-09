function main(arr){
  let rotations = arr.pop();

  if(rotations >= 1000){
    rotations %= 1000;
  }

  for(let i = 0; i < rotations; i++){
    let num = arr.pop();
    arr.unshift(num);
  }

  console.log(arr.join(" "));
}

main(['1', 
'2', 
'3', 
'4', 
'2']
)

main(['Banana', 
'Orange', 
'Coconut', 
'Apple', 
'15']
);