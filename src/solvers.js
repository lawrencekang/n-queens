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


// window.findSolution = function(board, n, row, validator, callback){
//   if(row === n){
//     callback();
//     return;
//   }

//   for(var i = 0; i < n; i ++){
//     board.togglePiece(row, i);
//     if(!board[validator]()){
//       findSolution(row+1);
//     }
//     board.togglePiece(row, i);
//   }
// };

window.findNRooksSolution = function(n) {
  //create an empty board using new Board
  var board = new Board({n:n});
  var boardArray =  board.rows();
  //iterate through each row
  for (var i = 0; i < n; i ++) {
    var row = boardArray[i];
    for (var j = 0; j < row.length; j ++){
      //use togglePiece method to add a rook at position
      board.togglePiece(i,j);
      //check if there are any rookConflicts
      if( board.hasAnyRooksConflicts()){
      //if there's a conflict, togglePiece again
        board.togglePiece(i,j);
      //if no conflict - don't do anything (move on to next position
      }
    }
  }
  var solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n:n});

  var findSolution = function(row){
    if(row === n){
      solutionCount++;
      return;
    }

    for(var i = 0; i < n; i++){
      board.togglePiece(row, i);
      if( !board.hasAnyRooksConflicts() ){
        findSolution(row+1);
      }
      board.togglePiece(row, i);
    }
  };

  findSolution(0);
  // return findSolution(board, n, 0, "hasAnyRooksConflicts",function(){ return solutionCount++});
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};


// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  //create an empty board using new Board
  var board = new Board({n:n});
  var boardArray =  board.rows();
  //iterate through each row
  for (var i = 0; i < n; i ++) {
    var row = boardArray[i];
    for (var j = 0; j < row.length; j ++){
      //use togglePiece method to add a queen at position
      board.togglePiece(i,j);
      //check if there are any rookConflicts
      if( board.hasAnyQueensConflicts()){
      //if there's a conflict, togglePiece again
        board.togglePiece(i,j);
      //if no conflict - don't do anything (move on to next position
      }
    }
  }

  var solution = board.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var _board2 = new Board({n:n});

  var findSolution = function(rowI){
    if(rowI === n){
      solutionCount++;
      return;
    }

    for(var i = 0; i < n; i++){
      _board2.togglePiece(rowI, i);
      if(!_board2.hasAnyQueensConflicts()){
        findSolution(rowI+1);
      }
      _board2.togglePiece(rowI, i);
    }
  };

  findSolution(0);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
