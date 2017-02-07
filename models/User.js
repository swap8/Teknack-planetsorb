var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true
    },
    password: {
        type: String
    },
    score: {
        type: String
    },
    highest_single_player_score: {
        type: String
    },
    highest_multi_player_score: {
        type: String
    },
    single_player_rank: {
        type: String
    },
    multi_player_rank: {
        type: String
    },
    pending_request: {
        type: Array
    },
    friends: {
        type: Array
    },
    total_games_played: {
        type: String
    },
    rare_stuff_collected: {
        type: String
    },
    xp: {
        type: String
    },
    level: {
        type: String,
    },
    total_wins: {
        type: String
    },
    total_single_player_game_won: {
        type: String
    },
    total_multi_player_game_won: {
        type: String
    }

});

var User = mongoose.model('user_details', userSchema);
module.exports = User;