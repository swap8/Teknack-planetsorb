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

            }

        }



    },
    detect_collision_bot: function (Game) {

    }
}