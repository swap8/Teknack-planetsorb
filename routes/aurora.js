
var self = module.exports = {
    fire_aurora_beam: function (x, y, game_id, game_list, username) {

        var Game, aurora_target_x, aurora_target_y, planet, total_fire;
        var pass_name, playerx_location, playery_location;
        for (var i in game_list) {
            var game = game_list[i];
            if (game_id === game.id) {
                //console.log("game found")
                Game = game;


            }
        }
        if (Game != null) {
            for (var i in Game.Game_list) {
                var player = Game.Game_list[i];
                if (player.location.id === username) {
                    pass_name = username;
                    player.location.total_fire--;
                    total_fire = player.location.total_fire;
                    playerx_location = player.location.x;
                    playery_location = player.location.y;
                }
            }
            if (total_fire > 0) {
                aurora_target_x = x;
                aurora_target_y = y;
                planet = self.check_position(x, y, Game);
                if (planet != undefined) {
                  //  console.log(planet);
                    Game.planetidlist[planet.id] = planet;
                }

                self.create_aurora(Game, playerx_location, playery_location, aurora_target_x, aurora_target_y);
            }

        }


    },


    check_position: function (x, y, Game) {
        var send_planet;
        for (var i in Game.green_planet_list) {
            var green_planet = Game.green_planet_list[i];

            var dx = x - green_planet.x;
            var dy = y - green_planet.y;
            var distance = Math.sqrt((dx * dx) + (dy * dy));

            if (distance < (10 + green_planet.rad)) {
                //console.log("colliding");
                send_planet = green_planet;
            }
        }
        for (var i in Game.red_planet_list) {
            var red_planet = Game.red_planet_list[i];

            var dx = x - red_planet.x;
            var dy = y - red_planet.y;
            var distance = Math.sqrt((dx * dx) + (dy * dy));

            if (distance < (10 + red_planet.rad)) {
                //console.log("colliding");
                send_planet = red_planet;
            }
        }
        return send_planet;

    },


    create_aurora: function (Game, x, y, end_x, end_y) {

        var aurora = {
            id: Math.random() * 200,
            x: x,
            y: y,
            t: 0,
            start_x: x,
            start_y: y,
            end_x: end_x,
            end_y: end_y,
            rad: 10
        };
        Game.aurora_list[aurora.id] = aurora;
    },

    check_collision: function (Game, aurora, planetidlist) {

        for (var i in planetidlist) {
            var planet = planetidlist[i];
            var dx = planet.x - aurora.x;
            var dy = planet.y - aurora.y;
            var distance = Math.sqrt((dx * dx) + (dy * dy));
            if (distance < (aurora.rad + planet.rad)) {
                delete Game.aurora_list[aurora.id];
                delete Game.green_planet_list[planet.id];
                delete Game.red_planet_list[planet.id];
            }
        }


    },
    update_aurora_position: function (Game, aurora_list) {

        for (var i in aurora_list) {
            var aurora = aurora_list[i];
            aurora.x = aurora.start_x + (aurora.end_x - aurora.start_x) * aurora.t;
            aurora.y = aurora.start_y + (aurora.end_y - aurora.start_y) * aurora.t;
            aurora.t += 0.01;

            self.check_collision(Game, aurora, Game.planetidlist);
            // x = x1 + (x2-x1)t;
            // y = y1 + (y2-y1)t;

        }
    },


    show_aurora: function (Game) {
        var pack = [];

        self.update_aurora_position(Game, Game.aurora_list);
        //self.check_collision(Game);
        for (var i in Game.aurora_list) {
            var aurora = Game.aurora_list[i];
            pack.push({
                x: aurora.x,
                y: aurora.y
            })
        }

        return pack;

    }
}