angular.module('mainCtrl', ['uiGmapgoogle-maps'])

.config(function(uiGmapGoogleMapApiProvider) {
	uiGmapGoogleMapApiProvider.configure({
		key: 'AIzaSyA49SaLCsV4ytd_YSkJQfWcNSW6YrW-u0E',
		v: '3.20', //defaults to latest 3.X anyhow
		libraries: 'weather,geometry,visualization'
	});
})

.controller('mainController', ['$scope', '$http', '$location', function($scope, $http, $location, uiGmapGoogleMapApi, uiGmapGoogleMapApiProvider) {

	var vm = this;

	//run function automatically when page is loaded
	angular.element(document).ready(function() {
		$scope.getUser();
		$scope.getAllEntries()
		$scope.getEntriesForAllUsers()
		$scope.createAllMarkers();
	});

	$scope.loggedIn = false;
	$scope.showUpdateForm = false;

	var checkLoggedIn = function() {
		$http.get('/api/user').then(function(data) {
			var loginState = data['data']['id'];
			if (loginState) {
				$scope.loggedIn = true;
			}
			else {
				$scope.loggedIn = false;
			}
		});
	};

	vm.loggedIn = checkLoggedIn();

	//check if logged in user is restaurant
	$scope.user = {}; //includes name, entity name, etc.
	$scope.entries = [{}];
	$scope.entry = {}; // entry to be added to the database
	$scope.entityInfo = {};

	$scope.updateUser = function() {
		$http.get('/api/user').then(function(data) {
			// set the user

			var loginState = data['data']['id'];
			if (loginState) {
				$scope.user = data['data'];

				$http.put('/api/user/' + $scope.user.id, {
					userType: $scope.entityInfo.userType,
					location: $scope.entityInfo.location,
					entityName: $scope.entityInfo.entityName
				}).then(function(data) {
					//refresh user
					$scope.getUser();
				});
			}
		});
	};

	$scope.getUser = function() {
		$http.get('/api/user').then(function(data) {
			$scope.user = data['data'];
			$scope.showUpdateForm = data['data']['location'] == null || data['data']['userType'] == null || data['data']['entityName'] == null;
		})
	};

	// save new entries to the database
	$scope.saveEntries = function() {
		for (var i = 0; i < $scope.entries.length; i++) {
			$http.post('/api/user/' + $scope.user.id + '/entries', {
				restaurant_id: $scope.user.id,
				food_item: $scope.entries[i].food_item,
				amount: $scope.entries[i].amount,
				status: 'Available'
			}).then(function(data) {
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
		$http.delete('/api/user/' + $scope.user.id + '/entries/' + $scope.entry._id).then(function(data) {

		});
	};

	$scope.removeEntry = function() {
		var lastItem = $scope.entries.length - 1;
		$scope.entries.splice(lastItem);
	};

	$scope.getEntriesForAllUsers = function() {
		$http.get('/api/allEntries').then(function(data) {
			$scope.entries = data['data']
			
		});
	}
	
	// get all users with entries and call getCoords(location)
	// get all entries, store restaurant_id in a set, use id to get location
	$scope.createAllMarkers = function() {
		var idSet = new Set();
		
		$http.get('/api/allEntries').then(function(data) {
			for (var i = 0; i < data['data'].length; i++) {
				var identification = data['data'][i]['restaurant_id'];
				var entryid = data['data'][i];
				
				$http.get('/api/user/' + identification).then(function(data) {
					var newAddress = data['data']['location'].split(' ').join('+');
					var user = data['data'];
					
					$http.get("https://geocoder.cit.api.here.com/6.2/geocode.json?app_id=QlKvzaU7Oieo8VjXqTl6&app_code=IybHd8bwPxiYwSs3Q1DMUQ&gen=9&searchtext=" + newAddress).then(function(data) {
						var lat = data['data']['Response']['View'][0]['Result'][0]['Location']['DisplayPosition']['Latitude'];
						var long = data['data']['Response']['View'][0]['Result'][0]['Location']['DisplayPosition']['Longitude'];
		
						var marker = {
							id: Date.now(),
							coords: {
								latitude: lat,
								longitude: long
							},
							window: {
								options: {
									visible: true
								},
								content: entryid['amount'] + ' of ' + entryid['food_item'] + ' from ' + user['entityName'] + ' at ' + user['location']
							}
						};
		
						$scope.map.markers.push(marker);
						console.log($scope.map.markers);
					})
				});
		
			}
		});
		};
	$scope.getAllEntries = function() {
		$http.get('/api/user').then(function(data) {
			
			$scope.user = data['data'];

			$http.get('/api/user/' + $scope.user.id + '/entries/').then(function(data) {
				$scope.user.entries = data['data']
			});
		});

	};

	$scope.updateMap = function() {
		$http.get('/api/allEntries').then(function(data) {
			$scope.entries = data['data'];


		});
	};


	angular.extend($scope, {
		map: {
			center: {
				latitude: 42.3349940452867,
				longitude: -71.0353168884369
			},
			zoom: 8,
			markers: [],
		}
	});
	
}]);
