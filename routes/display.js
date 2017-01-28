
var planet = require('./planet');
var self = module.exports = {
    

//-----------Assign Green Planet positions---------------------
	 assignGreenPlanetPosition : function(Game){

		var planetpack = [];
			for(var i in Game.green_planet_list)
		{
			
			var planet = Game.green_planet_list[i];
			planetpack.push({
				x : planet.x,
				y : planet.y,
				rad : planet.rad
				
			})
		}
		return planetpack;
	},
//-----------Assign Red Planet positions---------------------
	 assignRedPlanetPosition : function(Game){

		var planetpack = [];
			for(var i in Game.red_planet_list)
		{
			
			var planet = Game.red_planet_list[i];
			planetpack.push({
				x : planet.x,
				y : planet.y,
				rad : planet.rad,
				
			})
		}
		return planetpack;
	},
}