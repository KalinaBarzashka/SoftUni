function main(args) {

  let catalogue = [];
  for (let i = 0; i < args.length; ++i) {
    let inputArr = args[i].split(" : ");
    let product = inputArr[0];
    let initial = product[0];
    let price = Number(inputArr[1]);
    
    if (!catalogue.hasOwnProperty(initial)) {
      catalogue[initial] = [];
    }

    catalogue[initial][product] = price;
  }


  // Step 2. Create a sorted structure
  let SortedCatalogue = [];
  let catalogKeys = Object.keys(catalogue); // this returns (5) ["A", "F", "T", "D", "B"]
  catalogKeys.sort(function(a, b) { return a.localeCompare(b); }); // this transforms to (5) ["A", "B", "D", "F", "T"] 
  
  for (let i = 0; i < catalogKeys.length; i++) {
    let catalogKey = catalogKeys[i];
    SortedCatalogue[catalogKey] = []; // this needs to be done

    let productKeys = Object.keys(catalogue[catalogKey]); // this returns (3) ["Appricot", "Apple", "Anti-Bug Spray"]
    productKeys.sort(function(a, b) { return a.localeCompare(b); }); // this transforms to (3) ["Anti-Bug Spray", "Apple", "Appricot"]
 
    for (let j = 0; j < productKeys.length; j++) {
      let productKey = productKeys[j];
      SortedCatalogue[catalogKey][productKey] = catalogue[catalogKey][productKey];
    }

  }

  // Step 3. Print Result

  for (let key in SortedCatalogue) {
    console.log(key);
    for (let key2 in SortedCatalogue[key]) {
      console.log(`  ${key2}: ${SortedCatalogue[key][key2]}`);
    }
  }

}

main(['Appricot : 20.4',
'Fridge : 1500',
'TV : 1499',
'Deodorant : 10',
'Boiler : 300',
'Apple : 1.25',
'Anti-Bug Spray : 15',
'T-Shirt : 10']
);