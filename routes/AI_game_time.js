
var superstar = require('./superstar');
var self = module.exports = {

    game_over: function (Game,bot_game_list) {
        setTimeout(function () {

            if (Game.time > 0) {
                Game.time--;

                if (Game.time % 10 === 0) {
                    var nstar = superstar.generate_nstar();
                    Game.nstar_list[nstar.id] = nstar;
                }
                if (Game.nstar_list != null) {
                    for (var i in Game.nstar_list) {
                        var nstar = Game.nstar_list[i];
                        nstar.count_time--;
                    }
                }
                self.check(Game,bot_game_list);
            }
            else {
                    delete bot_game_list[Game.id];
                    //console.log("Game deleted with id : " + Game.id);
            }
        }, 1000)

    },
    check: function (Game,bot_game_list) {
        if (Game.time >= 0) {
            self.game_over(Game,bot_game_list);
        }

    },

    calculate_winner: function (Game) {
        //we need to check who wins here bot or socket player once the timer has reach to certain level
        var player = 0;
        if (Game.bot.score > Game.player.location.score) {
            Game.winner = 'Artificial Intelligence';
        }
        else {
            Game.winner = Game.player.location.id;
        }
        if (Game.bot.score === Game.player.location.score) {
            Game.winner = 'Match Draw';
        }

        Game.overstate = true;
    }
}