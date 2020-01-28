function main(matrix){
  let sumMain = 0;
  let sumSecondary = 0;
  for(let row = 0; row < matrix.length; row++){
    for(let col = 0; col < matrix[row].length; col++){
      if(row == col){
        sumMain += matrix[row][col];
      }

      if(row + col == matrix.length - 1){
        sumSecondary += matrix[row][col];
      }
    }
  }

  console.log(sumMain + " " + sumSecondary);
}

main([[20, 40],
  [10, 60]]
 );