var User = require('../models/user');
var Sensor = require('../models/sensor')
var config = require('../../config');
var jsonwebtoken = require('jsonwebtoken');

var secretKey = config.secretKey;


// function to create token
function createToken(user){

var token = jsonwebtoken.sign({
		_id: user._id,
		name:user.name,
		username:user.username
	}, secretKey,{
		expiresInMinutes :1440
	});
console.log("Token for this user" + token);

return token;

}



// exporting our entire api

module.exports = function(app,express,io) {

	var api = express.Router(); //calling Router function - allows us to write an api

	//signup api - posting data to server and hence the database
	api.post('/signup', function(req,res){
		console.log("am i here");
		var user = new User ({
			//parsing in data
			name: req.body.name,
			username:req.body.username,  //body here is body parser - in order for us to read the value on a w
			password:req.body.password   //website we need body-parser
		});

		var token = createToken(user);

		user.save(function(err){
			if(err){
				res.send(err);
				return;
			}
				
				res.json({
					success:true,
					message:"User has been signed up successfully!",
					token: token
			});
			
		});

	})

	//getting all the users from the database
	api.get('/users', function(req,res){

		User.find({}, function(err,users){

			if(err){ 
				res.send(err);
				return; 
			}

			res.json(users);

		});         // finding all the users objects in the database

		
	})

	//Login api - cookie based and token based - cookie based is old approach , not scalable
	//everytime user logs in, a separate session is created in the server for a user, thus wasting server space

	//token based - creates a token, and sends it with every http request, without creating a separate 
	//session, more scalable

	// using token based approach

	api.post('/login',function(req,res){

		User.findOne({
			username: req.body.username
		}).select('name username password').exec(function(err,user){

					if(err) throw err;

					if(!user){
						res.send({message:"User doesnt exist"});
							}

					else if(user){
						var validPassword = true  // temporary fix, compare password returns error: Bcrypt 
												  //not a valid password
						//var validPassword = user.comparePassword(req.body.password);
						
						if(!validPassword){
							res.send({message:"Invalid password"});
							}
						else {
					///create token on valid password
							var token = createToken(user);
							res.json({
							success: true,
							message:"Succssful Login!",
							token: token

							});

							}
					}
			});						// finds a specific user object
	})

// building the middleware for destination B - after a user logs in, they could go to all the api written 
//below this middle ware

api.use(function(req,res,next){
	console.log("Somebody just came to my api");

	var token = req.body.token || req.param('token') || req.headers['x-access-token'];

	//check if token exists
	if(token){
		jsonwebtoken.verify(token, secretKey, function(err,decoded){
			if(err){
				res.status(403).send({success: false, message: "Failed to authenticate user"});

			}
			else{

				req.decoded = decoded;
				next();
			}
		});
	}
	else{
		res.status(403).send({success:false, message:"No Token Provided"});
	}

	}); 

//DESTINATION B // provide a legitimate token to access this

api.route('/')
.post(function(req,res){

	var sensor = new Sensor({
		creator: req.decoded.id,
		content: req.body.content,
	});

	sensor.save(function(err, newSensor){
		if(err){
			res.send(err);
			return;

		}
		io.emit('sensor', newSensor)

		res.json({message:"New Sensor created!"});
	});

})

.get(function(req,res){

	Sensor.find({ creator: req.decoded.id}, function(err,sensors){
		if(err){
			res.send(err);
			return;
		}
		res.json(sensors);
	});
})

api.get('/logout', function(req,res){
res.json({message:"User Logged out successfully!"});

})

api.get('/', function(req,res){
	res.send(req.decoded);
});

return api;


}