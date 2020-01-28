function main(args){
  let obj = {};
  for (let i = 0; i < args.length; i++) {
    let data = args[i].split(" <-> ");
    let town = data[0];
    let population = Number(data[1]);

    if(obj[town] == undefined){
      obj[town] = population;
    }
    else{
      obj[town] += population;
    }
  }

  for (const key in obj) {
    console.log(`${key} : ${obj[key]}`);
  }
}