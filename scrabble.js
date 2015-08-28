var modelGrid = {

  boardHeight: 15,
  boardWidth: 15,

  init: function () {
    modelGrid.buildGrid()
  },


  buildGrid: function () {
    var tableString = "<table><tbody>";
    for(var rowPos = 0; rowPos < modelGrid.boardHeight; rowPos++) {
      tableString += "<tr>"
      for(var colPos = 1; colPos < modelGrid.boardWidth + 1; colPos++) {
        var idNum = colPos + modelGrid.boardWidth * rowPos - 1;
        tableString += "<td id = '" + idNum.toString() + "'>" + idNum.toString() + "</td>"
      }
      tableString += "</tr>"
    }
    tableString += "</tbody></table>"
    $('#board-container').append(tableString);
    modelGrid.assignSpecialSquares();
  },

  assignSpecialSquares: function() {
    buildRedSquares();
    buildLightBlueSquares();
    buildDarkBlueSquares();
    buildPinkSquares();
    buildStarSquare();
  },

  buildRedSquare: function(number) {
    var result = $.inArray(number, [0,7,14,105,119,210,217,224])
    if (result == -1) {
      return false;
    } else {
      return true;
    }
  }

}

var controller = {
  init: function() {
    modelGrid.init();
  }
}

$(document).ready(function () {
  controller.init();
})



