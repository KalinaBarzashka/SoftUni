function main(args){
  let objHeroes = [];

  for (let i = 0; i < args.length; i++) {
    let splitedInputArr = args[i].split(" / ");
    let heroName = splitedInputArr[0];
    let level = Number(splitedInputArr[1]);
    
    
    let items = [];
    if(splitedInputArr.length > 2){
      let itemsArr = splitedInputArr[2].split(", ");

      for (let j = 0; j < itemsArr.length; j++) {
        const element = itemsArr[j];
        items.push(element);
      }
    }
    
    let hero = {
      name: heroName,
      level: level,
      items: items
    };

    objHeroes.push(hero);
  }
  
  console.log(JSON.stringify(objHeroes));
}

main(['Isacc / 25 / Apple, GravityGun',
'Derek / 12 / BarrelVest, DestructionSword',
'Hes / 1 / Desolator, Sentinel, Antara']
);