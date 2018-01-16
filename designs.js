// Take the dom elements and set them as constants
const submitForm = document.getElementById('sizePicker');
const canvas = document.getElementById('pixel_canvas');

// @description The function that will build the grid
function makeGrid() {
  // @description Take the values of the input fields
  let rows = document.getElementById('input_height').value;
  let columns = document.getElementById('input_width').value;

  // @description If there is already Grid created, remove it and create new one
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }

  for (var r = 0; r < rows; r++) {
    // @description Create table row element.
    canvas.appendChild(document.createElement('tr'));
    for (var c = 0; c < columns; c++) {
      // @description Find the current row element to create table cell element inside it
      let currentRow = document.getElementsByTagName('tr')[r];
      //@description Create table cell.
      currentRow.appendChild(document.createElement('td'));
    }
  }
}

// @description Call make grid function on click of submit button
submitForm.addEventListener("submit", function(event) {
  // @description Prevent the default behaviur of submit button
  event.preventDefault();
  // @description Create the grid
  makeGrid();
});
