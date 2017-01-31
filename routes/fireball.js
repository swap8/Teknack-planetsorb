
var SIDE=1;
var display = require('./display');
var self = module.exports = {



    createfireball: function () {
        var fireball = {};
        var direction = Math.floor(Math.random()*1510);
        fireball.x= direction;
        
        
        fireball.y=800;

        (direction <= 750)? SIDE =1 : SIDE=0;

        return fireball;
    },

    

    move_fireball: function (Game)
    {
         
         
           
            if(SIDE)
            {
            Game.fireball.x++;
            Game.fireball.y--;
            }
            else
            {
            Game.fireball.x--;
            Game.fireball.y--;
            }
         
     },

    assignfireballposition: function (Game) {
        //console.log("hi");

        if (Game.generate_fireball) {
            var fireball_pack = [];
            if (Game.fireball.y > 0 ) {
           
                self.move_fireball(Game);
           
                
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
