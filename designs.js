// Take the dom elements and set them as constants
const submitForm = document.getElementById('sizePicker');
const canvas = document.getElementById('pixel_canvas');

// @description The function that will build the grid
function makeGrid() {
  // @description Take the values of the input fields
  let gridHeight = document.getElementById('input_height').value;
  let gridWidth = document.getElementById('input_width').value;
  alert(gridHeight + " " + gridWidth);
}

// @description Call make grid function on click of submit button
submitForm.addEventListener("submit", function(event) {
  // @description Prevent the default behaviur of submit button
  event.preventDefault();
  // @description Create the grid
  makeGrid();
});
