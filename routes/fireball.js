
var SIDE=1;
var display = require('./display');
var self = module.exports = {



    createfireball: function () {
        var fireball = {};
        //fireball.x = Math.floor(Math.random() * 100 + 100);
        var direction = Math.floor(Math.random()*(1500)) + 10;
        fireball.x= direction;
        // fireball.x=750;
        // fireball.y =Math.floor(Math.random()*790)+20;
        fireball.y=800;

        (direction <= 750)? SIDE =1 : SIDE=0;

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
            self.move_fireball(Game,a,b);
            
        }
    },

    move_fireball: function (Game,a,b)
    {
         
         
           
            if(SIDE)
            {
            Game.fireball.x++;
            Game.fireball.y--;
            }
            else//if (a>=750 && a<1500)
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
