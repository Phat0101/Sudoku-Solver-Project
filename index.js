"use strict"
$(document).ready(function () {
  //dynamically create sudoku table of 9x9 
  const createTable = () => {
    for (let i = 1; i < 10; i++) {
      $(".table").append("<tr></tr>");
      for (let j = 1; j < 10; j++) {
        $(`tr:nth-child(${i})`).append(`
        <td id = "x${i}${j}" 
        onmouseenter = "highlight(this.id)"
        onmouseleave = "lowlight(this.id)">
          <input type = number min = "1" max = "9">
        </td>`);
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

//Perform Logical Check to ensure user provide valid input (which can be calculated)
//In other words "Correct Sudoku problem"
let constantly_check = true;
const logicalCheck = (arr) => {

  return true;
}

//Highlight and "lowlight:)" the current row and column of the selected element
const highlight = (id) => {
  let x_coordinate = parseInt(id[1]);
  let y_coordinate = parseInt(id[2]);
  for (let i = 1; i < 10; i++) {
    $(`tr:nth-child(${i}) > td:nth-child(${y_coordinate})`).css("background-color", "rgba(179, 179, 179,0.3)");
    $(`tr:nth-child(${x_coordinate}) > td:nth-child(${i})`).css("background-color", "rgba(179, 179, 179,0.3)");
    $(`tr:nth-child(${i}) > td:nth-child(${y_coordinate}) > input`).css("background-color", "rgba(179, 179, 179,0.2)");
    $(`tr:nth-child(${x_coordinate}) > td:nth-child(${i}) > input`).css("background-color", "rgba(179, 179, 179,0.2)");
  }
}
const lowlight = (id) => {
  let x_coordinate = parseInt(id[1]);
  let y_coordinate = parseInt(id[2]);
  for (let i = 1; i < 10; i++) {
    $(`tr:nth-child(${i}) > td:nth-child(${y_coordinate})`).css("background-color", "transparent");
    $(`tr:nth-child(${x_coordinate}) > td:nth-child(${i})`).css("background-color", "transparent");
    $(`tr:nth-child(${i}) > td:nth-child(${y_coordinate}) > input`).css("background-color", "transparent");
    $(`tr:nth-child(${x_coordinate}) > td:nth-child(${i}) > input`).css("background-color", "transparent");
  }
}
//solve sudoku when triggered in html button "Solve"
const solve = () => {
  getUserInput();
  display(solvedArray);
};

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
