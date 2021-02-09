function main(args){
  
  let mySet = new Set();
  const regex = /\w+/gm;
  for (let i = 0; i < args.length; i++) {
    let line = args[i];

    let m;
    while ((m = regex.exec(line)) !== null) {        
       mySet.add(m[0].toLowerCase());
    }

  }

  console.log(Array.from(mySet).join(", "));

}