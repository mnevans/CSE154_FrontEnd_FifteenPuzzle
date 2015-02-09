// Morgan Evans, CSE 154 AL, Homework 8
// This page is the JavaScript file that controls the 15 puzzle game.

"use strict";

(function() {

  window.addEventListener("load", load);
  var rows_columns = 4;
  var empty_x = 3;
  var empty_y = 3;

  // Calls these functions upon the loading of the page 
  function load() {
    drawPuzzle();
    document.getElementById("shufflebutton").onclick = shuffle;
  }

  // Creates the puzzle and tiles with their respective numbers and images
  function drawPuzzle() {
    var num = 1;
    for (var i = 0; i < rows_columns; i++) {
      for (var j = 0; j < rows_columns; j++) {
        var tile = document.createElement("div");
        tile.classList.add("puzzlepiece");
        tile.style.left = 100 * j + "px";
        tile.style.top = 100 * i + "px"; 
        tile.style.backgroundPosition = (0 - 100 * j) + "px" + " " + (0 - 100 * i) + "px";
        tile.setAttribute("id", "square" + "_" + j + "_" + i);
        tile.innerHTML = num++;
        tile.onmouseover = highlight;
        tile.onmouseout = unhighlight;
        tile.onclick = tileClick;
        if (i != 3 || j != 3) { 
          document.getElementById("puzzlearea").appendChild(tile);
        }
      }
    }
  }

  // Checks if a chosen tile is next to the empty one
  function validMove(tile) { 
    var neighbors = getNeighbors();
    if (neighbors.indexOf(tile.getAttribute("id")) != -1) {
      return true;
    } else {
      return false;
    }
  }

  // Highlights the selected tile on mouseover if it's moveable
  function highlight() {
    if (validMove(this)) {
      this.classList.add("highlight");
    }
  }

  // Unhighlights the moveable, selected tile upon removal of the mouse
  function unhighlight() {
    if (validMove(this)) {
      this.classList.remove("highlight");
    }
  }

  // Helper function to pass clicked tile to moveTiles
  function tileClick(){
    moveTiles(this);
  }

  // Swaps the selected tile if it's moveable with the empty tile
  function moveTiles(tile) {
    var tempEX = empty_x;
    var tempEY = empty_y;
    if (validMove(tile)) {
      empty_x = parseInt(tile.style.left) / 100; 
      empty_y = parseInt(tile.style.top) / 100;
      tile.style.top = 100 * tempEY + "px";
      tile.style.left = 100 * tempEX + "px";
      tile.setAttribute("id", "square_" + tempEX + "_" + tempEY);
    }
  }

  // Shuffles the puzzle and places tiles randomly  
  function shuffle() {   
    for (var i = 0; i < 1000; i++) {
      var neighbors = getNeighbors();
      var rand = parseInt(Math.random() * neighbors.length);
      var tile = document.getElementById(neighbors[rand]);
      moveTiles(tile);
    }
  }

  // Checks tiles around selected tile to see if they're empty 
  function getNeighbors() {
    var up = "square_" + empty_x + "_" + (empty_y - 1);
    var down = "square_" + empty_x + "_" + (empty_y + 1);
    var left = "square_" + (empty_x - 1) + "_" + empty_y;
    var right = "square_" + (empty_x + 1) + "_" + empty_y;

    var tiles = [up, down, left, right];
    var realTiles = [];

    for (var i = 0; i < tiles.length; i++) {
      if (document.getElementById(tiles[i]) != null) {
        realTiles.push(tiles[i]);
      }
    }
    return realTiles;
  }

})();
