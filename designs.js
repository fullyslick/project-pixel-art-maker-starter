// Select color input
// Select size input

// When size is submitted by the user, call makeGrid()

function makeGrid() {

  // Your code goes here!
  // Just test variable that will hold rows and colomns
  let row = 4;
  let colomns = 5;

  //The jQuery function that will create the grid
  jQuery(function($) {
    for (let n = 0; n < row; n++) {
      $('#pixel_canvas').append('<tr></tr>');
      for (var m = 0; m < colomns; m++) {
        $('tr').last().append('<td></td>');
      }
    }
  });
}

makeGrid();
