function main(args) {
  let obj = [];
  for (let i = 0; i < args.length; i++) {
    let data = args[i].split(" | ");
    let brand = data[0];
    let model = data[1];
    let quantity = Number(data[2]);

    if(!obj.hasOwnProperty(brand)) {
      obj[brand] = [];
    }

    if(!obj[brand].hasOwnProperty(model)) {
      obj[brand][model] = quantity;
    }
    else{
      obj[brand][model] += quantity;
    }
  }

  for (const key in obj) {
    console.log(key);
    for (const key2 in obj[key]) {
      console.log(`###${key2} -> ${obj[key][key2]}`);
    }
  }
}

main(['Audi | Q7 | 1000',
'Audi | Q6 | 100',
'BMW | X5 | 1000',
'BMW | X6 | 100',
'Citroen | C4 | 123',
'Volga | GAZ-24 | 1000000',
'Lada | Niva | 1000000',
'Lada | Jigula | 1000000',
'Citroen | C4 | 22',
'Citroen | C5 | 10']
);