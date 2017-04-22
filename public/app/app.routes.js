//use angular route library/module
angular.module('app.routes',['ngRoute'])


.config(function($routeProvider,$locationProvider){

	//used for configuring routes
	$routeProvider

		//home page route
		.when('/',{
			templateUrl:'app/views/index.html'
		});

	//get rid of # sign
	$locationProvider.html5Mode(true);
});
