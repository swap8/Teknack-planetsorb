var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var _ = require('underscore');
var User = require('../models/User');


/* GET home page. */
router.get('/', function (req, res, next) {
	if (req.session.user) {
		res.redirect('/game');
	}
	else {
		res.render('index');
	}
});

/* GET game page */
router.get('/game', function (req, res, next) {
	if (!req.session.user) {
		res.redirect('/');
	}
	else {
		res.render('game');
	}
});


// this comes under add friend list
var updatedata = function (send_id, requested_user_name) {

	//need to see whether this two people are already friends are not

	User.findById(send_id, function (err, doc) {

		if (err) {
			console.log(err);
		}
		else {
			//console.log(doc);
			//console.log(send_id);
			var send_request = true;
			//to check whether they are already friends are not
			var multiple_friend_check = doc.friends;
			for (var i in multiple_friend_check) {
				var user = multiple_friend_check[i];
				if (requested_user_name === user) {
					send_request = false;
				}
			}
			if (send_request) {
				// this is for sending request to them
				User.findById(send_id, function (err, doc) {

					if (err) {
						console.log(err);
					}
					else {
						//console.log(doc);
						//console.log(send_id);
						var send_request = true;
						// to make sure that they should not get many request from one user
						var multiple_request_check = doc.pending_request;
						for (var i in multiple_request_check) {
							var user = multiple_request_check[i];
							if (requested_user_name === user) {
								send_request = false;
							}
						}
						if (send_request) {
							doc.pending_request.push(requested_user_name);
							doc.save();
							console.log(" Request has been sent succesfully");
						}
					}
				});
			}
		}
	});

}

//now add this name to his friend list 
var add_name_to_friend = function (check, send_id, requested_user_name, username, requested_user_id) {
	if (check) {
		User.findById(send_id, function (err, doc) {

			if (err) {
				console.log(err);
			}
			else {
				//console.log(doc);
				//console.log(send_id);
				doc.friends.push(requested_user_name);
				doc.save();
				console.log(" User has been succesfully added to " + username + " friend list");
			}
		});

		//it's time for adding name to requested_user_name friend list
		User.findById(requested_user_id, function (err, doc) {

			if (err) {
				console.log(err);
			}
			else {
				//console.log(doc);
				//console.log(send_id);
				doc.friends.push(username);
				console.log(doc.friends);

				//doc.pending_request.pop(username);
				//console.log(doc.pending_request);
				doc.save();

				console.log(" User has been succesfully added to " + requested_user_name + " friend list");
			}
		});

		query = requested_user_name;
		User.findOneAndUpdate({ username: query }, { $pull: { pending_request: username } }, function (err, data) {
			if (err) {
				console.log(err);
			}
			console.log(data);

		});
	}
}


//this comes under accept friend list
var acceptdata = function (send_id, requested_user_name, username) {

	var check = false;
	User.find({ username: requested_user_name })
		.then(function (doc) {
			//console.log(doc);
			requested_user_id = doc[0]._id;
			people_name = doc[0].pending_request;
			console.log(people_name);
			for (var i = 0; i < people_name.length; i++) {
				var user = people_name[i];
				console.log(user);
				if (user === username) {
					console.log("yeah " + user + " exist in your pending friendlist");
					check = true;
					console.log("Now , " + user + " is going to be add as a friend ");
					add_name_to_friend(check, send_id, requested_user_name, username, requested_user_id);
				}
			}
			//res.send(JSON.stringify({ 'msg': 'success', data: people_name }));
		});

}




/*accept friend*/
router.post('/accept_friend', function (req, res, next) {

	var same_name = false;
	var username = req.body.username;
	var requested_user_name = req.session.user;
	if (username === requested_user_name) {
		console.log("you can't request yourself");
		same_name = true;
	}
	User.count({ username: username }, function (error, userCount) {

		if (error) {
			console.log(error);
			return res.status(500).send(JSON.stringify({ 'msg': 'servererror' }));
		}
		if (userCount > 0) {
			//req.session.user = username;
			if (!same_name) {

				User.find({ username: username })
					.then(function (doc) {
						player_id = doc;
						//console.log(player_id[0]._id);
						send_id = player_id[0]._id;
						console.log("validification : to see whether this person really exist in " + requested_user_name + " database ");
						acceptdata(send_id, requested_user_name, username);
					});
				res.send(JSON.stringify({ 'msg': 'success' }));
			}
			else
				res.send({ msg: "yourself" });
		}
		else {
			res.send({ msg: "invalid" });
		}

	});

});

/* friend request  */
router.post('/friend_request', function (req, res, next) {
	var username = req.session.user;
	var people_name = [];
	User.count({ username: username }, function (error, userCount) {

		if (error) {
			console.log(error);
		}
		if (userCount > 0) {
			//console.log("this means user is there in the database just update his score");
			// To display stuff in the database
			User.find({ username: username })
				.then(function (doc) {
					player_id = doc;
					//console.log(doc);
					people_name = doc[0].pending_request;
					//console.log(people_name);
					send_id = player_id[0]._id;
					res.send(JSON.stringify({ 'msg': 'success', data: people_name }));
				});
		}
	});

	//console.log("i got you man");
});



