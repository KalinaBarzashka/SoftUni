function main(args){
  const regex = /\w+\d*[\_]*/g;
  let m;
  let obj = {};

  while ((m = regex.exec(args[0])) !== null) {
    let word = m[0];
    if(obj[word] == undefined){
      obj[word] = 1;
    }
    else{
      obj[word] += 1;
    }
  }

  console.log(JSON.stringify(obj));
}