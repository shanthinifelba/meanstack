angular.module('MyRestApp',['appRoutes','mainController','authService','userService','userController',
	'sensorService','sensorController'])
.config(function($httpProvider){

	$httpProvider.interceptors.push('AuthInterceptor');
})


/*angular.module('MyRestApp',['appRoutes'])
	.service('authService','userController','sensorService')

	.controller('mainController','userController','sensorController')

	.config(function($httpProvider){

	$httpProvider.interceptors.push('AuthInterceptor');
})*/