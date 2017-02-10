
var mongoose = require('mongoose');
var _ = require('underscore');
var User = require('../models/User');


var self = module.exports = {
    updatedata: function (send_id, requested_user_name) {
        //console.log("hiiiiiiiiii");
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

    },

    
//now add this name to his friend list 
    add_name_to_friend : function (check, send_id, requested_user_name, username, requested_user_id) {
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
},
    //this comes under accept friend list
     acceptdata : function (send_id, requested_user_name, username) {

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
                        self.add_name_to_friend(check, send_id, requested_user_name, username, requested_user_id);
                    }
                }
                //res.send(JSON.stringify({ 'msg': 'success', data: people_name }));
            });

    }
}