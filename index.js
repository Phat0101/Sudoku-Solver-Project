/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
const memoryArray = [[
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
]];
$(document).ready(function() {
  // dynamically create sudoku table of 9x9
  const createTable = () => {
    for (let i = 1; i < 10; i++) {
      $('.table').append('<tr></tr>');
      for (let j = 1; j < 10; j++) {
        $(`tr:nth-child(${i})`).append(`
        <td id = "x${i}${j}"
        onmouseenter = "highLight(this.id) "
        onmouseleave = "lowLight(this.id) ">
          <input type = number min = "1" max = "9" oninput = checkValid(this)>
        </td>`);
      }
    }
  };
  createTable();
});


// get user input and return a 2D array
const getUserInput = () => {
  const arr = [];
  for (let i = 1; i < 10; i++) {
    const row = [];
    for (let j = 1; j < 10; j++) {
      const each = parseInt($(`tr:nth-child(${i}) > td:nth-child(${j}) > input`).val());
      if (each < 10 && each > 0) {
        row.push(each);
      } else {
        row.push(0);
      };
    }
    arr.push(row);
  };
  return arr;
};


// Perform Logical Check to ensure user provide valid input (which can be calculated)
// In other words "Correct Sudoku problem"
// check row and column
const checkRownColumn = (currentValue, xCoordinate, yCoordinate) => {
  for (let j = 1; j < 10; j++) {
    if ((currentValue == parseInt($(`tr:nth-child(${xCoordinate}) > td:nth-child(${j}) > input`).val()) && j != yCoordinate) ||
      (currentValue == parseInt($(`tr:nth-child(${j}) > td:nth-child(${yCoordinate}) > input`).val()) && j != xCoordinate)) {
      return false;
    }
  }
  return true;
};

// check a group of 3*3
const checkGroup = (currentValue, xCoordinate, yCoordinate) => {
  const xTopLeft = (xCoordinate > 6) ? 7 : (xCoordinate > 3) ? 4 : 1;
  const yTopLeft = (yCoordinate > 6) ? 7 : (yCoordinate > 3) ? 4 : 1;
  for (let i = xTopLeft; i < xTopLeft + 3; i++) {
    for (let j = yTopLeft; j < yTopLeft + 3; j++) {
      if (currentValue == parseInt($(`tr:nth-child(${i}) > td:nth-child(${j}) > input`).val()) && i != xCoordinate && j != yCoordinate) {
        return false;
      };
    }
  }
  return true;
};

const checkValid = (i) => {
  const parentId = i.parentNode.id;
  const currentValue = parseInt($(`tr:nth-child(${parseInt(parentId[1])})
  > td:nth-child(${parseInt(parentId[2])}) > input`).val());
  const xCoordinate = parseInt(parentId[1]);
  const yCoordinate = parseInt(parentId[2]);
  if (!checkRownColumn(currentValue, xCoordinate, yCoordinate) || !checkGroup(currentValue, xCoordinate, yCoordinate) || currentValue >9 || currentValue < 1) {
    $(`#${parentId} > input`).css('color', 'red');
  } else {
    $(`#${parentId} > input`).css('color', 'black');
  };
  memoryArray.push(getUserInput());
};


// Highlight and "lowlight:)" the current row and column of the selected element
const highLight = (id) => {
  const xCoordinate = parseInt(id[1]);
  const yCoordinate = parseInt(id[2]);
  for (let i = 1; i < 10; i++) {
    $(`tr:nth-child(${i}) > td:nth-child(${yCoordinate})`).css('background-color', 'rgba(179, 179, 179,0.3)');
    $(`tr:nth-child(${xCoordinate}) > td:nth-child(${i})`).css('background-color', 'rgba(179, 179, 179,0.3)');
    $(`tr:nth-child(${i}) > td:nth-child(${yCoordinate}) > input`).css('background-color', 'rgba(179, 179, 179,0.2)');
    $(`tr:nth-child(${xCoordinate}) > td:nth-child(${i}) > input`).css('background-color', 'rgba(179, 179, 179,0.2)');
  }
};
const lowLight = (id) => {
  const xCoordinate = parseInt(id[1]);
  const yCoordinate = parseInt(id[2]);
  for (let i = 1; i < 10; i++) {
    $(`tr:nth-child(${i}) > td:nth-child(${yCoordinate})`).css('background-color', 'transparent');
    $(`tr:nth-child(${xCoordinate}) > td:nth-child(${i})`).css('background-color', 'transparent');
    $(`tr:nth-child(${i}) > td:nth-child(${yCoordinate}) > input`).css('background-color', 'transparent');
    $(`tr:nth-child(${xCoordinate}) > td:nth-child(${i}) > input`).css('background-color', 'transparent');
  }
};

// Utiliy functions:
// Undo to the previous entered value
const undo = () => {
  console.table(memoryArray[memoryArray.length-1]);
  display(memoryArray[memoryArray.length - 1], memoryArray[memoryArray.length-1]);
  if (memoryArray.length >1) {
    memoryArray.pop();
  }
};

// Clear the whole table
const clearTable = () => {
  memoryArray.push(getUserInput());
  for (let i = 1; i < 10; i++) {
    for (let j = 1; j < 10; j++) {
      $(`tr:nth-child(${i}) > td:nth-child(${j}) > input`).val(null);
    }
  };
};


