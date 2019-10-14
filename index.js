$(document).ready(function() {
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
            let each = $(`tr:nth-child(${i}) > td:nth-child(${j}) > input`).val();
            row.push(parseInt(each));
        }
        arr.push(row);
    }
    console.log(arr);
};
//Display output from logic.js to page
const display = (solvedArray) => {

};
display();
const solve = () => {
    getUserInput();
};