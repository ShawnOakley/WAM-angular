'use strict';

/**
 * @ngdoc function
 * @name whackamoleApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the whackamoleApp
 */
angular.module('whackamoleApp')
  .controller('MainCtrl', ['$scope','$interval','$timeout',  function($scope, $interval, $timeout) {

  	$scope.score=0;
  	$scope.bestScore = 0;

  	$scope.calculateBestScore = function(){
  		if ($scope.score > $scope.bestScore) {
  			$scope.bestScore = $scope.score;
  		}
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
    			// Unfortunately need idx 
    			$scope.grid.push($scope.createSquare(i));
    	}
    };
// https://stackoverflow.com/questions/14502006/working-with-scope-emit-and-on
    $scope.$on('whackClick', function(whackClickEvent, whackedSquarePosition){
    	if (whackedSquarePosition === $scope.targettedSquareIdx) {
    		$scope.score += 1;
    	}
    	$scope.grid[whackedSquarePosition].whacked=true;
    	$timeout.cancel($scope.moleDisplayTimeout);
    	$timeout(function(){
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

    $scope.startGame = function(gameDuration){
    	// https://stackoverflow.com/questions/21364480/in-angular-how-to-use-cancel-an-interval-on-user-events-like-page-change
    	var popUpInterval = $interval(function(){
    		$scope.targettedSquareIdx = $scope.getRandomIntInclusive(0,8);
    		$scope.grid[$scope.targettedSquareIdx].transitioning = true;
    		// Need to catch the timeouts on the scope to cancel it in case of a successful hit
    		$scope.moleDisplayTimeout = $timeout(function(){
    			$scope.grid[$scope.targettedSquareIdx].transitioning = false;
    			$scope.grid[$scope.targettedSquareIdx].displayingMole = true;
    			$scope.moleDisplayTimeout = $timeout(function(){
    				$scope.grid[$scope.targettedSquareIdx].displayingMole = false;
    				$scope.grid[$scope.targettedSquareIdx].transitioning = true;
    				$scope.moleDisplayTimeout = $timeout(function(){
    					$scope.grid[$scope.targettedSquareIdx].transitioning = false;
    				}, 250);
    			},500);
    		},250);
    		$timeout(function(){
    			$scope.grid[$scope.targettedSquareIdx].transitioning = false;
    			$scope.grid[$scope.targettedSquareIdx].displayingMole = true;
    		},250);
    	}, 1000);

    	$timeout(function(){
    		$interval.cancel(popUpInterval);
    		$scope.targettedSquareIdx = null;
    		$scope.calculateBestScore();
    		$scope.score = 0;
    	}, gameDuration);
    };
    $scope.generateBoard();
    $scope.startGame(10000);
  }]);
