// declare a sample of sudoku problem, difficulty: medium->hard
let array = [
  [1, 0, 0, 0, 0, 0, 0, 0, 3],
  [0, 0, 7, 2, 6, 0, 4, 8, 0],
  [4, 0, 0, 9, 3, 5, 0, 0, 6],
  [0, 3, 0, 4, 8, 0, 2, 0, 0],
  [0, 4, 1, 6, 0, 9, 3, 0, 0],
  [0, 0, 6, 0, 0, 0, 8, 9, 0],
  [5, 7, 8, 0, 4, 0, 0, 0, 2],
  [0, 0, 0, 3, 0, 0, 0, 7, 0],
  [2, 0, 0, 0, 0, 0, 0, 0, 5],
];

let referenceArray = [...array];
// create a reference array
const createReference = (array) => {
  let x = [1,2,3,4,5,6,7,8,9];
  for (let i = 0; i < 9; i++){
    for (let j = 0; j < 9; j++){
       if (array[i][j] == 0) {
         array[i][j] = x;
       }
    }
  }
  console.log(array);
}
createReference(array);
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
// console.log(check(array));
