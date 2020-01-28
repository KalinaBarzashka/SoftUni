function main(array){

  let sumRows = array.map(function(row){
    return row.reduce((a, b) => a + b, 0);
  });

  let sumCols = array.map(function(row, i){
    return array.map(function(row){
      return row[i];
    }).reduce((a, b) => a + b, 0);
  });

  let rowValue = sumRows[0];
  let colValue = sumCols[0];
  let isMagic = true;
  for (let i = 0; i < sumRows.length; i++) {
    if(rowValue !== sumRows[i]){
      isMagic = false;
      break;
    }
  }

  for (let i = 0; i < sumCols.length; i++) {
    if(colValue !== sumCols[i]){
      isMagic = false;
      break;
    }
  }

  console.log(isMagic);
}

main([[4, 5, 6],
  [6, 5, 4],
  [5, 5, 5]]
 ); //true

 main([[11, 32, 45],
  [21, 0, 1],
  [21, 1, 1]]
 );