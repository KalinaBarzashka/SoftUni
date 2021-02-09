function main() {
  class Kitchen {
    constructor(budget) {
      this.budget = Number(budget);
      this.menu = [];
      this.productsInStock = [];
      this.actionsHistory = [];
    }

    loadProducts(arr) {
      this.actionsHistory = [];
      for (let i = 0; i < arr.length; i++) {
        let data = arr[i].split(' ');
        let product = data[0];
        let quantity = Number(data[1]);
        let price = Number(data[2]);

        if(this.budget >= price) {
          this.budget -= price;
          let has = false;
          
          for (let j = 0; j < this.productsInStock.length; j++) {
            if(this.productsInStock[j]['product'] == product) {
              this.productsInStock[j]['quantity'] += quantity;
              has = true;
              break;
            }
          }

          if(has == false) {
            this.productsInStock.push({
              product: product,
              quantity: quantity
            });
          }

          this.actionsHistory.push(`Successfully loaded ${quantity} ${product}`);
        } else {
          this.actionsHistory.push(`There was not enough money to load ${quantity} ${product}`);
        }
      }

      return this.actionsHistory.join(`\n`);
    }

    addToMenu(meal, arr, price) {
      if(this.mealExists(meal) == true) {
        return `The ${meal} is already in our menu, try something different.`;
      }

      this.menu.push({
        meal: meal,
        neededProducts: arr,
        price: Number(price)
      });
      return `Great idea! Now with the ${meal} we have ${this.menu.length} meals in the menu, other ideas?`;
    }

    mealExists(mealName) {
      for (let i = 0; i < this.menu.length; i++) {
        if(this.menu[i]['meal'] == mealName) {
          return true;
        }
      }

      return false;
    }

    showTheMenu() {
      let str = '';
      if(this.menu.length == 0) {
        return `Our menu is not ready yet, please come later...`;
      }

      for (let i = 0; i < this.menu.length; i++) {
        str += `${this.menu[i]['meal']} - $ ${this.menu[i]['price']}\n`;
      }

      str.trim();
      return str;
    }

    makeTheOrder(meal) {
      let obj = '';

      for (let i = 0; i < this.menu.length; i++) {
        if(this.menu[i]['meal'] == meal) {
          obj = this.menu[i];
          break;
        }
      }

      if(obj == '') {
        return `There is not ${meal} yet in our menu, do you want to order something else?`;
      }

      let productsArr = obj['neededProducts'];
      let mealPrice = Number(obj['price']);
      let haveProducts = true;

      for (let i = 0; i < productsArr.length; i++) {
        let data = productsArr[i].split(' ');
        let dataProductName = data[0];
        let dataProductQuantity = Number(data[1]);

        for (let j = 0; j < this.productsInStock.length; j++) {
          if(this.productsInStock[j]['product'] != dataProductName || this.productsInStock[dataProductName] < dataProductQuantity) {
            haveProducts = false;
            break;
          }
        }
        
        if(haveProducts == false) {
          break;
        }
      }

      if(haveProducts == false) {
        return `For the time being, we cannot complete your order (${meal}), we are very sorry...`;
      }

      this.removeProductsFromStock(obj);

      this.budget += mealPrice;
      return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${mealPrice}.`;
    }

    removeProductsFromStock(obj) {
      let productsArr = obj['neededProducts'];

      for (let i = 0; i < productsArr.length; i++) {
        let data = productsArr[i].split(' ');
        let dataProductName = data[0];
        let dataProductQuantity = Number(data[1]);

        this.productsInStock[dataProductName] -= dataProductQuantity;
      }
    }
  }

  // let kitchen = new Kitchen (1000);
  // console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));
  // console.log(kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99));
  // console.log(kitchen.addToMenu('Pizza', ['Flour 0.5', 'Oil 0.2', 'Yeast 0.5', 'Salt 0.1', 'Sugar 0.1', 'Tomato sauce 0.5', 'Pepperoni 1', 'Cheese 1.5'], 15.55));
  // console.log(kitchen.showTheMenu());
  // console.log(kitchen.makeTheOrder('Pizza'));

  let kitchen = new Kitchen (5000);
  console.log(kitchen.loadProducts(['Banana 10 5', 'Banana 20 10', 'Strawberries 50 30', 'Yogurt 10 10', 'Yogurt 500 1500', 'Honey 5 50']));
  let a = kitchen.productsInStock;
  for (let i = 0; i < a.length; i++) {
    console.log(a[i]['product']);
  }
}

main();