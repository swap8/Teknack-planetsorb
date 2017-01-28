
var display = require('./display');
var self = module.exports = {

    createfireball: function () {
        var fireball = {};
        fireball.x = Math.floor(Math.random() * 100 + 100);
        fireball.y = 700;
        return fireball;
    },

    /* render_fireball: function (fireball) {
         fireball.x++;
         fireball.y--;
     },
 */
    assignfireballposition: function (Game) {
        //console.log("hi");

        if (Game.generate_fireball) {
            var fireball_pack = [];
            if (Game.fireball.y > 0) {
                Game.fireball.x++;
                Game.fireball.y--;

                fireball_pack.push({
                    x:Game.fireball.x,
                    y:Game.fireball.y
                })
                return fireball_pack;
            }
            else{
                Game.generate_fireball=false;
                return 0;
            }

        }
        else
        {
            return 0;
        }
    }


}