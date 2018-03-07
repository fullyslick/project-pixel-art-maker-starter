// Take the dom elements and set them as constants
const submitForm = document.getElementById('sizePicker');
const canvas = document.getElementById('pixel_canvas');
// Stores the choosen color
let colorChoosed;

// @description Allows to draw on the canvas
function drawOnCanvas(){
  // On click of any of the cells, take the value of color picker and change the backgrund of that cell
  canvas.addEventListener("click", function(e) {

    // Delegation, detect if the clicked child element is table cell ("td")
    if (e.target.nodeName === "TD") {
      // @param Get the value of the color picker and assign it to a variable
      colorChoosed= document.getElementById('colorPicker').value;

      // @description Apply the selected color and set it as background to the chosen cell
      e.target.style.background = colorChoosed;
    }
  });
}
// @description The function that will build the grid
function makeGrid() {
  // @description Take the values of the input fields
  let rows = document.getElementById('input_height').value;
  let columns = document.getElementById('input_width').value;

  // @description If there is already Grid created, remove it and create new one
  while (canvas.firstChild) {
    canvas.removeChild(canvas.firstChild);
  }

  for (let r = 0; r < rows; r++) {
    // @description Create table row element.
    canvas.appendChild(document.createElement('tr'));
    for (let c = 0; c < columns; c++) {
      // @description Find the current row element to create table cell element inside it
      let currentRow = document.getElementsByTagName('tr')[r];
      //@description Create table cell.
      currentRow.appendChild(document.createElement('td'));
    }
  }

  // @description Call the function to draw on canvas
  drawOnCanvas();
}

// @description Call make grid function on click of submit button
submitForm.addEventListener("submit", function(event) {
  // @description Prevent the default behaviur of submit button
  event.preventDefault();
  // @description Create the grid
  makeGrid();
});
