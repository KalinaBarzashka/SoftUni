function solve(array) {
  let resultArray = [];

  let creator = {
    obj: {},
    create: function(name) {
      this.obj.name = name;
      resultArray.push(this.obj);
      return this.obj;
    },
    inherit: function(name, parentElement) {
      this.obj = Object.create(parentElement);
      this.obj.name = name;
      resultArray.push(this.obj);
      return this.obj;
    },
    set: function(name, key, value) {
      let index = resultArray.indexOf(x => x.name == name);
      if(index >= 0) {
        resultArray[index][key] = value;
      }
    },
    print: function(name) {
      let index = resultArray.indexOf(x => x.name == name);
      if(index >= 0) {
        //print properties
        console.log(resultArray);
      }
    }
  };

  for (let i = 0; i < array.length; i++) {
    let data = array[i].split(" ");
    
    if(data[0] == "create"){
      if(data.length == 2) {
        creator.create(data[1]);
      } else {
        creator.inherit(data[1], data[2]);
      }
    } else if(data[0] == "set") {
      creator.set(data[1], data[2], data[3]);
    } else if(data[0] == "print") {
      creator.print(data[1]);
    }
  }

  return resultArray;
}

solve(['create c1',
'create c2 inherit c1',
'set c1 color red',
'set c2 model new',
'print c1',
'print c2']
);