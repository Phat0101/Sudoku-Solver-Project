/* eslint-disable max-len */
// declare a sample of sudoku problem, difficulty: medium->hard
const array = [
  [2, 3, 0, 0, 0, 0, 1, 0, 0],
  [0, 0, 6, 0, 8, 4, 9, 3, 2],
  [0, 0, 0, 3, 0, 2, 0, 0, 0],
  [0, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 0, 2, 7, 0, 0, 0, 0],
  [5, 0, 0, 0, 0, 0, 2, 0, 0],
  [0, 0, 9, 0, 0, 3, 4, 5, 8],
  [3, 4, 5, 8, 6, 7, 2, 9, 1],
  [8, 0, 0, 0, 0, 5, 6, 7, 3],
];

let referenceArray = [...array];
// create a reference array
const createReference = (array) => {
  const x = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (array[i][j] == 0) {
        array[i][j] = x;
      }
    }
  }
  return array;
};
referenceArray = createReference(array);

// check if the solution is valid
const check = (array) => {
  let sumRow = 0;
  let sumColumn = 0;
  for (let i = 0; i < 9; i++) {
    sumRow = 0;
    sumColumn = 0;
    for (let j = 0; j < 9; j++) {
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
      if (i!= xCoordinate && j != yCoordinate && (typeof currentArray[i][j] == 'number') && value == currentArray[i][j]) {
        return false;
      }
    }
  }
  return true;
};

// check the value in the its row and column
const checkRowColumn = (value, currentArray, xCoordinate, yCoordinate) => {
  for (let i = 0; i < 9; i++) {
    if ( (i!=xCoordinate && (typeof currentArray[i][yCoordinate]== 'number' && value == currentArray[i][yCoordinate]) ||
    (i!=yCoordinate && (typeof currentArray[xCoordinate][i] == 'number')) && value == currentArray[xCoordinate][i]) ) {
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
const elimination = () => {
  for (let x = 0; x < 9; x++) {
    for (let y = 0; y < 9; y++) {
      if (typeof referenceArray[x][y] != 'number') {
        const truePossibilities = [];
        for (let i = 0; i < referenceArray[x][y].length; i++) {
          if (checkEach(referenceArray[x][y][i], referenceArray, x, y)) {
            truePossibilities.push(referenceArray[x][y][i]);
          }
        }
        if (truePossibilities.length==1) {
          referenceArray[x][y] = truePossibilities[0];
        } else {
          referenceArray[x][y] = truePossibilities;
        }
      }
    }
  }
};

// create a backtracking to try every possibilities
let flag = false;
let solvedArray = [...referenceArray];
const backTrack = (x, y) => {
  if (y>8) {
    y = 0;
    x+=1;
  }
  if (x==9) {
    return 1;
  }
  if (typeof referenceArray[x][y] != 'number') {
    for (let i = 0; i<referenceArray[x][y].length; i++) {
      if (checkEach(referenceArray[x][y][i], solvedArray, x, y)) {
        solvedArray[x][y] = referenceArray[x][y][i];
      }
      if (x== 8 && y == 8 && check(solvedArray)) {
        flag = true;
      }
      if (y<9 && typeof solvedArray[x][y] == 'number') {
        return backTrack(x, y+1);
      }
      if (flag) {
        return 1;
      }
    }
    if (typeof referenceArray[x][y] != 'number') {
      solvedArray[x][y] = 0;
    }
  } else {
    return backTrack(x, y+1);
  }
};
for (let i = 0; i < 10; i++) {
  elimination();
};
let x = backTrack(0, 0);
console.table(solvedArray);
