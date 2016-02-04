var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require('../models/user');

// In mongodb, in order to link one schema to another, we need to refer it, here we are trying to link
// sensor schema with user schema

var sensorSchema = new Schema({
	creator: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	content: String,
	created: { type : Date, default: Date.now}

});

module.exports = mongoose.model('Sensor',sensorSchema);