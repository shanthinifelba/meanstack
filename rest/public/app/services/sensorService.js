angular.module('sensorService',[])

.factory('sensor', function($http){

	var sensorFactory = {};

	sensorFactory.create = function(sensorData){
		return $http.post('/api', sensorData);

	}
	
	sensorFactory.allSensor = function(){
		return $http.get('/api');

	}

	return sensorFactory;
}) 

.factory('socketio', function($rootScope){

	var socket = io.connect();
	return{
		on: function(eventName, callback){
			socket.on(eventName,function(){
				var args = arguments;
				$rootScope.$apply(function(){
					callback.apply(socket, args);
				});
			});
		},

		emit: function(eventName,data,callback){
			socket.emit(eventName,data,function(){
				var args = arguments;
				$rootScope.apply(function(){
					if(callback){
						callback.apply(socket,args);
					}
				});

			});
		}

	};
})