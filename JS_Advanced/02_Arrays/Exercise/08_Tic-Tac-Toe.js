function main(array){
  const matrix = [[false, false, false],
  [false, false, false],
  [false, false, false]];
  
  let symbol = 'X';
  for (let i = 0; i < array.length; i++) {
    let row = array[i][0];
    let col = array[i][2];

    if(matrix[row][col] !== false){
      console.log("This place is already taken. Please choose another!");
      continue;
    }

    matrix[row][col] = symbol;
    
    if(win(matrix, symbol) == true){
      console.log(`Player ${symbol} wins!`);
      break;
    }
    else{
      let hasFalse = false;

      for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
          if(matrix[i][j] == false){
           hasFalse = true;
          }        
        }
      }
      if(hasFalse == false){
        console.log("The game ended! Nobody wins :(");
        break;
      }
    }

    if(symbol == 'X'){
      symbol = 'O';
    }
    else{
      symbol = 'X';
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    console.log(matrix[i].join("\t"));
  }

  function win(matrix, symbol){
    //check rows
    for (let i = 0; i < matrix.length; i++) {
      if(matrix[i][0] == symbol){
        if(matrix[i][1] == symbol){
          if(matrix[i][2] == symbol){
            return true;
          }
        }
      }
    }
  
    //check cols
    let cols = matrix.map(function(row, i){
      return matrix.map(function(row){
        return row[i];
      });
    });
    
    for (let i = 0; i < cols.length; i++) {
      if(cols[i][0] == symbol){
        if(cols[i][1] == symbol){
          if(cols[i][2] == symbol){
            return true;
          }
        }
      }
    }
  
    //check primary diagonal
    if(matrix[0][0] == symbol){
      if(matrix[1][1] == symbol){
        if(matrix[2][2] == symbol){
          return true;
        }
      }
    }
  
    //check secondary diagonal
    if(matrix[0][2] == symbol){
      if(matrix[1][1] == symbol){
        if(matrix[2][0] == symbol){
          return true;
        }
      }
    }
  
    return false;
  }
}

main(["0 1",
"0 0",
"0 2",
"2 0",
"1 0",
"1 2",
"1 1",
"2 1",
"2 2",
"0 0"]
);

main(["0 1",
"0 0",
"0 2", 
"2 0",
"1 0",
"1 1",
"1 2",
"2 2",
"2 1",
"0 0"]
);

main(["0 0",
"0 0",
"1 1",
"0 1",
"1 2",
"0 2",
"2 2",
"1 2",
"2 2",
"2 1"]
);