// Display output from logic.js to page

const display = (solvedArray, userInputArray) => {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (solvedArray[i][j] != 0) {
        $(`tr:nth-child(${i+1}) > td:nth-child(${j+1}) > input`).val(`${solvedArray[i][j]}`);
        if (userInputArray[i][j] == 0) {
          $(`tr:nth-child(${i+1}) > td:nth-child(${j+1}) > input`).css('color', 'blue');
        }
      } else {
        $(`tr:nth-child(${i+1}) > td:nth-child(${j+1}) > input`).val(null);
      }
    }
  }
};

// solve problem
const solve = () => {
  const userInputArray = getUserInput();
  const array = solveSudoku(userInputArray);
  display(array, userInputArray);
};


// -------------------------------------------this is calculation section!--------------------------------------------------//

// solveSudoku
// eslint-disable-next-line require-jsdoc
function solveSudoku(array) {
  let referenceArray = [];
  // create a reference array
  const createReference = (arr) => {
    const x = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (arr[i][j] == 0) {
          arr[i][j] = x;
        } else arr[i][j] = array[i][j];
      }
    }
    return arr;
  };
  referenceArray = createReference(JSON.parse(JSON.stringify(array)));

  // check if the solution is valid
  const check = (array) => {
    let sumRow = 0;
    let sumColumn = 0;
    for (let i = 0; i < 9; i++) {
      sumRow = 0;
      sumColumn = 0;
      for (let j = 0; j < 9; j++) {
        if (!checkEach(array[i][j], array, i, j)) {
          return false;
        }
        sumRow+=array[i][j];
        sumColumn+=array[j][i];
      }
      if (sumRow!=45 || sumColumn !=45) {
        return false;
      }
    }
    return true;
  };

  // check the value in its group of 3x3
  const checkGroup = (value, currentArray, xCoordinate, yCoordinate) => {
    const xTopLeft = (xCoordinate > 5) ? 6 : (xCoordinate > 2) ? 3 : 0;
    const yTopLeft = (yCoordinate > 5) ? 6 : (yCoordinate > 2) ? 3 : 0;
    for (let i = xTopLeft; i < xTopLeft+3; i++) {
      for (let j = yTopLeft; j < yTopLeft+3; j++) {
        if (i!= xCoordinate && j != yCoordinate && (typeof currentArray[i][j] == 'number') && value == currentArray[i][j] && currentArray[i][j] !=0) {
          return false;
        }
      }
    }
    return true;
  };

  // check the value in the its row and column
  const checkRowColumn = (value, currentArray, xCoordinate, yCoordinate) => {
    for (let i = 0; i < 9; i++) {
      if ( (i!=xCoordinate && (typeof currentArray[i][yCoordinate]== 'number' && currentArray[i][yCoordinate] != 0 && value == currentArray[i][yCoordinate]) ||
    (i!=yCoordinate && (typeof currentArray[xCoordinate][i] == 'number')) && value == currentArray[xCoordinate][i])&& currentArray[xCoordinate][i] != 0 ) {
        return false;
      }
    }
    return true;
  };

  const checkEach = (value, currentArray, xCoordinate, yCoordinate) => {
    if (!checkGroup(value, currentArray, xCoordinate, yCoordinate)) {
      return false;
    };
    if (!checkRowColumn(value, currentArray, xCoordinate, yCoordinate)) {
      return false;
    };
    return true;
  };

  // Perform logical elimination of each grid's possibilities
  const elimination = (referenceArray) => {
    const arr = JSON.parse(JSON.stringify(referenceArray));
    for (let x = 0; x < 9; x++) {
      for (let y = 0; y < 9; y++) {
        if (typeof arr[x][y] != 'number') {
          const truePossibilities = [];
          for (let i = 0; i < arr[x][y].length; i++) {
            if (checkEach(arr[x][y][i], arr, x, y)) {
              truePossibilities.push(arr[x][y][i]);
            }
          }
          if (truePossibilities.length==1) {
            arr[x][y] = truePossibilities[0];
          } else {
            arr[x][y] = truePossibilities;
          }
        }
      }
    }
    return arr;
  };

  // create a backtracking to try every possibilities
  let flag = false;
  let solvedArray = [];
  const backTrack = (x, y) => {
    if (y>8) {
      y = 0;
      x+=1;
    }
    if (x==9) {
      if (check(solvedArray)) {
        flag = true;
      }
      return;
    }
    if (typeof referenceArray[x][y] != 'number') {
      for (let i = 0; i<referenceArray[x][y].length; i++) {
        if (checkEach(referenceArray[x][y][i], solvedArray, x, y)) {
          solvedArray[x][y] = referenceArray[x][y][i];
          if (y<9 && typeof solvedArray[x][y] == 'number') {
            backTrack(x, y+1);
          }
        }
        if (flag) {
          return;
        }
      }
      solvedArray[x][y] = 0;
    } else {
      solvedArray[x][y] = referenceArray[x][y];
      backTrack(x, y+1);
    }
  };

  for (let i = 0; i < 10; i++) {
    referenceArray = elimination(referenceArray);
  };
  solvedArray = JSON.parse(JSON.stringify(referenceArray));
  const x = backTrack(0, 0);
  console.log(solvedArray);
  return solvedArray;
};
