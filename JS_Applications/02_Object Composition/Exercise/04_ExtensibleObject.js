function solve() {
  let obj = {
    extend: function(template) {
      // for (let i = 0; i < Object.keys(template).length; i++) {
      //   if(typeof(template[Object.keys(template)[i]]) == "function") {
      //     Object.getPrototypeOf(obj)[Object.keys(template)[i]] = template[Object.keys(template)[i]];
      //   } else {
      //     obj[Object.keys(template)[i]] = template[Object.keys(template)[i]];
      //   }
      // }

      // for (let property of Object.keys(template)) {
      //   if(typeof(template[property]) == "function") {
      //     Object.getPrototypeOf(obj)[property] = template[property];
      //   } else {
      //     obj[property] = template[property];
      //   }
      // }

      for (const key in template) {
        if(typeof(template[key]) == "function") {
          Object.getPrototypeOf(obj)[key] = template[key];
        } else {
          obj[key] = template[key];
        }
      }
    }
  };

  return obj;
}

let template = {
  extensionMethod: function () {
      console.log("From extension method")
  }
};

let testObject = solve();
testObject.extend(template);