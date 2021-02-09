function main(matrix){
  let biggest = Number.NEGATIVE_INFINITY;

  matrix.forEach(row => row.forEach(
    col => biggest = Math.max(biggest, col)));

  console.log(biggest);
}

main([[20, 50, 10],
  [8, 33, 145]]
 );