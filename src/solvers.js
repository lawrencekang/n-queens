/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findNRooksSolution = function(n) {
  //create an empty board using new Board
  var board1 = new Board({n:n});
  // debugger;
  var board1Array = board1.rows();
    //iterate through each row
  for (var i = 0; i < n; i ++) {
    var row = board1Array[i];
    for (var j = 0; j < row.length; j ++){
      board1.togglePiece(i,j);
      if (board1.hasAnyRooksConflicts()){
        board1.togglePiece(i,j);
      }
    }
  }
      //use togglePiece method to add a rook at position
        //check if there are any rookConflicts
          //if there's a conflict, togglePiece again
          //if no conflict - don't do anything (move on to next position)

  var solution = board1.rows(); //fixme

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var _board1 = new Board({n:n});
  var board1Array = board1.rows();
    //iterate through each row

//recursive function that checks a row against the board to see if there are any conflicts
  var recursor = function(row){
    for(var i = 0; i < row.length; i++){
      row[i]
      var check = _board1.hasAnyRooksConflicts();
      if(!check){
        _board1.togglePiece(row,i);
      }
    }
  };

// take the first row and iterate
// set each column Index in first row to 1
// iterate next row (recursive?)
//
  var row1 = board1Array[0];
  for (var i = 0; i < n; i ++) {
    var row1[i] = 1;
    for (var j = 0; j < n; j ++){
      board1.togglePiece(i,j);
      if (board1.hasAnyRooksConflicts()){
        board1.togglePiece(i,j);
      }
    }
  }




  //create empty nxn board
  /*var _board1 = new Board({n:n});
  var board1Array = board1.rows();
  //iterate through first row
    //set each column index to 1
      //iterate through next row
        //
  var row = board1Array[0];
  for (var i = 0; i < n; i ++) {
    row[i] = 1;
    for (var j = 1, j < n; j ++) {

    }
  }
  var recurseRooks = function(rowIndex){
    for ( var i = 0; i < n ; i ++ ) {
    var row = board1Array[i];
      recurseRooks(rowIndex)
  }
    }
  }
*/
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
