$(document).ready(function () {
  //dynamically create sudoku table of 9x9 
  const createTable = () => {
    $(".main").prepend("<table class = 'table'> </table>");
    for (let i = 0; i < 9; i++) {
      $(".table").append("<tr></tr>");
      for (let j = 1; j < 10; j++) {
        $(`tr:nth-child(${i + 1})`).append(`<td><input type= number min ="1" max = "9"</td>`);
      }
    }
  };
  createTable();
});

//get user input and convert to a 2D array
const getUserInput = () => {
  let arr = [];
  for (let i = 1; i < 10; i++) {
    let row = [];
    for (let j = 1; j < 10; j++) {
      let each = parseInt($(`tr:nth-child(${i}) > td:nth-child(${j}) > input`).val());
      if (each < 10 && each > 0) {
        row.push(each);
      } else {
        row.push(0);
      };
    }
    arr.push(row);
  };

  console.table(arr);
};

//Highlight the current row and column of the selected element after 1000ms
//Display output from logic.js to page
let solvedArray = [];
for (let i = 1; i < 10; i++) {
  let x = [];
  for (let j = 1; j < 10; j++) {
    x.push(Math.floor(Math.random() * 9) + 1);
  }
  solvedArray.push(x);
}
const display = (solvedArray) => {
  console.table(solvedArray);
  for (let i = 1; i < 10; i++) {
    for (let j = 1; j < 10; j++) {
      $(`tr:nth-child(${i}) > td:nth-child(${j})`).html(`${solvedArray[i - 1][j - 1]}`);
    }
  }
};

//solve sudoku when triggered in html button "Solve"
const solve = () => {
  getUserInput();
  display(solvedArray);
};

//Perform Logical Check to ensure user provide valid input (which can be calculated)
//In other words "Correct Sudoku problem"
const logicalCheck = (arr) => {

  return true;
}