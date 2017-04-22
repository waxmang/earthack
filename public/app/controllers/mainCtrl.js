angular.module('mainCtrl',[])

.controller('mainController',['$scope','$http','$location', function($scope,$http,$location){

	var vm = this;

	//run function automatically when page is loaded
	angular.element(document).ready(function(){
		$scope.getUser();
		//$scope.updateUser();
	});

	$scope.loggedIn = false;
	$scope.showUpdateForm = false;

	var checkLoggedIn = function() {
        $http.get('/api/user').then(function(data) {
            var loginState = data['data']['id'];
            if (loginState) {
                $scope.loggedIn = true;
            } else {
                $scope.loggedIn = false;
            }
        });
    };

    vm.loggedIn = checkLoggedIn();

	//check if logged in user is restaurant
	$scope.user = {}; //includes name, entity name, etc.
	$scope.entries = [];

	$scope.updateUser = function(){
		$http.get('/api/user').then(function(data){
			// set the user

            var loginState = data['data']['id'];
            if (loginState) {
				$scope.user = data['data'];

				console.log($scope.user.id);
				$http.put('/api/user/' + $scope.user.id, { userType: "Restaurant" }).then(function(data){
					//refresh user
					$scope.getUser();
				});
            }
		});
	};

	$scope.getUser = function(){
		$http.get('/api/user').then(function(data){
			$scope.user = data['data'];
			$scope.showUpdateForm = data['data']['location'] == null;
		})
	}
}] );
