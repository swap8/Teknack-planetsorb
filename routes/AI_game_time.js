var self = module.exports = {

    game_over: function (Game) {
        setTimeout(function () {

            if (Game.time > 0) {
                //console.log(Game.time);
                Game.time--;
                self.check(Game);
            }
        }, 1000)

    },
    check: function (Game) {
        if (Game.time >= 0) {
            self.game_over(Game);
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