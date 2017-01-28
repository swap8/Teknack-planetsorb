

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

    start_game: function (Game) {

        setTimeout(function () {
            if (Game.start_time > 0) {
                Game.start_time--;
                // console.log(Game.start_time);
                self.remainingTime(Game);
            }
            else {
                Game.start_the_game = true;
            }
        }, 1000)
    },
    remainingTime: function (Game) {

        if (Game.start_time >= 0) {
            self.start_game(Game);
        }
    },

    calculate_winner: function (Game) {
        var radius;
        var player1 = {};
        var player2 = {};
        var temp = 0;
        for (var i in Game.Game_list) {
            var player = Game.Game_list[i];

            if (temp ==0) {
                player1.username = player.location.id;
                player1.rad = player.location.rad;
                temp++;
            }
            else {
                player2.username = player.location.id;
                player2.rad= player.location.rad;
            }
        }
        if(player1.rad>player2.rad){
            Game.winner =  player1.username;
        }
        else if(player1.rad<player2.rad){
            Game.winner = player2.username;
        }
        else{
            Game.winner = 'match draw';
        }
        Game.overstate = true;

    },
    winner: '',
    display_winner: function (Game, lost_player) {
        for (var i in Game.Game_list) {
            var player = Game.Game_list[i];
            if (player.username != lost_player) {
                Game.winner = player.username;
                // console.log(Game.winner);
            }
        }
    }


}