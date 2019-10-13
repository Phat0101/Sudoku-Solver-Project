$(document).ready(function () {
  const createTable = () => {
    $(".main").prepend("<table class = 'table'> </table>");
    for (let i = 0; i < 9; i++) {
      $(".table").append("<tr></tr>");
      for (let j = 1; j < 10; j++) {
        $(`tr:nth-child(${i + 1})`).append(`<td>${j+i*10-i}</td>`);
      }
    }
  };
  createTable();
});