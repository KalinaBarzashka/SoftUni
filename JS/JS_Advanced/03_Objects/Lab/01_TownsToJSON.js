function main(args) {

  let townsArr = [];

  const regex = /\s*[\|]\s*/g;
  for (let i = 1; i < args.length; i++) {
    let arr = args[i].split(regex);
    let town = arr[1];
    let latitude = Number(Number(arr[2]).toFixed(2));
    let longitude = Number(Number(arr[3]).toFixed(2));

    let townsObj = {
      Town: town,
      Latitude: latitude,
      Longitude: longitude
    };

    townsArr.push(townsObj);

  }
  
  console.log(JSON.stringify(townsArr));

}

main(['| Town | Latitude | Longitude |',
'| Sofia | 42.696552 | 23.32601 |',
'| Beijing | 39.913818 | 116.363625 |']
);