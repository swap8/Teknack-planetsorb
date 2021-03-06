
var mongoose = require('mongoose');
var _ = require('underscore');
var checklevel = require('./checklevel');
var User = require('../models/User');


var self = module.exports = {
    updatescore: function (Game) {

        var player_id, send_id, score;
        var username = Game.winner;
        var player = Game.player;
        score = player.location.score;

        console.log("Winner is " + username);

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
                        //console.log(player_id[0]._id);
                        send_id = player_id[0]._id;
                        self.updatedata(send_id, score);
                    });
            }
        });

    },


    updatedata: function (send_id, score) {
        //console.log(score);
        User.findById(send_id, function (err, doc) {

            if (err) {
                console.log(err);
            }
            else {
                //console.log(doc);
                if (doc.xp == undefined) {
                    doc.xp = 100;
                    doc.level = 1;
                    doc.total_wins = 1;
                    doc.total_single_player_game_won = 1;
                    doc.total_multi_player_game_won = 0;
                    doc.total_games_played = 1;
                    doc.highest_multi_player_score = 0;
                    doc.highest_single_player_score = score;
                }
                else {
                    doc.xp = parseInt(doc.xp) + 100;
                    var level = checklevel.find_level(doc.xp);
                    doc.level = level;
                    doc.total_wins = parseInt(doc.total_wins) + 1;
                    // if (doc.total_wins === 25) {
                    //     console.log("executed");
                    //     var user_score;
                    //     request.getMega(doc.username, function (score) {
                    //         user_score = score;
                    //         user_score += 450;
                    //         request.updateMega(doc.username, user_score, function (ret) {

                    //         });
                    //     });
                    // }
                    doc.total_games_played = parseInt(doc.total_games_played) + 1;
                    doc.total_single_player_game_won = parseInt(doc.total_single_player_game_won) + 1;
                    if (doc.highest_single_player_score < score) {
                        doc.highest_single_player_score = score;
                    }
                }
                doc.save();
                console.log("score inserted succesfully");
            }
        })
    },

    check_exist_in_database: function (username) {
        User.count({ username: username }, function (error, userCount) {

            if (error) {
                console.log(error);
            }
            if (userCount > 0) {
                console.log("User is present in database");
            }
            else {
                //console.log("sorry man you are not there in the database see ya next time");
                //it's time for registration
                var details = {
                    username: username,
                };
                var data = new User(details);
                data.save();
            }
        });
    },
}