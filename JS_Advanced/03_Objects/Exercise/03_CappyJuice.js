function main(args){
  let resultDict = [];
  let tempDict = [];

  for (let i = 0; i < args.length; i++) {
    let splitedInput = args[i].split(" => ");
    let juiceName = splitedInput[0];
    let quantity = Number(splitedInput[1]);

    if(!tempDict.hasOwnProperty(juiceName)){
      tempDict[juiceName] = quantity;
    }
    else{
      tempDict[juiceName] += quantity;
    }

    if(tempDict[juiceName] >= 1000){
      let bottle = Math.floor(tempDict[juiceName] / 1000);
      let remainder = tempDict[juiceName] % 1000;

      if(!resultDict.hasOwnProperty(juiceName)){
        resultDict[juiceName] = bottle;
      }
      else{
        resultDict[juiceName] += bottle;
      }

      tempDict[juiceName] = remainder;
    }
  }

  for (const key in resultDict) {
    console.log(`${key} => ${resultDict[key]}`);
  }
}

main(['Kiwi => 234',
'Pear => 2345',
'Watermelon => 3456',
'Kiwi => 4567',
'Pear => 5678',
'Watermelon => 6789']
);

//Kiwi - 4801
//Pear - 8023
//Watermelon - 10245