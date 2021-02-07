function solve(array) {
  let innerObj = {
    collection: [],
    add: function(str) {
      this.collection.push(str);
    },
    remove: function(str) {
      for (let i = 0; i < this.collection.length; i++) {
        if(this.collection[i] == str) {
          this.collection.splice(i, 1);
        }
      }
    },
    print: function() {
      console.log(this.collection.join(","));
    },
  };

  for (let i = 0; i < array.length; i++) {
    let elements = array[i].split(" ");
    if(elements[0] == "add") {
      innerObj.add(elements[1]);
    } else if(elements[0] == "remove") {
      innerObj.remove(elements[1]);
    } else {
      innerObj.print();
    }
  }
}

solve(['add hello', 'add again', 'remove hello', 'add again', 'print']);
solve(['add peter', 'add george', 'add peter', 'remove peter','print']);