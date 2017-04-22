angular.module('restaurantCtrl',[])

.controller('restaurantController',['$scope','$http','$location', function($scope, $http, $location){

	$scope.user = "Max";
	$scope.allEntries = [];

}]);
