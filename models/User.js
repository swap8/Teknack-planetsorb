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
        type: Number
    },
    highest_single_player_score: {
        type: Number
    },
    highest_multi_player_score: {
        type: Number
    },
    single_player_rank: {
        type: Number
    },
    multi_player_rank: {
        type: Number
    },
    pending_request: {
        type: Array
    },
    friends: {
        type: Array
    },
    total_games_played: {
        type: Number
    },
    rare_stuff_collected: {
        type: Number
    },
    xp: {
        type: Number
    },
    level: {
        type: Number,
    },
    total_wins: {
        type: Number
    },
    total_single_player_game_won: {
        type: Number
    },
    total_multi_player_game_won: {
        type: Number
    }

});

var User = mongoose.model('user_details', userSchema);
module.exports = User;