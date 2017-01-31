
var player = require('./player');

var self = module.exports = {

	planet_list: {},
	create_planet_ID: function () {
		var planet_ID = Math.random().toString(36).substring(7);
		return planet_ID;
	},

	assign_planet_position: function (id, x, y, radius) {

		var planet = {
			id: id,
			x: x,
			y: y,
			fade:false,
			rad: radius
		}

		return planet;

	},
	create_planet: function (Game) {

		//fixed x and y cordinate map
		var WIDTH = 1520;
		var HEIGHT = 680;
		var fixed_increment = 65;
		var fixed_start = 30;
		var width_constant = 700;
		var height_constant = 350;


		//first player
		var lower_limit_player_position_x = player.xpos - 50;
		var higher_limit_player_position_x = player.xpos + 50;
		var lower_limit_player_position_y = player.ypos - 50;
		var higher_limit_player_position_y = player.ypos + 50;
		//second player
		var lower_limit_next_player_position_x = player.xpos + width_constant - 50;
		var higher_limit_next_player_position_x = player.xpos + width_constant + 50;
		var lower_limit_next_player_position_y = height_constant - 50;
		var higher_limit_next_player_position_y = height_constant + 50;
		//current time and score board
		var lowerx = 340;
		var higherx = 1180;
		var lowery = 0;
		var highery = 70;

		for (var i = fixed_start + 5; i < HEIGHT - 10; i += fixed_increment) {
			for (var j = fixed_start; j < WIDTH; j += fixed_increment) {
				var x = Math.floor((Math.random() * 20)) + j;
				var y = Math.floor((Math.random() * 20)) + i;
				var rad = Math.floor((Math.random() * 15) + 8);
				var id = self.create_planet_ID();
				if (((x > lower_limit_player_position_x && x < higher_limit_player_position_x) && (y > lower_limit_player_position_y && y < higher_limit_player_position_y)) || ((x > lower_limit_next_player_position_x && x < higher_limit_next_player_position_x) && (y > lower_limit_next_player_position_y && y < higher_limit_next_player_position_y))) {
					//these means in the earlier point the planets and players are colliding keep them away from you

				}
				else if ((x > lowerx && x < higherx) && (y > lowery && y < highery)) {

				}
				else {
					var planet = self.assign_planet_position(id, x, y, rad);
					var select_color = Math.floor(Math.random() * 10);
					if (select_color < 5) {
						planet.color = 'green';
						Game.green_planet_list[id] = planet;
					}
					else {
						planet.color = 'red';
						Game.red_planet_list[id] = planet;
					}
					self.planet_list[id] = planet;
				}

			}

		}
		return self.planet_list;


	}



}
