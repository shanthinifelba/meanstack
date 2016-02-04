angular.module('appRoutes',['ngRoute'])

.config(function($routeProvider, $locationProvider){

	$routeProvider
	.when('/',{
		templateUrl: 'app/views/pages/home.html',
		controller:'MainController',
		controllerAs:'main'
	})
	.when('/login',{
		templateUrl: 'app/views/pages/login.html',
		controller:'MainController',
		controllerAs:'login'
		
	})
	.when('/signup', {
		templateUrl:'/app/views/pages/signup.html'
	})
	.when('/logout',{
		templateUrl:'app/views/pages/logout.html',
		controller:'MainController',
		controllerAs:'logout'
		
		
	})









	$locationProvider.html5Mode(true); //location is to configure the applications deep linking path
	
})