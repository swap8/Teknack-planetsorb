
var self = module.exports = {
    modify_bot_position: function (Game) {


        var temp_planet_list = {};
        var planet_exist_for_bot;
        var stop_bot = false;
        var distance_planet_list = {};
        // Game.bot.x--;
        //findout the most nearest planets who has radious lower then him

        for (var i in Game.planetlist) {
            var planet = Game.planetlist[i];
            //console.log(planet);

            //now you need to search for the planets which are present in that entire area
            //for me my area will be stuff that are present in current Game

            //make a new list of planets whose radious less than that of blackhole
            if (planet.rad < Game.bot.rad) {
                //these means bot radious is bigger than that of player
                //this means now we have to findout distance between them
                var dx = Game.bot.x - planet.x;
                var dy = Game.bot.y - planet.y;
                var distance = Math.sqrt((dx * dx) + (dy * dy));
                //now we need to store this information
                planet.distance = distance;
                distance_planet_list[planet.id] = planet;
            }

            var player = Game.player;
            if(planet.rad<player.location.rad){
                planet.fade = true;
            }

        }
        //find out the planet whose distance is lowest from bot
        //First of all is ther any planet who has radious lower than bot
        //it means you need to find smallest planet in the list
        var smallest_planet = {
            rad: 5000
        };
        for (var i in distance_planet_list) {
            var planet = distance_planet_list[i];
            if (smallest_planet.rad>planet.rad){
                smallest_planet.planet = planet;
                smallest_planet.rad = planet.rad;
            }
        }

        if(smallest_planet.rad>Game.bot.rad)
        {
            stop_bot = true;
            Game.bot.status = 'Thinking';
        }

        if (!stop_bot) {
            Game.bot.status = 'Attacking';
            var nearest_planet = {
                min: 5000
            };
            for (var i in distance_planet_list) {
                var planet = distance_planet_list[i];
                if (planet.distance < nearest_planet.min) {
                    nearest_planet.planet = planet;
                    nearest_planet.min = planet.distance;
                }
            }
            //console.log(nearest_planet);
            if (Game.bot.x < nearest_planet.planet.x) {
                Game.bot.x += 1;
            }
            else if (Game.bot.x > nearest_planet.planet.x) {
                Game.bot.x -= 1;
            }
            if (Game.bot.y < nearest_planet.planet.y) {
                Game.bot.y += 1;
            }
            else if (Game.bot.y > nearest_planet.planet.y) {
                Game.bot.y -= 1;
            }

        }



    }

}
