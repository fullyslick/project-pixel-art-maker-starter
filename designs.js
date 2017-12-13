  jQuery(function($) {

    //@description Take the DOM objects and set them as constants
    const inputHeight = $('#input_height');
    const inputWidth = $('#input_width');
    const colorPicker = $('#colorPicker');
    const tableCanvas = $('table');

    //@description Java script function that is called when 'submit' button is clicked
    function makeGrid() {
      //@description If there is already Grid created, remove it and create new one.
      $('tr').remove();

      //@description Get the input value for height of the Grid.
      let row = inputHeight.val();

      //@description Get the input value for width of the Grid.
      let colomns = inputWidth.val();

      //@description Nested loop to create the table taking the input values.
      for (let n = 0; n < row; n++) {

        //@description Create table row element.
        $('#pixel_canvas').append('<tr></tr>');
        for (let m = 0; m < colomns; m++) {

          //@description Create table cell.
          $('tr').last().append('<td></td>');
        }
      }

      //@description On click of any of the cells, take the valkue of color picker and change the backgrund of that cell
      //@param {event lsitener object} e
      tableCanvas.on('mousedown', 'td', function(e) {

        //@description Take the input of color picker
        let colorChoosed = colorPicker.val();

        //@description Ge the cell that was clicked
        let cellClicked = $(e.target);

        //@description Apply background
        cellClicked.css('background', colorChoosed);
      });
    }

    //@description Get the form and on click of 'submit' button call makeGrid() function.
    //@param {event lsitener object} e
    $('form').submit(function(e) {
      makeGrid();
      e.preventDefault();
    });
  });
