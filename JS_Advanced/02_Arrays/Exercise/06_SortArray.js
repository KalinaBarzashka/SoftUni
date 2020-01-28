function main(arr){
  arr.sort(
    function (a, b){
      if(a.length > b.length){
        return 1;
      }
      else if(a.length < b.length){
        return -1;
      }
      else{
        return a.localeCompare(b);
      }
    }
  );
  
  console.log(arr.join("\n"));
}

main(['Isacc', 
'Theodor', 
'Jack', 
'Harrison', 
'George']
);

main(['test', 
'Deny', 
'omen', 
'Default']
);