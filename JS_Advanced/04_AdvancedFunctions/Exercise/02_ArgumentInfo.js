function result() {
  let result = [];
  let countTypes = [];

  for (let i = 0; i < arguments.length; i++) {
    let type = typeof(arguments[i]);
    result.push(`${type}: ${arguments[i]}`);

    if(!countTypes.some(x => x.key == type)) {
      countTypes.push({
        key: type,
        val: 1
      });
    }
    else {
      let index = countTypes.findIndex(x => x.key == type);
      countTypes[index].val++;
    }
  }

  countTypes.sort(function (a, b) {
    if(a.val > b.val) {
      return -1;
    } else if(a.val < b.val) {
      return 1;
    }
  });

  //print
  for (let i = 0; i < result.length; i++) {
    console.log(result[i]);
  }

  for (let i = 0; i < countTypes.length; i++) {
    console.log(`${countTypes[i].key} = ${countTypes[i].val}`);
  }
}
result('cat', 42, function () { console.log('Hello world!'); });