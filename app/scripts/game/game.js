// Features handled by the GameManager
// 1) Creating new game
// 2) Handling game loop/whack action
// 3) Updating score
// 4) Ending game

'use strict';

angular.module('Game', [])
.service('GameManager', function() {
	// Creates new game
	this.newGame = function(){};
	// Handles the mole appearance action
	this.appear = function(){};
	// Handles the whack action
	this.whack = function(){};
	// Handles the mole disappearance action
	this.disappear = function(){};
	// Handle the move action -- unnecessary
	this.move = function(){};
	// Updates the score
	this.updateScore = function(){};
	// Are there moves left? -- unnecessary
	this.movesAvailable = function() {
		// return GridService.anyCellsAvailable() || 
  //           GridService.tileMatchesAvailable();
	};
	// Is there any time left to whack?
	this.whacksAvailable = function() {
		// return TimerService.anyTimeLeft();
	};
});