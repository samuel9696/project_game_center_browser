"use strict";

var modelSnake = {

  body: [],

  checkForFood: function (target) {
    if ($("#" + target).hasClass("glyphicon-apple food")) {
      $("#" + target).removeClass("glyphicon-apple food");
      controller.placeFood();
      return true;
    }
    return false;
  }

};

var modelGrid = {

  boardHeight: 20,
  boardWidth: 30,

  init: function () {
    modelGrid.buildGrid()
  },


  buildGrid: function () {
    var tableString = "<table><tbody>";
    for(var rowPos = 0; rowPos < modelGrid.boardHeight; rowPos++) {
      tableString += "<tr>"
      for(var colPos = 1; colPos < modelGrid.boardWidth + 1; colPos++) {
        var idNum = colPos + modelGrid.boardWidth * rowPos - 1;
        if (rowPos == 0 ||
            colPos == 1 ||
            rowPos == modelGrid.boardHeight - 1 ||
            colPos == modelGrid.boardWidth) {
          tableString += ("<td id = '" + idNum.toString() + "' class = 'border'></td>");
        } else {
          tableString += "<td id = '" + idNum.toString() + "'></td>"
        }
      }
      tableString += "</tr>"
    }
    tableString += "</tbody></table>"
    $('#board-container').append(tableString);
  }

}

var view = {

  score: 0,
  currentDirection: null,

  init: function () {
    console.log("view init")
    controller.placeSnake();
    controller.placeFood();
  },

  updateScore: function () {
    view.score += 1;
    console.log("Current score is " + view.score)
    $("#score").text(view.score)
  }
}


var controller = {

  timer: null,
  isGameOver: false,

  init: function () {
    modelGrid.init();
    view.init();
    controller.setCallbacks();
  },

  setCallbacks: function () {
    $(window).keydown(controller.moveSnake);
    $(document).on("click", "#play-again", function(){
          location.reload();
    });
  },

  nextSquare: function(code) {

    var headSquareNumber = modelSnake.body[0];
    switch(code){
      case 37:
      return headSquareNumber - 1;

      case 38:
      return headSquareNumber - modelGrid.boardWidth;

      case 39:
      return headSquareNumber + 1;

      case 40:
      return headSquareNumber + modelGrid.boardWidth;

      default:
      console.log("use arrows only")
      return null;

    }
  },

  validKey: function(code) {
    var result = $.inArray(code, [37,38,39,40])
    if (result == -1) {
      return false;
    } else {
      return true;
    }
  },

  moveSnake: function(event) {

    if (controller.validKey(event.keyCode)) {
      view.currentDirection = event.keyCode;
      var targetSquareNumber = controller.nextSquare(view.currentDirection);
      controller.modifySnake(targetSquareNumber);
    };

  },

  modifySnake: function(targetSquareNumber) {
    if ($('#' + targetSquareNumber).hasClass("border") || $('#' + targetSquareNumber).hasClass("snake")){
      controller.gameOver();
    } else {
      var foundFood = modelSnake.checkForFood(targetSquareNumber);
      modelSnake.body.unshift(targetSquareNumber);
      $('#' + targetSquareNumber).addClass("snake");
      if (foundFood) {
        view.updateScore();
      } else {
        var tail = modelSnake.body.pop();
        $('#' + tail).removeClass("snake");
      }
    }
    controller.autoMove();
  },

  autoMove: function() {
    if (view.currentDirection && !controller.isGameOver){
      var speed = 800 - view.score * 50;
      if (speed < 150) speed = 150;

      clearTimeout(controller.timer);
      controller.timer = setTimeout(function(){
        controller.modifySnake(controller.nextSquare(view.currentDirection))
      }, speed);
    }
    console.log("It moves automatically");
  },

  gameOver: function() {
    controller.isGameOver = true;
    clearTimeout(controller.timer);
    $("#play-again").removeClass("hidden");
    $(window).off();
    alert("Your final score was " + view.score + "! Play again soon!");
  },

  placeSnake: function() {
    do {
      var numberOfsquare = Math.ceil(Math.random()*400);
    } while($('#' + numberOfsquare).hasClass("border"))

    $('#' + numberOfsquare).addClass("snake");
    modelSnake.body.push(numberOfsquare);
  },

  placeFood: function() {
    do{
      var numberOfsquare = Math.ceil(Math.random()*400);
    } while($('#' + numberOfsquare).hasClass("snake") || $('#' + numberOfsquare).hasClass("border"))

    $('#' + numberOfsquare).addClass("glyphicon-apple food");
  }
}

// $(document).ready(function() {})
$(function() {
  console.log( "ready!" );
  controller.init();
});