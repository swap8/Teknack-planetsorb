
var fireball = require('./fireball');
var self = module.exports = {


    game_over: function (Game, game_list, ready_list) {
        setTimeout(function () {

            if (Game.time > 0) {
                //console.log(Game.time);
                Game.time--;
                self.check(Game, game_list, ready_list);
                if (Game.time % 6 === 0) {
                    //Game.generate_fireball = true;
                    var locate_fireball = fireball.createfireball();
                    //console.log(locate_fireball.id);
                    Game.fireball_list[locate_fireball.id] = locate_fireball;
                    //console.log(Game.fireball_list);
                    //fireball.render_fireball(locate_fireball);
                }
                if(Game.time==30){
                    for(var i in Game.Game_list){
                        var player = Game.Game_list[i];
                        Game.activate_special_powers = true;
                    }
                }

            }
            else {
                //console.log("hii i am in game end over part which is hacked by me");
                for (var i in game_list) {
                    var undeleted_game = game_list[i];
                    if (Game.id === undeleted_game.id) {
                       // console.log("hi i am there");
                       //console.log(Game.id);
                        var temp1, temp2;
                        var check = true;
                        for (var i in Game.Game_list) {
                            var player = Game.Game_list[i];
                            if (check) {
                                temp1 = player.location.id;
                                check = false;
                            }
                            else {
                                temp2 = player.location.id;
                            }
                        }
                        //console.log(temp1);
                        delete ready_list[temp1];
                        delete ready_list[temp2];
                        delete game_list[Game.id];
                    }
                }

                //console.log("Game deleted");
            }
        }, 1000)

    },
    check: function (Game, game_list, ready_list) {
        if (Game.time >= 0) {
            self.game_over(Game, game_list, ready_list);
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

            if (temp == 0) {
                player1.username = player.location.id;
                player1.rad = player.location.rad;
                temp++;
            }
            else {
                player2.username = player.location.id;
                player2.rad = player.location.rad;
            }
        }
        if (player1.rad > player2.rad) {
            Game.winner = player1.username;
        }
        else if (player1.rad < player2.rad) {
            Game.winner = player2.username;
        }
        else {
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
