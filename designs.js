  jQuery(function($) {
    //@description Java script function that is called when 'submit' button is clicked
    function makeGrid() {

      //@description If there is already Grid created, remove it and create new one.
      $('tr').remove();

      //@description Get the input value for height of the Grid.
      let row = $('#input_height').val();

      //@description Get the input value for width of the Grid.
      let colomns = $('#input_width').val();

      //@description Nested loop to create the table taking the input values.
      for (let n = 0; n < row; n++) {

        //@description Create table row element.
        $('#pixel_canvas').append('<tr></tr>');
        for (let m = 0; m < colomns; m++) {

          //@description Create table cell.
          $('tr').last().append('<td></td>');
        }
      }
    }

    //@description Get the form and on click of 'submit' button call makeGrid() function.
    //@param {event lsitener object} e
    $('form').submit(function(e) {
      makeGrid();
      e.preventDefault();
    });
  });
