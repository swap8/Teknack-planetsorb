
var planet = require('./planet');
var self = module.exports = {


	//-----------Assign Green Planet positions---------------------
	assignGreenPlanetPosition: function (Game) {
		self.fadegreenplanet(Game);
		var planetpack = [];
		for (var i in Game.green_planet_list) {

			var planet = Game.green_planet_list[i];
			planetpack.push({
				x: planet.x,
				y: planet.y,
				rad: planet.rad,
				fade: planet.fade

			})
		}
		return planetpack;
	},
	//-----------Assign Red Planet positions---------------------
	assignRedPlanetPosition: function (Game) {
		self.faderedplanet(Game);
		var planetpack = [];
		for (var i in Game.red_planet_list) {

			var planet = Game.red_planet_list[i];
			planetpack.push({
				x: planet.x,
				y: planet.y,
				rad: planet.rad,
				fade: planet.fade
			})
		}
		return planetpack;
	},

	fadegreenplanet: function (Game) {
		var greenplayer;
		for (var i in Game.Game_list) {
			var player = Game.Game_list[i];
			if (player.location.type === 'green') {
				greenplayer = player;
			}
		}
		for (var i in Game.green_planet_list) {
			var planet = Game.green_planet_list[i];
			if (planet.rad < greenplayer.location.rad) {
				planet.fade = true;
			}
			else {
				planet.fade = false;
			}
		}
	},

	faderedplanet: function (Game) {
		var greenplayer;
		for (var i in Game.Game_list) {
			var player = Game.Game_list[i];
			if (player.location.type === 'red') {
				redplayer = player;
			}
		}
		for (var i in Game.red_planet_list) {
			var planet = Game.red_planet_list[i];
			if (planet.rad < redplayer.location.rad) {
				planet.fade = true;
			}
			else {
				planet.fade = false;
			}
		}
	},
}