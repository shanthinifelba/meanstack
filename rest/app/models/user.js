var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;


var UserSchema = new Schema({
    //mongo db self generates an id for each user
	name: "String",
	username:{type : String, required:false, index:{unique: true}},
	password:{type : String, required:false, select: false}

});
// hashes the user schema password field before even storing to the database

UserSchema.pre('Save', function(next){
	var user = this; //this refers to the userSchema object
	if(!user.isModified('password')) return next();  // if user password is not modified, go to next matching route

	// to hash a password install lib 'bcrypt-nodejs --save'
	bcrypt.hash(user.password, null, null, function(err,hash){
		if(err) return next(err);
		

		user.password = hash;
		console.log("Hashed user password"+user.password);
		next();
	});

});

//custom method for comparing passwords
 UserSchema.methods.comparePassword = function(password){
	var user = this;
	//return true;
	return bcrypt.compareSync(password,user.password); 
}

// only after this method can we save it to database, it meaning the password
module.exports = mongoose.model('User',UserSchema);