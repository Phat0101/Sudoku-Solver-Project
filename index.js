/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
'use strict';

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


// get user input and convert to a 2D array
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

  console.table(arr);
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
  if (!checkRownColumn(currentValue, xCoordinate, yCoordinate) || !checkGroup(currentValue, xCoordinate, yCoordinate)) {
    $(`#${parentId} > input`).css('color', 'red');
  } else {
    $(`#${parentId} > input`).css('color', 'black');
  };
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


// solve sudoku when triggered in html button "Solve"
const solve = () => {
  getUserInput();
  display(solvedArray);
};


// Display output from logic.js to page
const solvedArray = [];
for (let i = 1; i < 10; i++) {
  const x = [];
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
