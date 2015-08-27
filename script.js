var modelSnake = {

  init: function(){

    },

  body: []

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
  init: function(){
    console.log("view init")
    controller.placeSnake();
    controller.placeFood();
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

  moveSnake: function(){
    var headSquareNumber = modelSnake.body[0].attr("id");

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

      }
      if ($('tr td').eq(targetSquareNumber).css("class") == "border" ){
        controller.gameOver();
      } else {
        modelSnake.body.unshift(targetSquareNumber);
          $('tr td').eq(targetSquareNumber).css("background-color","black");
        var tail = modelSnake.body.pop();
        $('tr td').eq(tail).css("background-color","white");
      }

    //37-left 38-up 39-right 40-down

  },

  placeSnake: function(){
    console.log("snake placed")
    var numberOfsquare = Math.ceil(Math.random()*400);
    console.log(numberOfsquare)
    $('tr td').eq(numberOfsquare).css("background-color", "black");
    console.log($('tr td').eq(numberOfsquare).css("background-color"))
    modelSnake.body.push(numberOfsquare);
    console.log(modelSnake.body)
  },

  placeFood: function(){
    do{
      var numberOfsquare = Math.ceil(Math.random()*400);
    }while($('tr td').eq(numberOfsquare).css("background-color") === "rgb(0, 0, 0)")

    $('tr td').eq(numberOfsquare).css("background-color", "red");
  }
}

controller.init();