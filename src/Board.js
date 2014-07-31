// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;','color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var _board = this.rows();
      var _row = _board[rowIndex];
      var count = 0;
      for (var i = 0; i < _row.length; i++) {
        if (_row[i] === 1) {
          count++;
        }
      }
      if (count > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var _board = this.rows();
      var result = false;
      for(var i=0; i<_board.length; i++){
        result = this.hasRowConflictAt(i);
        // debugger;
        if (result === true) {
          return true;
        }
      }


      //iterate through the board

        //pass in each row into hasRowConflictAt
        //return result
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      //
      var _board = this.rows();
      var count = 0;
      for(var i = 0; i<_board.length; i++){
        var row = _board[i];
        if(row[colIndex]===1){
          count++;
        }
      }
      if(count > 1){
        return true;
      }
      //iterate through the board to get each row, e.g. _board[i]
        //within each row, check the first index (column) to see if value = 1
          //if more than 1 (value = 1) exists in column, return true
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var _board = this.rows();
      var result = false;
      for(var i = 0; i< _board.length; i++){
        result = this.hasColConflictAt(i);
        if(result === true){
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      //loop through the entire board
      var _board = this.rows();
      var counter = 0;
      for (var i = 0; i < _board.length; i ++) {
        var _row = _board[i];
        for (var j = 0; j < _row.length; j ++) {
          var majIndex = this._getFirstRowColumnIndexForMajorDiagonalOn(i, j);
          if(majIndex === majorDiagonalColumnIndexAtFirstRow) {
            if (_row[j] === 1) {
              counter ++;
            }
          }
        }
      }
      if (counter > 1) {
        return true;
      }
      //check _getMajorDiagonalColumnIndexAtFirstRow for each position
        //if _getMajorIndex matches targetIndex
          //check if value at that location = 1
          //if yes, counter ++
      //if counter is > 1, return true
        //else return false
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      // find length of board
      var _board = this.rows();
      var length = _board.length;
      var result = false;
      for(var i = -length + 1; i<length; i++){
        result = this.hasMajorDiagonalConflictAt(i);
        if(result === true){
          return true;
        }
      }

      // iterate through - board to board
      // run the majorConflictAt method -board to board
      // if true, return true
      // else return false
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      //two for loops
      var counter = 0;
      var _board = this.rows();
      //iterate through each row
      for (var i = 0; i < _board.length; i ++) {
        //within each row, iterate through the columns
        var _row = _board[i];
        for (var j = 0; j < _row.length; j ++) {
          //pass in row and column to _getMinorIndex
          var minIndex = this._getFirstRowColumnIndexForMinorDiagonalOn(i, j);
          //compare to minorTargetIndex
          if (minIndex === minorDiagonalColumnIndexAtFirstRow) {
            //if current _getMinorIndex === minorTargetindex, then check if current value = 1
            if (_row[j] === 1) {
              //if true, add to counter
              counter ++;
            }
          }
        }
      }
      //if counter > 1 return true
      if (counter > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var _board = this.rows();
      var length = _board.length - 1;
      var result = false;
      //iterating through minor diagonals
      for (var i = 0; i <= 2 * length; i ++) {
        result = this.hasMinorDiagonalConflictAt(i);
        if (result === true){
          return result;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
