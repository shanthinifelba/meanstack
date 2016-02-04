angular.module('sensorController',['sensorService'])

.controller('SensorController',['sensorService' , function(Sensor,socketio) {
	var vm = this;

	Sensor.allSensor()
		.success(function(data){
			vm.sensors = data;
		});

	vm.create = function(){
		vm.message='';

		Sensor.create(vm.sensorData)
		.success(function(data){
			vm.sensorData = '';
			vm.message=data.message;
			vm.sensors.push(data);
		});


	};

	socketio.on('sensor', function(data){
		vm.sensors.push(data);

	});
}])