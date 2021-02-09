function main(args) {
  let result = [];
  for (let i = 0; i < args.length; i++) {
    let data = JSON.parse(args[i]);
    data.sort(function (a, b) {
      if(a < b) {
        return 1;
      }
      else if(a > b) {
        return -1;
      }
    });

    let hasSame = false;
    for (let j = 0; j < result.length; j++) {
      let arr = result[j];
      if(arr.length == data.length){
        hasSame = true;
        for (let k = 0; k < arr.length; k++) {
          if(arr[k] != data[k]) {
            hasSame = false;
            break;
          }
        }

        if(hasSame == true) {
          break;
        }
      }
    }

    if(hasSame == false) {
      result.push(data);
    }
  }

  result.sort(function (a, b) {
    if(a.length > b.length) {
      return 1;
    }
    else if(a.length < b.length) {
      return -1;
    }
  });
  
  for (let i = 0; i < result.length; i++) {
    const element = result[i];
    console.log(`[${element.join(", ")}]`);
  }
}

main(["[-3, -2, -1, 0, 1, 2, 3, 4]",
"[10, 1, -17, 0, 2, 13]",
"[4, -3, 3, -2, 2, -1, 1, 0]"]
);

main(["[7.14, 7.180, 7.339, 80.099]",
"[7.339, 80.0990, 7.140000, 7.18]",
"[7.339, 7.180, 7.14, 80.099]"]
);