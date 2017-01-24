var self = module.exports = {

	xpos: 400,
	ypos: 350,
	radius: 18,

	//-----------------Create a Player---------------------
	Player: function (id, next_player_location,type) {

		var assignvalues = {

			x: self.xpos + next_player_location,
			y: self.ypos,
			id: id,
			rad: self.radius,
			type:type,
			score: 0,
			pressingRight: false,
			pressingLeft: false,
			pressingUp: false,
			pressingDown: false,
			acceleration_x: 0,
			acceleration_y: 0,
			maxSpeed: 1,

		}
assignvalues.updatePosition = function(){
		if(assignvalues.pressingRight)
			assignvalues.x+=assignvalues.maxSpeed;
		if(assignvalues.pressingLeft)
			assignvalues.x-=assignvalues.maxSpeed;
		if(assignvalues.pressingDown)
			assignvalues.y+=assignvalues.maxSpeed;
		if(assignvalues.pressingUp)
			assignvalues.y-=assignvalues.maxSpeed;
		
	} 
		return assignvalues;
	},

	//-----------Assign player position--------------------------
	assignPlayerPosition: function (Game) {

		var pack = [];
		for (var i in Game.Game_list) {
			var player = Game.Game_list[i];
			player.location.updatePosition();
			pack.push({
				x: player.location.x,
				y: player.location.y,
				rad: player.location.rad
			})
		}
		return pack;
	},

	identify_player_first: function (Game) {
		var temp={};
		for (var i in Game.Game_list) {
			var player = Game.Game_list[i];
			if (player.priority == 0) {
				temp.username = player.username;
				temp.type     = player.location.type;
				temp.score	  = player.location.score;
				return temp;
			}
		}
	},
	identify_player_second: function (Game) {
		var temp={};
		for (var i in Game.Game_list) {
			var player = Game.Game_list[i];
			if (player.priority == 1) {
				temp.username = player.username;
				temp.type     = player.location.type;
				temp.score	  = player.location.score;
				return temp;
			}
		}
	}
}