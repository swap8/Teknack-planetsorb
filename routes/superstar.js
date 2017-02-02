var self = module.exports = {

    generate_nstar: function () {

        var nstar = {
            x: Math.floor(Math.random() * 1200 + 20),
            y: Math.floor(Math.random() * 500 + 20),
            id: Math.random().toString(36).substring(7),
            rad: Math.floor(Math.random() * 15 + 7),
            count_time: 6,
            shake: false,
            shake_count: 1

        };
        return nstar;
    },

    assign_nstar_position: function (Game) {

        var pack = [];
        self.detect_collision(Game);
        for (var i in Game.nstar_list) {
            var nstar = Game.nstar_list[i];
            if (nstar.count_time != 0) {
                pack.push({
                    x: nstar.x,
                    y: nstar.y,
                    rad: nstar.rad,
                    shake: nstar.shake
                })
            }
            if (nstar.count_time == 0) {
                delete Game.nstar_list[nstar.id];
            }
        }
        return pack;
    },

    detect_collision: function (Game) {
        for (var i in Game.nstar_list) {
            var nstar = Game.nstar_list[i];

            var dx = nstar.x - Game.player.location.x;
            var dy = nstar.y - Game.player.location.y;
            var distance = Math.sqrt((dx * dx) + (dy * dy));
            if (distance < (Game.player.location.rad + nstar.rad)) {
                if (nstar.shake_count == 1) {
                    nstar.shake = true;
                    Game.player.location.rad += 50;
                    //console.log("colliding");
                    self.wait_for_eight_second(Game);
                    nstar.shake_count++;
                }
                else{
                    delete Game.nstar_list[nstar.id];
                }
            }
        }

        for (var i in Game.nstar_list) {
            var nstar = Game.nstar_list[i];

            var dx = nstar.x - Game.bot.x;
            var dy = nstar.y - Game.bot.y;
            var distance = Math.sqrt((dx * dx) + (dy * dy));
            if (distance < (Game.bot.rad + nstar.rad)) {
                if (nstar.shake_count == 1) {
                    nstar.shake = true;
                    Game.bot.rad += 50;
                    //console.log("colliding");
                    self.bot_wait_for_eight_second(Game);
                    nstar.shake_count++;
                }
                else{
                    delete Game.nstar_list[nstar.id];
                }
            }
        }
    },

    wait_for_eight_second : function(Game){
        setTimeout(function(){
            Game.player.location.rad-=20;
        },8000)
    },

    bot_wait_for_eight_second : function(Game){
        setTimeout(function(){
            Game.bot.rad-=20;
        },8000)
    }

}