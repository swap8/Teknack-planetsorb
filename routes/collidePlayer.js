var gameover = require('./gameover');

var self = module.exports = {
	detect_collision: function (Game) {

if(Game.id!=undefined)
{
//code for checking whether two players are coliding
		var temp = {};
		var new_player_list = {};
		var assign_number = 0;
		var no_of_players = 2;
		for (var i in Game.Game_list) {
			var player = Game.Game_list[i];
			new_player_list[assign_number] = player;
			assign_number++;
		}

		for (i = 0; i < (no_of_players - 1); i++) {

			//console.log(player.x + "and" + next_player.x);
			for (j = i + 1; j < no_of_players; j++) {
				var player = new_player_list[i];
				//console.log(player);
				var next_player = new_player_list[j];
				var dx = player.location.x - next_player.location.x;
				var dy = player.location.y - next_player.location.y;
				//console.log(player.location.x);
				var distance = Math.sqrt((dx * dx) + (dy * dy));
				if (distance < (player.location.rad + next_player.location.rad)) {
					//	console.log("collision detected!");

					if (player.location.rad < next_player.location.rad) {

						gameover.display_winner(Game,player.location.id);
						Game.overstate = true;
						delete Game.id;
						//delete player_list[player.id];
						//console.log("player lost");
					}
					if (player.location.rad > next_player.location.rad) {
						gameover.display_winner(Game,next_player.location.id);
						Game.overstate = true;
						delete Game.id;
						//delete player_list[next_player.id];

					}
					else {
						//console.log("players have same radius");
					}

				}


			}

		}




	}


}

}
		