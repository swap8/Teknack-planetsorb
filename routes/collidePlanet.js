var gameover = require('./gameover');
var self = module.exports = {

	detect_planet_collision: function (Game) {

		var called = true;

		if (Game.id != undefined) {
			//creating new lists to check for collision between the planets and players
			var current_player_list = {};
			var new_green_planet_list = {};
			var new_red_planet_list = {};
			var no_of_players = 2;

			var assign_no = 0;
			for (var i in Game.Game_list) {
				var player = Game.Game_list[i];
				current_player_list[assign_no] = player;
				assign_no++;
			}
			var assign_no = 0;
			for (var i in Game.green_planet_list) {
				var planet = Game.green_planet_list[i];
				new_green_planet_list[assign_no] = planet;
				assign_no++;
			}
			var assign_no = 0;
			for (var i in Game.red_planet_list) {
				var planet = Game.red_planet_list[i];
				new_red_planet_list[assign_no] = planet;
				assign_no++;
			}

			var total_green_planets = Object.keys(Game.green_planet_list).length;
			var total_red_planets = Object.keys(Game.red_planet_list).length;

			for (i = 0; i < total_green_planets; i++) {
				for (j = 0; j < no_of_players; j++) {
					var green_planet = new_green_planet_list[i];
					var player = current_player_list[j];
					var dx = green_planet.x - player.location.x;
					var dy = green_planet.y - player.location.y;
					distance = Math.sqrt((dx * dx) + (dy * dy));
					if (distance < (player.location.rad + green_planet.rad)) {

						//collision is happening
						//console.log(player.location.type);
						if (player.location.type == 'green') {

							if (green_planet.rad < player.location.rad) {
								//player radius is more
								green_planet.rad--;
								if (green_planet.rad > 0) {
									player.location.rad += green_planet.rad / 100;
								}
								else {
									player.location.score+=10;
									delete Game.green_planet_list[green_planet.id];
								}
								total_green_planets--;
							}
							else {

								if (player.location.rad > 2) {
									green_planet.rad += player.location.rad / 100;
									player.location.rad -= 0.2;
								}
								else {
									if (called) {
										gameover.display_winner(Game,player.location.id);
										Game.overstate = true;
										//delete Game.id;
									}
									called = false;

								}
							}
						}
						else {
							//console.log(Game.overstate);
								//console.log("you are of wrong type");
							player.location.rad--;
							if (player.location.rad  < 3) {
								gameover.display_winner(Game,player.location.id);
								Game.overstate = true;
								//delete Game.id;
							}
							else {
								green_planet.rad += player.location.rad / 100;
							}
							total_green_planets--;
						}

					}

				}
			}

			for (i = 0; i < total_red_planets; i++) {
				for (j = 0; j < no_of_players; j++) {
					var red_planet = new_red_planet_list[i];
					var player = current_player_list[j];
					var dx = red_planet.x - player.location.x;
					var dy = red_planet.y - player.location.y;
					distance = Math.sqrt((dx * dx) + (dy * dy));
					if (distance < (player.location.rad + red_planet.rad)) {
						
						//collision is happening
						//console.log(player.location.type);
						if (player.location.type == 'red') {
							
							if (red_planet.rad < player.location.rad) {
								//player is bigger than red planet
								red_planet.rad--;
								if (red_planet.rad > 0) {
									player.location.rad += red_planet.rad / 100;
								}
								else {
									player.location.score+=10;
									delete Game.red_planet_list[red_planet.id];
								}

								total_red_planets--;

							}
							else {

								if (player.location.rad > 2) {
								
									red_planet.rad += player.location.rad / 100;
									player.location.rad -= 0.2;
								}
								else {
									//console.log(called);
									if (called) {
										gameover.display_winner(Game,player.location.id);
										Game.overstate = true;
										//delete Game.id;										
						
									}
									called = false;
								}

							}
						}
						else {
							//console.log("you are of wrong type");
							player.location.rad--;
							//console.log(Game.overstate);
							if (player.location.rad < 3) {
								gameover.display_winner(Game,player.location.id);
								Game.overstate = true;
								//delete Game.id;
								//delete Game.player_list[player.username]
							}
							else {
								red_planet.rad += player.location.rad / 100;
							}
							total_red_planets--;
						}

					}

				}
			}


		}


	}


}