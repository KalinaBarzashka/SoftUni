function main(args){
  let obj = {};

  for (let i = 0; i < args.length; i++) {
    let data = args[i].split(" -> ");
    let town = data[0];
    let product = data[1];
    let incomeArr = data[2].split(" : ");
    let income = incomeArr[0] * incomeArr[1];
    
    if(obj[town] == undefined){
      obj[town] = [];
      obj[town].push(
        {
          product: product,
          income: income
        }
      );

    } else {
      obj[town].push(
        {
          product: product,
          income: income
        }
      );
    }

  }

  for (const key in obj) {
    console.log(`Town - ${key}`);
    
    for (let i = 0; i < obj[key].length; i++) {
      let currentObj = obj[key][i];
      console.log(`$$$${currentObj.product} : ${currentObj.income}`);
    }

  }

}