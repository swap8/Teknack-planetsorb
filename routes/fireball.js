
var display = require('./display');
var self = module.exports = {

    createfireball: function () {
        var fireball = {};
        //fireball.x = Math.floor(Math.random() * 100 + 100);

        fireball.x=1;
        fireball.y = 1;
        return fireball;
    },

    move_fireball: function (Game) {
         Game.fireball.x++;
         for(var i = 1; i<22; i++)
         {
        Game.fireball.y= Math.pow(i,2);
        //move_fireball(Game);
         }



     },

    assignfireballposition: function (Game) {
        //console.log("hi");

        if (Game.generate_fireball) {
            var fireball_pack = [];
            if (Game.fireball.y > 0 ) {
                //self.move_fireball(Game)
                Game.fireball.x++;
                Game.fireball.y=2*(Game.fireball.x);
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
