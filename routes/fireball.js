
var display = require('./display');
var self = module.exports = {



    createfireball: function () {
        var fireball = {};
        //fireball.x = Math.floor(Math.random() * 100 + 100);
        fireball.x=Math.floor(Math.random()*(1491)) + 500;
        // fireball.x=750;
        // fireball.y =Math.floor(Math.random()*790)+20;
        fireball.y=800;
        return fireball;
    },

    allow_boundary_for_fireball: function(Game)
    {
        var a = Game.fireball.x;
        var b = Game.fireball.y;
        var c = Math.hypot(1500,800);
        console.log("A:"+ a + "B: " + b);
        if(((Math.hypot(a,b))<c)&& a>0 && b>0)
        {
            self.move_fireball(Game);
            
        }
    },

    move_fireball: function (Game)
    {
         
         
             if((Game.fireball.x>750)&&(Game.fireball.y<400))
            {
             Game.fireball.x++;
             Game.fireball.y--;
            }
            else if((Game.fireball.x>750)&&(Game.fireball.y>400))
            {
             Game.fireball.x++;
            Game.fireball.y++;
            }
            else if((Game.fireball.x<750)&&(Game.fireball.y>400))
            {
            Game.fireball.x--;
            Game.fireball.y++;
            }
            else if ((Game.fireball.x<750)&&(Game.fireball.y<400))
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
            //    Game.fireball.x;
            // Game.fireball.y;
                self.allow_boundary_for_fireball(Game);
                console.log("X coord: " + Game.fireball.x + "** Y coord: " + Game.fireball.y);
                
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
