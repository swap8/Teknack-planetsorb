var player = require('./player');
var boundry = require('./boundry');
var AI_logic = require('./AI_logic');
var self = module.exports = {

    create_bot: function () {
        var bot = {
            name: 'Artificial Intelligence',
            x: 1100,
            y: 350,
            rad: 18,
            status: '',
            score: 0
        };
        return bot;
    },

    create_player: function (id) {

        var assignvalues = {
            x: 400,
            y: 350,
            rad: 18,
            id: id,
            score: 0,
            maxSpeed: 3,
            pressingRight: false,
            pressingLeft: false,
            pressingUp: false,
            pressingDown: false,
        };
        assignvalues.updatePosition = function () {
            if (assignvalues.pressingRight) {
                var right = boundry.checkboundry_right(assignvalues.x);
                if (right) {
                    assignvalues.x += assignvalues.maxSpeed;
                }
            }
            if (assignvalues.pressingLeft) {
                var left = boundry.checkboundry_left(assignvalues.x);
                if (left) {
                    assignvalues.x -= assignvalues.maxSpeed;
                }
            }
            if (assignvalues.pressingDown) {
                var down = boundry.checkboundry_down(assignvalues.y);
                if (down) {
                    assignvalues.y += assignvalues.maxSpeed;
                }
            }
            if (assignvalues.pressingUp) {
                var up = boundry.checkboundry_up(assignvalues.y);
                if (up) {
                    assignvalues.y -= assignvalues.maxSpeed;
                }
            }
        }
        return assignvalues;
    },

    assignPlayerPosition: function (Game) {
        var pack = [];
        Game.player.location.updatePosition();
        pack.push({
            x: Game.player.location.x,
            y: Game.player.location.y,
            rad: Game.player.location.rad
        })
        return pack;
    },

    assignbotposition: function (Game) {
        var pack = [];
        AI_logic.modify_bot_position(Game);
        pack.push({
            x: Game.bot.x,
            y: Game.bot.y,
            rad: Game.bot.rad
        })
        return pack;
    },

    assing_planet_location: function (id, x, y, rad) {
        var planet = {
            id: id,
            x: x,
            y: y,
            fade: false,
            rad: rad
        }
        return planet;
    },

    create_planet: function () {

        var WIDTH = 1520;
        var HEIGHT = 680;
        var fixed_increment = 65;
        var fixed_start = 30;
        var width_constant = 700;
        var height_constant = 350;
        var no_of_planets = 25;
        var planet_list = {};

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

        for (i = 0; i < no_of_planets; i++) {
            var x = Math.floor(Math.random() * 1520);
            var y = Math.floor(Math.random() * 700);
            var radius = Math.floor(Math.random() * 20 + 5);
            var id = Math.random().toString(36).substring(7);


            if (((x > lower_limit_player_position_x && x < higher_limit_player_position_x) && (y > lower_limit_player_position_y && y < higher_limit_player_position_y)) || ((x > lower_limit_next_player_position_x && x < higher_limit_next_player_position_x) && (y > lower_limit_next_player_position_y && y < higher_limit_next_player_position_y))) {
                //these means in the earlier point the planets and players are colliding keep them away from you
            }
            else if ((x > lowerx && x < higherx) && (y > lowery && y < highery)) {

            }
            else {
                var planet = self.assing_planet_location(id, x, y, radius);
                planet_list[id] = planet;
            }
        }
        return planet_list;
    },

    assignplanetposition: function (Game) {
        var pack = [];
        for (var i in Game.planetlist) {
            var planet = Game.planetlist[i];
            //console.log(planet);
            //console.log(planet.fade);
            pack.push({
                x: planet.x,
                y: planet.y,
                rad: planet.rad,
                fade: planet.fade
            })
        }
        return pack;
    },

    find_size_of_gamelist: function (Game) {
        var size = Object.keys(Game.planetlist).length;
        var templist;
        if (size < 15) {
            templist = self.create_planet();
            for (var i in templist) {
                var planet = templist[i];
                Game.planetlist[planet.id] = planet;
            }
        }
    },

    //--------------- asteroid creation -----------
    create_asteroid: function (x,y) {
        var asteroid = {
            x: x,
            y: y,
            radius: 18
        };
        return asteroid;

    },

    // ----------------- astronaut creation ----------
    create_man: function (x,y) {
        //console.log("plz");
        var man = {
            x: x,
            y: y,
            radius: 20
        };
        return man;
    },

    // ----------------- spaceship creation ----------
    create_ship: function (x,y) {
        //console.log("plz");
        var ship = {
            x: x,
            y: y,
            radius: 20
        };
        return ship;
    },
    //-------------- saturn -------------
    create_saturn: function(){
        var saturn= {
            x: 850,
            y: 650,
            radius: 80
        };
        return saturn;
    },

    saturn_assign_position: function(Game){
        var pack = [];
        pack.push({
            x: Game.saturn_add.x,
            y: Game.saturn_add.y,
            rad: Game.saturn_add.radius
        })
        return pack;
    }
}