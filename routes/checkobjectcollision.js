var self = module.exports = {
    
    detect_collision_between_portal_stuff : function(Game){

        if(Game.appear_portal){

            //if portal is present then check if any of it's objects are colliding with bot or player
            // if they are colliding then grant then 25 points

            var man = Game.man;
            //console.log(man);
            var ship = Game.ship;
            var asteroid = Game.asteroid;
            var player = Game.player;
            var bot = Game.bot;
            //let's check collisio between player and these objects
            self.check_colliding(man,player,Game);
            self.check_colliding(ship,player,Game);
            self.check_colliding(asteroid,player,Game);
            self.check_colliding_bot(man,bot,Game);
            self.check_colliding_bot(ship,bot,Game);
            self.check_colliding_bot(asteroid,bot,Game);
        }
    },

    check_colliding : function(material,entity,Game){
        //console.log(entity);
        var dx = material.x - entity.location.x;
        var dy = material.y - entity.location.y;
        distance = Math.sqrt((dx*dx)+(dy*dy));

        if(distance < (material.radius + entity.location.rad) ){
            //colliding
            
            Game.player.location.score+=20;
            //delete Game.material;
        }

    },

     check_colliding_bot : function(object,entity,Game){
        var dx = object.x - entity.x;
        var dy = object.y - entity.y;
        distance = Math.sqrt((dx*dx)+(dy*dy));
        if(distance < (object.radius + entity.rad) ){
            Game.bot.score+=20;
        }

    }


}