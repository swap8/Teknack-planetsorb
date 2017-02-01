
//var SIDE = 1;
var display = require('./display');
var self = module.exports = {

    createfireball: function () {
        var fireball = {};
        var direction = Math.floor(Math.random() * 1510);
        fireball.x = direction;
        fireball.y = 800;
        fireball.rad = 20;
        fireball.id = Math.random().toString(36).substring(7);
        fireball.generate_fireball = true;
        (direction <= 750) ? fireball.SIDE = 1 : fireball.SIDE = 0;
        return fireball;
    },



    move_fireball: function (Game, fireball) {

        self.colliding_fireball(Game);

        if (fireball.y < 0 || fireball.x < 0 || fireball.x > 1520) {
            delete Game.fireball_list[fireball.id];
        }
        else {
            if (fireball.SIDE) {
                fireball.x++;
                fireball.y--;
            }
            else {
                fireball.x--;
                fireball.y--;
            }
        }

    },

    assignfireballposition: function (Game) {
        //console.log("hi");
        var pack = [];
        for (var i in Game.fireball_list) {
            //console.log(Game.fireball_list);
            var fireball = Game.fireball_list[i];
            //console.log(Game.fireball_list);
            //console.log(fireball.generate_fireball);
            if (fireball.generate_fireball) {
                self.move_fireball(Game, fireball);
                //console.log();
                pack.push({
                    x: fireball.x,
                    y: fireball.y
                })
                //console.log("x: "+ fireball.x + "y: "+fireball.y);
            }
        }
        return pack;
    },

    colliding_fireball: function (Game) {
        //console.log("hi");
        for (var i in Game.Game_list) {
            var player = Game.Game_list[i];
            for (var i in Game.fireball_list) {
                var fireball = Game.fireball_list[i];
                var dx = player.location.x - fireball.x;
                var dy = player.location.y - fireball.y;
                var distance = Math.sqrt((dx * dx) + (dy * dy));
                if (distance < (player.location.rad + fireball.rad)) {
                    //console.log("Collision is happening");
                    //Game.generate_fireball = false;
                    delete Game.fireball_list[fireball.id];
                    player.location.rad += 10;
                }
            }

        }
    }




}
