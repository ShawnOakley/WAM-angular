'use strict';

/**
 * @ngdoc function
 * @name whackamoleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the whackamoleApp
 */
angular.module('whackamoleApp')
  .controller('MainCtrl', ['$scope','$interval','$timeout', '_',  function($scope, $interval, $timeout, _) {

  	$scope.score=0;
  	$scope.bestScore = 0;
  	$scope.gameStarted=false;

  $scope.alerts = [
    { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
    { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
  ];

  	$scope.cancelGame = function(){
		$interval.cancel($scope.popUpInterval);
		$scope.targettedSquareIdx = null;
		$scope.calculateBestScore();
		$scope.gameStarted=false;
		$scope.score = 0;
  	};

  	$scope.calculateBestScore = function(){
  		if ($scope.score > $scope.bestScore) {
  			$scope.bestScore = $scope.score;
  		}
  	};

  	$scope.clearBestScore = function(){
  		$scope.bestScore = 0;
  	};

 	$scope.createSquare = function(position){
		var gridSquare = {};
		gridSquare.idx = position;
		gridSquare.transitioning=false;
		gridSquare.displayingMole=false;
		gridSquare.whacked=false;
		return gridSquare;
	};
    $scope.generateBoard = function() {
    	$scope.grid = [];
    	for (var i = 0; i<9; i++) {
    			$scope.grid.push($scope.createSquare(i));
    	}
    };
// https://stackoverflow.com/questions/14502006/working-with-scope-emit-and-on
    $scope.$on('whackClick', function(whackClickEvent, whackedSquarePosition){
    	 $scope.grid[whackedSquarePosition].whacked=true;
		 $timeout.cancel($scope.moleDisplayTimeout);
		 $timeout(function(){
	    	 _.each($scope.targettedSquares, function(squareIdx){

		    	if (whackedSquarePosition === squareIdx) {
		    		$scope.score += 1;
		    	}
	    	});
	    	for (var i = 0; i<$scope.grid.length; i++) {
		    	$scope.grid[i].transitioning=false;
				$scope.grid[i].displayingMole=false;
				$scope.grid[i].whacked=false;
			}
    	}, 250);
    });

    $scope.getRandomIntInclusive = function(min, max) {
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	};

	// Removes selected index so there are no duplicate squares selected
	function removeSelectedIndex(){
		var targetArray = [];
		for (var i=0; i<9;i++) {
			targetArray.push(i);
		}
		return _.filter(targetArray, function(idx){
			return idx !== $scope.targettedSquareIdx;
		});
	}

	function generateSecondTargetedIndex(possibleTargets){
		var finalIndex = possibleTargets.length - 1;
		var randomIdx = $scope.getRandomIntInclusive(0,finalIndex);
		return possibleTargets[randomIdx];
	}

    $scope.startGame = function(gameDuration){
    	$scope.gameStarted=true;
    	// https://stackoverflow.com/questions/21364480/in-angular-how-to-use-cancel-an-interval-on-user-events-like-page-change
    	$scope.popUpInterval = $interval(function(){
    		$scope.targettedSquares = [];
    		$scope.targettedSquareIdx = $scope.getRandomIntInclusive(0,8);
    		$scope.targettedSquares.push($scope.targettedSquareIdx);
    		var possibleSecondTargets = removeSelectedIndex($scope.targettedSquareIdx);
    		var secondTarget = generateSecondTargetedIndex(possibleSecondTargets);
    		$scope.targettedSquares.push(secondTarget);
   			_.each($scope.targettedSquares, function(squareIdx){
				$scope.grid[squareIdx].transitioning = true;
			});
    		// Need to catch the timeouts on the scope to cancel it in case of a successful hit
    		$scope.moleDisplayTimeout = $timeout(function(){
    			_.each($scope.targettedSquares, function(squareIdx){
    				$scope.grid[squareIdx].transitioning = false;
	    			$scope.grid[squareIdx].displayingMole = true;
    			});
    			$scope.moleDisplayTimeout = $timeout(function(){
    				_.each($scope.targettedSquares, function(squareIdx){
    					$scope.grid[squareIdx].displayingMole = false;
	    				$scope.grid[squareIdx].transitioning = true;
    				});
    				$scope.moleDisplayTimeout = $timeout(function(){
    					_.each($scope.targettedSquares, function(squareIdx){
	    					$scope.grid[squareIdx].whacked = false;
	    					$scope.grid[squareIdx].transitioning = false;
    					});
    					$scope.targettedSquares = [];
    				}, 200);
    			},500);
    		},250);
    	}, 1000);

    	$timeout(function(){
    		$interval.cancel($scope.popUpInterval);
    		$scope.targettedSquareIdx = null;
    		$scope.calculateBestScore();
    		$scope.gameStarted=false;
    		$scope.score = 0;
    	}, gameDuration);
    };
    $scope.generateBoard();
  }]);
