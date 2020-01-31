function main() {
  return (function () {
    let dictMicroelements = {
      "protein": 0,
      "carbohydrate": 0,
      "fat": 0,
      "flavour": 0
    };

    let receiptLibrari = {
      "apple": {"carbohydrate": 1, "flavour": 2},
      "lemonade": {"carbohydrate": 10, "flavour": 20},
      "burger": {"carbohydrate": 5, "fat": 7, "flavour": 3},
      "eggs": {"protein": 5, "fat": 1, "flavour": 1},
      "turkey": {"protein": 10, "carbohydrate": 10, "fat": 10, "flavour": 10},
    }

    function restock(microelement, quantity) {
      dictMicroelements[microelement] += Number(quantity);
      return "Success";
    }

    function prepare(recipe, quantity) {
      let recipeObj = receiptLibrari[recipe];
      for (let key in recipeObj) {
        if(dictMicroelements[key] < recipeObj[key] * Number(quantity)){
          return `Error: not enough ${key} in stock`;
        }
      }
      
      for (let key in recipeObj) {
        dictMicroelements[key] -= recipeObj[key] * Number(quantity);
      }
      return "Success";
    }

    function report() {
      return `protein=${dictMicroelements.protein} carbohydrate=${dictMicroelements.carbohydrate} fat=${dictMicroelements.fat} flavour=${dictMicroelements.flavour}`;
    }
    
    return function(input) {
      let splitedInput = input.split(" ");
      if(splitedInput[0] == 'restock') {
        let microelement = splitedInput[1];
        let quantity = Number(splitedInput[2]);
        return restock(microelement, quantity);
      }
      else if(splitedInput[0] == 'prepare') {
        let recipe = splitedInput[1];
        let quantity = Number(splitedInput[2]);
        return prepare(recipe, quantity);
      }
      else if(splitedInput[0] == 'report') {
        return report();
      }
    }
  })();
}

let expectationPairs = [
  ['restock flavour 50', 'Success'],
  ['prepare lemonade 4', 'Error: not enough carbohydrate in stock']
];