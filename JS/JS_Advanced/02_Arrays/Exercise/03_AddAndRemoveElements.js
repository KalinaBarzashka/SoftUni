function main(arr){
  let num = 1;
  let array = [];

  for(let i = 0; i < arr.length; i++){
    if(arr[i] == "add"){
      array.push(num);
    }
    else if(arr[i] == "remove"){
      array.pop();
    }

    num++;
  }

  if(array.length == 0){
    console.log("Empty");
  }
  else{
    console.log(array.join("\n"));
  }
}

main(['add', 
'add', 
'add', 
'add']
);