

var self = module.exports = {


game_over : function(Game)
{   
        setTimeout(function(){
            
            if(Game.time>0)
            {
                //console.log(Game.time);
                Game.time--;
                self.check(Game);

            }
            else
            {
                Game.time='Game Over';
               // console.log("Game Over");
            }
        },1000)
        
},
check:function(Game){
    if(Game.time>=0){
        self.game_over(Game);
    }

},

winner :'',
display_winner : function(Game,lost_player)
{
    for(var i in Game.Game_list)
    {
        var player = Game.Game_list[i];
        if(player.username!=lost_player)
        {
            Game.winner = player.username;
           // console.log(Game.winner);
        }
    }
}


}