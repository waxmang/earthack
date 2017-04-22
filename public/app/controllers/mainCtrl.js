angular.module('mainCtrl',[])

.controller('mainController',['$scope','$http','$location', function($scope,$http,$location){
	//run function automatically when page is loaded
	angular.element(document).ready(function(){
		$scope.checkLoggedIn();
		$scope.getUser();
		$scope.updateUser();
	});

	//check log in
	$scope.checkLoggedIn = function(){
		$http.get('/api/user').then(function(data){
			if (data['data'] != null) {
				return true;
			} else {
				return false;
			}
		});
	};


	//check if logged in user is restaurant
	$scope.user = {}; //includes name, entity name, etc.
	$scope.entries = [];

	$scope.updateUser = function(){
		console.log($scope.user.id);
		$http.put('/api/user/' + $scope.user.id, {userType: "Restaurant"}).then(function(data){
			//refresh user
			$scope.getUser();
		});
	};

	$scope.getUser = function(){
		$http.get('/api/user').then(function(data){
			$scope.user=data['data'];
		})
	}
}] );