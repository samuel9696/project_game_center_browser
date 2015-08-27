var modelSnake = {

  init: function () {

    },

  body: [],

  checkForFood: function (target) {
    if ($("#" + target).hasClass("red-bg")) {
      $("#" + target).removeClass("red-bg")
      controller.placeFood();
      return true;
    } else {
      return false;
    }
  }

}

var modelGrid = {

  init: function(){
    modelGrid.buildGrid()
  },


  buildGrid: function(){
    var size = 20;
    $('#board-container').append('<table> </table>');
    for(var i=0; i<size;i++){
      $('table').append('<tr></tr>')
      for(var j=1; j<size+1;j++){
         $('tr').last().append('<td></td>')
         $('tr td').last().attr("id",j+20*i-1).text(j+20*i-1)
         if (i==0 || j==1 || i == size-1 || j == size){
          $('tr td').last().addClass("border").text("");
         }
      }
    }
  }


}
var view = {

  score: 0,

  currentDirection: null,

  init: function(){
    console.log("view init")
    controller.placeSnake();
    controller.placeFood();
  },

  updateScore: function() {
    $("#score").text(modelSnake.body.length - 1)
  }
}


var controller = {
  init: function(){
    modelGrid.init();
    view.init();
    controller.setCallbacks();
  },

  setCallbacks: function(){
    //$(window).on("keydown","td",controller.moveSnake);
    $(window).keydown(controller.moveSnake);
  },

  moveSnake: function(event){
    var headSquareNumber = modelSnake.body[0];
      switch(event.keyCode){
        case 37:
          var targetSquareNumber = headSquareNumber-1;
          break;

        case 38:
          var targetSquareNumber = headSquareNumber-20;
          break;

        case 39:
          var targetSquareNumber = headSquareNumber+1;
          break;

        case 40:
          var targetSquareNumber = headSquareNumber+20;
          break;

        default:
          // alert("use arrows only");
          return;

      }

      if ($('#' + targetSquareNumber).hasClass("border") || $('#' + targetSquareNumber).css("background-color") == "rgb(0, 0, 0)"){
        controller.gameOver();
      } else {
        var flag = modelSnake.checkForFood(targetSquareNumber);
        modelSnake.body.unshift(targetSquareNumber);
        $('#' + targetSquareNumber).css("background-color","black");
        if (!flag) {
          var tail = modelSnake.body.pop();
          $('#' + tail).css("background-color","white");
        }
      }
    view.currentDirection = event.keyCode;
    //37-left 38-up 39-right 40-down
    view.updateScore();

    setTimeout(function() {
      controller.simulateMove();
    }, 1000);

  },

  simulateMove: function() {
    console.log("here");
    var e = jQuery.Event("keydown");
    console.log(e);
    e.which = view.currentDirection;
    $(window).trigger(e);
  },

  gameOver: function() {
    alert("Sorry you lost!");
    $(window).off();
  },

  placeSnake: function(){
    do {
      var numberOfsquare = Math.ceil(Math.random()*400);
    } while($('#' + numberOfsquare).hasClass("border"))
    $('#' + numberOfsquare).css("background-color", "black");
    modelSnake.body.push(numberOfsquare);
  },

  placeFood: function(){
    do{
      var numberOfsquare = Math.ceil(Math.random()*400);
    } while($('#' + numberOfsquare).hasClass("red-bg") || $('#' + numberOfsquare).hasClass("border"))

    $('tr td').eq(numberOfsquare).addClass("red-bg");
  }
}

controller.init();