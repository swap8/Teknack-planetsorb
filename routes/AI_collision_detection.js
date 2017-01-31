var self = module.exports = {

    detect_collision_player: function (Game) {
        //console.log("hii");
        //need to check collision between player 
        var player = Game.player;
        for (var i in Game.planetlist) {
            var planet = Game.planetlist[i];


            //console.log(Game.player);
            var dx = player.location.x - planet.x;
            var dy = player.location.y - planet.y;
            var distance = Math.sqrt((dx * dx) + (dy * dy));
            if (distance < (player.location.rad + planet.rad)) {

                //collision is happening
                if (planet.rad < player.location.rad) {
                    //console.log("hii");
                    planet.rad--;
                    if (planet.rad > 0) {
                        player.location.rad += planet.rad / 100;
                    }
                    else {
                        player.location.score += 10;
                        delete Game.planetlist[planet.id];
                    }
                }
                else {

                    if (player.location.rad > 2) {
                        planet.rad += player.location.rad / 100;
                        player.location.rad -= 0.2;
                    }
                    else {
                        console.log("game over.");

                    }
                }

            }

        }



    },
    detect_collision_bot: function (Game) {
        //console.log("hii");
        //need to check collision between player 
        var bot = Game.bot;
        for (var i in Game.planetlist) {
            var planet = Game.planetlist[i];

            //console.log(Game.player);
            var dx = bot.x - planet.x;
            var dy = bot.y - planet.y;
            var distance = Math.sqrt((dx * dx) + (dy * dy));
            if (distance < (bot.rad + planet.rad)) {

                //collision is happening
                if (planet.rad < bot.rad) {
                    //console.log("hii");
                    planet.rad--;
                    if (planet.rad > 0) {
                        bot.rad += planet.rad / 100;
                    }
                    else {
                        bot.score += 10;
                        delete Game.planetlist[planet.id];
                    }
                }
                else {

                    if (bot.rad > 8) {
                        planet.rad += bot.rad / 100;
                        bot.rad -= 0.2;
                    }
                    else {
                        //console.log("game over.");
                    }
                }
            }
        }
    }
}