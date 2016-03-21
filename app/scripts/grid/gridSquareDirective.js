'use strict';

angular.module('whackamoleApp')
.directive('gridSquare', function(){
	return {
		restrict: 'E',
		scope: {
			cell: '=',
			gameStarted: '='
		},
		transclude:true,
		templateUrl: 'scripts/grid/gridSquare.html',
		controller: ['$scope', function($scope) {

			$scope.handleWhack = function(){
				$scope.$emit('whackClick', $scope.cell.idx);
			};
		}]
	};
});