/* add friend  */
router.post('/add_friend', function (req, res, next) {

	var same_name = false;
	var username = req.body.username;
	var requested_user_name = req.session.user;
	if (username === requested_user_name) {
		//console.log("you can't request yourself");
		same_name = true;
	}
	User.count({ username: username }, function (error, userCount) {

		if (error) {
			console.log(error);
			return res.status(500).send(JSON.stringify({ 'msg': 'servererror' }));
		}
		if (userCount > 0) {
			//req.session.user = username;
			if (!same_name) {
				//User.update({ username: username }, { "$pushAll": { pending_request: requested_user_name } });

				User.find({ username: username })
					.then(function (doc) {
						player_id = doc;
						//console.log(player_id[0]._id);
						send_id = player_id[0]._id;
						updatedata(send_id, requested_user_name);
					});
				res.send(JSON.stringify({ 'msg': 'success' }));
			}
			else
				res.send({ msg: "yourself" });
		}
		else {
			res.send({ msg: "invalid" });
		}

	});

});


/* see user profile */
router.post('/see_profile', function (req, res, next) {
	var username = req.session.user;
	var people_name = [];
	User.count({ username: username }, function (error, userCount) {

		if (error) {
			console.log(error);
		}
		if (userCount > 0) {
			//console.log("this means user is there in the database and just show him all the stuff");
			// To display stuff in the database
			User.find({ username: username })
				.then(function (doc) {
					//player_id = doc;
					console.log(doc);
					//people_name = doc[0].pending_request;
					//console.log(people_name);
					//send_id = player_id[0]._id;
					res.send(JSON.stringify({ 'msg': 'success', data: doc }));
				});
		}
	});

	//console.log("I am watching player profile");
});



/* Access friends */

router.post('/access_friends', function (req, res, next) {
	var username = req.session.user;
	var people_name = [];
	User.count({ username: username }, function (error, userCount) {

		if (error) {
			console.log(error);
		}
		if (userCount > 0) {
			console.log("this means user is there in the database and just show him all the stuff");
			// To display stuff in the database
			User.find({ username: username })
				.then(function (doc) {
					//player_id = doc;
					console.log(doc);
					//people_name = doc[0].pending_request;
					//console.log(people_name);
					//send_id = player_id[0]._id;
					var friends = doc[0].friends;
					console.log(friends);
					/*					var frnds = new Object();
										frns.username = friends;
					
											User.find({ username: {$in:friends}})
												.then(function (err,doc) {
													//player_id = doc;
													console.log(err);
													//people_name = doc[0].pending_request;
													//console.log(people_name);
													//send_id = player_id[0]._id;
					//								var friends = doc[0].friends;
													//console.log(friends);
								//					var info = doc;
								//					pack.push(info)
												});	
					*/
					var bind = {};
					bind.pack = [];
					var send_friends = friends.length;
					for (var i = 0; i < friends.length; i++) {
						//now find info of this friends
						User.find({ username: friends[i] })
							.then(function (doc) {
								//player_id = doc;
								console.log(doc);
								//people_name = doc[0].pending_request;
								//console.log(people_name);
								//send_id = player_id[0]._id;
								var friends = doc[0].friends;
								//console.log(friends);
								var info = doc;
								bind.pack.push(info)
							});
						send_friends--;
					}
					var count_time = 5;
					var refreshId = setInterval(function () {

						var send_details_to_client = false;
						if (send_friends == 0) {
							send_details_to_client = true;
						}
						if (send_details_to_client) {
							res.send(JSON.stringify({ 'msg': 'success', data: bind }));
							console.log("done");
							clearInterval(refreshId);
						}
						if (!count_time) {
							clearInterval(refreshId);
						}
						count_time--;
						console.log("I am on");
					}, 1000)
					//console.log(pack);
					//res.send(JSON.stringify({ 'msg': 'success', data: pack }));
				});
		}
	});

	console.log("I am watching player profile");
});
























/* Login Request */
router.post('/login', function (req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	User.count({ username: username, password: password }, function (error, userCount) {

		if (error) {
			console.log(error);
			return res.status(500).send(JSON.stringify({ 'msg': 'servererror' }));
		}
		if (userCount > 0) {
			req.session.user = username;
			res.send(JSON.stringify({ 'msg': 'success' }));
		}
		else {
			res.send({ msg: "invalid" });
		}

	});
});

/* Register Request */

router.get('/register', function (req, res, next) {
	if (req.session.user) {
		res.redirect('/game');
	}
	else {
		res.render('register');
	}
});


/* Register new user */

router.post('/register_user', function (req, res, next) {
	var username = req.body.username;
	var password = req.body.password;

	//check for unique username
	User.count({ username: username }, function (err, userCount) {

		if (err) {
			console.log(err);
			return res.status(500).send(JSON.stringify({ 'msg': 'servererror' }));
		}
		if (userCount > 0) {
			req.session.user = username;
			res.send(JSON.stringify({ 'msg': 'username_exist' }));
		}
		else {
			var new_user = new User();
			new_user.username = username;
			new_user.password = password;

			new_user.save(function (err, newuser) {
				if (err) {
					console.log(err);
					return res.status(500).send(JSON.stringify({ 'msg': 'servererror' }));
				}
				else {
					console.log(newuser + ' registered');
					req.session.user = username;
					res.send(JSON.stringify({ 'msg': 'success' }));
				}
			});
		}
	})
});

/* logout request */
router.get('/logout', function (req, res, next) {
	req.session.destroy(function (err) {
		if (err) {
			console.log(err);
			return res.status(500).send(JSON.stringify({ 'msg': 'servererror' }));
		}
		res.redirect('/');
	});

});


module.exports = router;
