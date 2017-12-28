  jQuery(function($) {

    //@description Take the DOM objects and set them as constants
    const inputHeight = $('#input_height');
    const inputWidth = $('#input_width');
    const colorPicker = $('#colorPicker');
    const tableCanvas = $('#pixel_canvas');
    //@description Takes the div that holds all the tools buttons
    const tools = $('#tools');

    //@description Holds the state of the mouse button - clicked (true) or not clicked (false)
    let isMouseDown = false;

    //@description Makes the cursor change the background of each cell
    function drawWithCursor() {

      //@description When the mouse button is held down, the @param isMouseDown is set to true. This will allow user to draw continuously on the grid/canvas
      $('td').mousedown(function() {
        isMouseDown = true;
      });

      //@description When the mouse button is released the user will not be able to draw on the grid/canvas
      $('td').mouseup(function() {
        isMouseDown = false;
      });

      //@description If the mouse button is released outside the grid/canvas, the cursor will NOT continue to draw when it is back on the grid/canvas.
      //@description Solved the unexpected behaviour. Comment this event to examine the unexpected behaviour.
      tableCanvas.mouseleave(function functionName() {
        isMouseDown = false;
      });

      //@description The background from the color picker is applied on the clicked cell.
      function draw(e) {
        let colorChoosed = colorPicker.val();

        let cellClicked = $(e.target);

        cellClicked.css('background', colorChoosed);
      }

      //@description Allows the continuously drawing on the grid/canvas when mouse button is held (extra behaviour).
      //@param {event lsitener object} e
      tableCanvas.on('mouseenter', 'td', function(e) {
        if (isMouseDown) {
          draw(e);
        }
      });

      //@description Draw on the pixel/cell on single click of the mouse button (standard behaviour).
      tableCanvas.on('click', 'td', function(e) {
        draw(e);
      });
    }

    //@description This function handles the tool selection, and switches between different modes (draw, erase, eye picker),
    // depending on the clicked (choosen) tools
    tools.on('click', 'button', function(e) {

      //@description First remove "clicked" class from all buttons
      tools.children().removeClass('clicked');

      //@description Apply the "clicked" class just on the button that was clicked
      $(e.target).addClass('clicked');

      //@description TO:DO: Detects what button was clicked to switch between draw, erase, eyepick
      console.log($(e.target).val());
    });

    //@description Creates the canvas (grid)
    function makeGrid() {
      //@description If there is already Grid created, remove it and create new one.
      $('tr').remove();

      //@description Get the input value for height of the Grid.
      let row = inputHeight.val();

      //@description Get the input value for width of the Grid.
      let colomns = inputWidth.val();

      //@description Nested loop to create the canvas (Grid) taking the input values.
      for (let n = 0; n < row; n++) {

        //@description Create table row element.
        tableCanvas.append('<tr></tr>');
        for (let m = 0; m < colomns; m++) {

          //@description Create table cell (pixel).
          $('tr').last().append('<td></td>');
        }
      }

      //@description Sets the drawing behaviour of the cursor
      drawWithCursor();
    }

    //@description Get the form and on click of 'submit' button call makeGrid() function.
    //@param {event lsitener object} e
    $('form').submit(function(e) {
      makeGrid();
      e.preventDefault();
    });
  });
