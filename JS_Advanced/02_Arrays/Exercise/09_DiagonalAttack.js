function main(matrixNotMapped){
  let matrix = matrixNotMapped.map(
    row => row.split(' ').map(Number));
  let sumPrimaryDiagonal = 0;
  let sumSecondaryDiagonal = 0;

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if(i == j){
        sumPrimaryDiagonal += matrix[i][j];
      }

      if(i == matrix.length - 1 - j){
        sumSecondaryDiagonal += matrix[i][matrix.length - 1 - j];
      }
    }
  }

  if(sumPrimaryDiagonal == sumSecondaryDiagonal){
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix.length; j++) {
        if(i != j && i != matrix.length - 1 - j){
          matrix[i][j] = sumPrimaryDiagonal;
        }
      }
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i].join(" "));
  }
}

main(['5 3 12 3 1',
'11 4 23 2 5',
'101 12 3 21 10',
'1 4 5 2 2',
'5 22 33 11 1']
); //15

main(['1 1 1',
'1 1 1',
'1 1 0']
);