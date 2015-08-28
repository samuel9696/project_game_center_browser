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
        tableString += "<td class = 'available' id = '" + idNum.toString() + "'>"  + "</td>"
      }
      tableString += "</tr>"
    }
    tableString += "</tbody></table>"
    $('#board-container').append(tableString);
    modelGrid.assignSpecialSquares();
  },


  assignSpecialSquares: function() {
    modelGrid.buildRedSquares();
    modelGrid.buildLightBlueSquares();
    modelGrid.buildDarkBlueSquares();
    modelGrid.buildPinkSquares();
    modelGrid.buildStarSquare();
  },

  buildRedSquares: function() {
    var red = [0,7,14,105,119,210,217,224];
    for(var i=0; i<red.length;i++){
      $('#'+red[i]).addClass('x3ws').text('3x\nWS')
    }
  },

  buildLightBlueSquares: function(){
    var blight = [3,11,36,38,45,52,59,92,96,98,102,108,116,122,126,128,132,165,172,179,186,188,213,221];
    for(var i=0; i<blight.length;i++){
      $('#'+blight[i]).addClass('x2ls').text('2x\nLS')
    }
  },

  buildDarkBlueSquares: function(){
    var dlight = [20,24,76,80,84,88,136,140,144,148,200,204];
    for(var i=0; i<dlight.length;i++){
      $('#'+dlight[i]).addClass('x3ls').text('3x\nLS')
    }
  },

  buildPinkSquares: function(){
    var pink = [16,32,48,64,28,42,56,70,154,160,168,176,182,192,196,208];
    for(var i=0; i<pink.length;i++){
      $('#'+pink[i]).addClass('x2ws').text('2x\nWS')
    }
  },

  buildStarSquare: function(){
    $('#'+112).addClass('star glyphicon glyphicon-star')
  }

}

var modelTiles = {
  init: function(){
    modelTiles.setBagOfTiles();
    modelTiles.setPlayersTiles();
  },

  attemptedTiles: [],
  tiles: 100,
  bagoftiles: {},
  points: {},
  abc: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],

  setBagOfTiles: function(){
    var amountOfabc = [9, 2, 2, 4, 12, 2, 3, 2, 9, 1, 1, 4, 2, 6, 8, 2, 1, 6, 4, 6, 4, 2, 2, 1, 2, 1];
    var pointOfabc = [1, 3, 3, 2, 1, 4, 2, 4, 1, 8, 5, 1, 3, 1, 1, 3, 10, 1, 1, 1, 1, 4, 4, 8, 4, 10]
    for(i=0; i < modelTiles.abc.length; i++){
      modelTiles.bagoftiles[modelTiles.abc[i]] = amountOfabc[i];
      modelTiles.points[modelTiles.abc[i]] = pointOfabc[i];
    }
    modelTiles.bagoftiles["blank"]=2;
  },

  player1Tiles : [],
  player2Tiles : [],

  setPlayersTiles: function(){
    var randLetter = ""
    for(i=0;i<7;i++){

      do{
        randLetter = modelTiles.abc[Math.floor(Math.random()*26)]
      } while(modelTiles.bagoftiles[randLetter]<0)

      modelTiles.player1Tiles.push(randLetter)
      modelTiles.bagoftiles[randLetter] -=1
      do{
        randLetter = modelTiles.abc[Math.floor(Math.random()*26)]
      } while(modelTiles.bagoftiles[randLetter]<0)
      modelTiles.bagoftiles[randLetter] -=1
      modelTiles.player2Tiles.push(randLetter)
    }
  },

  isValidMove: function() {
    modelTiles.attemptedTiles.sort();
    // for (var i = 0; i < modelTiles.attemptedTiles.length - 1; i++) {
    //   if (modelTiles.attemptedTiles[i].hasANeighbor) {

    //   };
    // };

  }
}

var view = {

  activeTile: null,
  currentBoardTile: null,

  showPlayerTiles: function(){
    var p1tilesString = "";
    var p2tilesString = "";
    for (var i = 0; i < modelTiles.player1Tiles.length; i++) {
      p1tilesString += "<div class = 'tile btn btn-primary btn-lg'>" + modelTiles.player1Tiles[i] + "</div>";
    };
    $("#player1-tiles").append(p1tilesString);

    for (var i = 0; i < modelTiles.player2Tiles.length; i++) {
      p2tilesString += "<div class = 'tile btn btn-default btn-lg disabled'>" + "-" +"</div>";
    };
    $("#player2-tiles").append(p2tilesString);
  },

  switchTile:  function(){

  },

  setTile: function() {
    view.activeTile = event.target;

    if ($(view.activeTile).hasClass("activeTile")){
      $(view.activeTile).removeClass("activeTile");
      view.activeTile = null;
    } else {
      $(view.activeTile).addClass("activeTile");
    }
    console.log(view.activeTile);
  },

  placeTile: function() {
    if (view.activeTile) {
      var setTile = $(view.activeTile)
      var player = setTile.parent().attr("id");
      view.currentBoardTile.text(setTile.text());
      modelTiles.attemptedTiles.push(setTile.attr("id"));
      view.currentBoardTile.removeClass("available")
      setTile.addClass("disabled");
      view.activeTile = null;
      //view.addNewTiletoSet(player);
    };
  },

  removeTile: function() {
    var text = view.currentBoardTile.addClass("available").text();
    view.currentBoardTile.text("");
    $(".tile:contains('" + text + "')").first().removeClass("disabled activeTile");
  },

  checkTile: function(){
    console.log($(event.target))
    view.currentBoardTile = $(event.target)
    if ( view.currentBoardTile.hasClass("available")){
      view.placeTile();
    } else if (!view.currentBoardTile.hasClass("fixed")) {
      view.removeTile();
    } else {
      console.log("You can't place letter here.");
    }
  },
  checkRestabs: function(){

    for(letter in modelTiles.bagoftiles){
      if (modelTiles.bagoftiles[letter] !== 0) return true;
    }
    return false;
  },

  addNewTiletoSet: function(targetclass){
    do{
      var randLetter = modelTiles.abc[Math.floor(Math.random()*26)]
    } while(modelTiles.bagoftiles[randLetter]<0 && modelTiles.checkRestabs);
    var str = "<div class = 'tile btn btn-primary btn-lg'>" + randLetter + "</div>";

    switch(targetclass) {
      case "player1-tiles":
        $("#player1-tiles").append(str)
        break;

      case "player2-tiles":
        $("#player2-tiles").append(str)
        break;
      }
  },
  makeTurn: function(){
    modelTiles.isValidMove();
    switchplayers();
  }
}

var controller = {
  init: function() {
    modelGrid.init();
    modelTiles.init();
    view.showPlayerTiles();
    controller.setCallbacks();
  },

  setCallbacks: function () {
    $(document).on("click", ".tile.btn-primary", view.setTile);
    $(document).on("click", "#board-container", view.checkTile);
    $(document).on("click", "#play-again", function(){
          location.reload();
    });
    $(document).on("click", "#take-turn", view.makeTurn);
  }
}

$(document).ready(function () {
  controller.init();
})



