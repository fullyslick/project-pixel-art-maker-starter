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

    //@description Holds the value of the clicked tool - drawer, eraser, eye - picker. By default it is in draw mode
    let modeSelected = "draw";

    //@description Defines the cursor behaviour on click of a cell, depening on the selected tool
    function cursorOnCanvas() {

      //@description Implements the drawing tool behaviour. The background from the color picker is applied on the clicked cell.
      function drawMode(e) {
        let colorChoosed = colorPicker.val();

        let cellClicked = $(e.target);

        cellClicked.css('background', colorChoosed);
      }

      //@description Implements the erasing tool behaviour. The background of the clicked cell (pixel) is set to white.
      function eraseMode(e) {
        $(e.target).css('background', '#ffffff');
      }

      //@description Implements the eye-drop tool behaviour. Takes the background color of the selected cell and apply it as a value for the color-picker input
      function eyeDropMode(e) {
        // Take the background-color value of the cell. It is in RGB format. It has to be converted to hex. See below.
        let cellColor = $(e.target).css('background-color');

        // Assigns the hex color value to this variable, after the RGB value is converted.
        let hexColor = rgb2hex(cellColor);

        //@description Function to convert rgb color to hex format.
        function rgb2hex(rgb) {
          rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);

          function hex(x) {
            return ("0" + parseInt(x).toString(16)).slice(-2);
          }
          return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
        }

        // Set the converted hex color value to color-picker input
        colorPicker.val(hexColor);
      }

      //@description Detects what button was clicked (by its value) to switch between draw, erase, eyepick mode.
      // Called every time a cell is clicked or hovered (with mouse button down).
      function detectTool(e) {
        switch (modeSelected) {
          case "draw":
            //@description Drawing tool is selected so call the drawMode function to draw on a cell
            drawMode(e);
            break;
          case "erase":
            //@description Erasing tool is selected so call the eraseMode function to erase the cell's background
            eraseMode(e)
            break;
          case "eyepick":
            //@description Eye drop tool is selected so call the eyeDropMode function to pick up the color of the cell
            eyeDropMode(e)
            break;
        }
      }

      // # All the cursor behaviours on manipulating the grid!

      //@description When the mouse button is held down, the @param isMouseDown is set to true. This will allow user to draw, erase, take color continuously on the grid/canvas
      $('td').mousedown(function() {
        isMouseDown = true;
      });

      //@description When the mouse button is released the user will not be able to draw, erase, take color on the grid/canvas
      $('td').mouseup(function() {
        isMouseDown = false;
      });

      //@description If the mouse button is released outside the grid/canvas, the cursor will NOT continue to draw, erase, take color when it is back on the grid/canvas.
      //@description Solved the unexpected behaviour. Comment this event to examine the unexpected behaviour.
      tableCanvas.mouseleave(function functionName() {
        isMouseDown = false;
      });

      //@description Allows the continuously drawing on the grid/canvas when mouse button is held (extra behaviour).
      //@param {event lsitener object} e
      tableCanvas.on('mouseenter', 'td', function(e) {
        if (isMouseDown) {
          // Detect what tool is selected to implement different behaviour - draw, erase, color picker
          detectTool(e);
        }
      });

      //@description Draw on the pixel/cell on single click of the mouse button (standard behaviour).
      tableCanvas.on('click', 'td', function(e) {
        // Detect what tool is selected to implement different behaviour - draw, erase, color picker
        detectTool(e);
      });
    }

    //@description Handles the tools button appearance and takes the value of the clicked button. Toggles the tool buttons "clicked" class, to highlight the chosen tool.
    tools.on('click', 'button', function(e) {

      //@description First remove "clicked" class from all buttons
      tools.children().removeClass('clicked');

      //@description Apply the "clicked" class just on the button that was clicked
      $(e.target).addClass('clicked');

      //@description Change the value of this varuable, to let the @function detectTool(e) knows what button is clicked.
      modeSelected = $(e.target).val();
    });

    //@description change the cursor image depending on tool selected
    tableCanvas.mouseenter(function functionName() {
      switch (modeSelected) {
        case "draw":
          //@description Change the cursor to pencil
          tableCanvas.css('cursor', 'url(http://portal.dsej.gov.mo/prognew/gensystem/actreg/actreg/images/pencil.png) 0 16, auto');
          break;
        case "erase":
          //@description Change the cursor to eraser
          tableCanvas.css('cursor', 'url(https://rims-web4.com/sitecreator/eraser.gif) 0 16, auto');
          break;
        case "eyepick":
          //@description Change the cursor to eye picker
          tableCanvas.css('cursor', 'url(https://www.pixilart.com/img/application/icons/eyedrop_32x32.png) 0 32, auto');
          break;
      }
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
      cursorOnCanvas();
    }

    //@description Get the form and on click of 'submit' button call makeGrid() function.
    //@param {event lsitener object} e
    $('form').submit(function(e) {
      makeGrid();
      e.preventDefault();
    });
  });
