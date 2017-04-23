angular.module('mainCtrl',[])

.controller('mainController',['$scope','$http','$location', function($scope,$http,$location){

	var vm = this;

	//run function automatically when page is loaded
	angular.element(document).ready(function(){
		$scope.getUser();
		$scope.getAllEntries()
		$scope.getEntriesForAllUsers()
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
	$scope.entries = [{ }];
	$scope.entry = {}; // entry to be added to the database
	$scope.entityInfo = {};
	
	$scope.updateUser = function(){
		$http.get('/api/user').then(function(data){
			// set the user

            var loginState = data['data']['id'];
            if (loginState) {
				$scope.user = data['data'];

				$http.put('/api/user/' + $scope.user.id, { userType: $scope.entityInfo.userType, location: $scope.entityInfo.location, entityName: $scope.entityInfo.entityName }).then(function(data){
					//refresh user
					$scope.getUser();
				});
            }
		});
	};
	
	$scope.getUser = function(){
		$http.get('/api/user').then(function(data){
			$scope.user = data['data'];
			$scope.showUpdateForm = data['data']['location'] == null || data['data']['userType']==null||data['data']['entityName']==null;
		})
	};
	
	// save new entries to the database
	$scope.saveEntries = function() {
		for (var i = 0; i < $scope.entries.length; i++) {
			$http.post('/api/user/' + $scope.user.id + '/entries', { restaurant_id: $scope.user.id, food_item: $scope.entries[i].food_item, 
				amount:$scope.entries[i].amount,status:'Available' }).then(function (data) {
				$scope.entries = [];
				$scope.isFormOpen = false;
			});
		}
	};
	
	$scope.addEntry = function() {
    	$scope.entries.push({});
	};
	
	// remove entry from the database
	$scope.deleteEntry = function() {
		$http.delete('/api/user/'+$scope.user.id+'/entries/'+$scope.entry._id).then(function(data) {
			
		});
	};
	
	$scope.removeEntry = function() {
		var lastItem = $scope.entries.length-1;
    	$scope.entries.splice(lastItem);
	};
	
	$scope.getEntriesForAllUsers = function(){
		$http.get('/api/allEntries').then(function(data){
			$scope.entries = data['data']
		});
	}
	
	$scope.getAllEntries = function() {
		$http.get('/api/user').then(function(data){
			$scope.user = data['data'];
		
			$http.get('/api/user/'+$scope.user.id+'/entries/').then(function(data){
				$scope.user.entries = data['data']
			});
		});
		
	};
}]);
