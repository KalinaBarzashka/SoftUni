function main(args){
  let obj = {};
  for (let i = 0; i < args.length; i += 2) {
    let town = args[i];
    let income = Number(args[i + 1]);

    if(obj[town] == undefined){
      obj[town] = income;
    }
    else{
      obj[town] += income;
    }
  }

  console.log(JSON.stringify(obj));
}