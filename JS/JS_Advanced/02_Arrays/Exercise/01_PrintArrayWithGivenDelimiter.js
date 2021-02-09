function main(arr){
  let delimiter = arr.pop();
  console.log(arr.join(delimiter));
}

main(['One', 
'Two', 
'Three', 
'Four', 
'Five', 
'-']
);