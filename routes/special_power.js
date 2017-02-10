var self = module.exports = {

    special_power_active: function (Game) {


        //see what i need to do first we need check whether for that perticular player that special power is active or not
        //so what you can do you can take that value of variable and then you execute them seperately
        var player_one_active_power;
        var player_two_active_power;
        count = 1;
        var player1, player2;
        if (Game.activate_special_powers) {
            for (var i in Game.Game_list) {
                var player = Game.Game_list[i];
                //console.log(player);
                if (count) {
                    player1 = player;
                    if (player1.location.power_absorb_count < 6) {
                        player.location.activate_special_power = true;
                        player_one_active_power = player.location.activate_special_power;
                    }
                    else {
                        player.location.activate_special_power = false;
                        player_one_active_power = player.location.activate_special_power;
                        //Game.activate_special_powers = false;
                    }

                    count--;
                }
                else {
                    player2 = player;
                    if (player2.location.power_absorb_count < 6) {
                        player.location.activate_special_power = true;
                        player_two_active_power = player.location.activate_special_power;

                    }
                    else {
                        player.location.activate_special_power = false;
                        player_two_active_power = player.location.activate_special_power;
                        //Game.activate_special_powers = false;

                    }


                }
            }
        }


        //once it is active we need to check whether he or she has pressed E or not
        if (player_one_active_power) {
            if (player1.location.pressedE) {
                // console.log("hey now i am active");
                //now this means he has pressed E to activate his special power
                //now we need to find all planets which are present in perticular radius let's say 50
                for (var i in Game.green_planet_list) {
                    var green_planet = Game.green_planet_list[i];
                    var dx = player1.location.x - green_planet.x;
                    var dy = player1.location.y - green_planet.y;
                    var distance = Math.sqrt((dx * dx) + (dy * dy));

                    if (distance < (player1.location.rad + 20 + green_planet.rad)) {
                        //who they are in heavy power radius
                        //it means they are colliding
                        green_planet.rad--;
                        if (green_planet.rad > 0) {
                        }
                        else {
                            player1.location.power_absorb_count++;
                            player1.location.score = +10;
                            delete Game.green_planet_list[green_planet.id];
                        }

                    }
                }

                for (var i in Game.red_planet_list) {
                    var red_planet = Game.red_planet_list[i];
                    var dx = player1.location.x - red_planet.x;
                    var dy = player1.location.y - red_planet.y;
                    var distance = Math.sqrt((dx * dx) + (dy * dy));

                    if (distance < (player1.location.rad + 20 + red_planet.rad)) {
                        //who they are in heavy power radius
                        //it means they are colliding
                        red_planet.rad--;
                        if (red_planet.rad > 0) {
                        }
                        else {
                            player1.location.power_absorb_count++;
                            player1.location.score = +10;
                            delete Game.red_planet_list[red_planet.id];
                        }

                    }
                }
            }
        }


        if (player_two_active_power) {
            if (player2.location.pressedE) {
                //now this means he has pressed E to activate his special power
                //now we need to find all planets which are present in perticular radius let's say 50
                for (var i in Game.green_planet_list) {
                    var green_planet = Game.green_planet_list[i];
                    var dx = player2.location.x - green_planet.x;
                    var dy = player2.location.y - green_planet.y;
                    var distance = Math.sqrt((dx * dx) + (dy * dy));

                    if (distance < (player2.location.rad + 20 + green_planet.rad)) {
                        //who they are in heavy power radius
                        //it means they are colliding
                        green_planet.rad--;
                        if (green_planet.rad > 0) {
                        }
                        else {
                            player2.location.power_absorb_count++;
                            player2.location.score = +10;
                            delete Game.green_planet_list[green_planet.id];
                        }

                    }
                }

                for (var i in Game.red_planet_list) {
                    var red_planet = Game.red_planet_list[i];
                    var dx = player2.location.x - red_planet.x;
                    var dy = player2.location.y - red_planet.y;
                    var distance = Math.sqrt((dx * dx) + (dy * dy));

                    if (distance < (player2.location.rad + 20 + red_planet.rad)) {
                        //who they are in heavy power radius
                        //it means they are colliding
                        red_planet.rad--;
                        if (red_planet.rad > 0) {
                        }
                        else {
                            player2.location.power_absorb_count++;
                            player2.location.score = +10;
                            delete Game.red_planet_list[red_planet.id];
                        }

                    }
                }
            }
        }
    }

}