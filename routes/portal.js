var AI = require('./AI');
var checkobjectcollision = require('./checkobjectcollision');
var self = module.exports = {
    generate_portal: function (Game) {

        var portal = {
            //x: Math.floor(Math.random() * 1200 + 100),
            //y: Math.floor(Math.random() * 500 + 100)
            x: 500,
            y:500
        };

        var asteroid = AI.create_asteroid(portal.x, portal.y);
        var man = AI.create_man(portal.x, portal.y);
        var ship = AI.create_ship(portal.x, portal.y);
        Game.asteroid = asteroid;
        Game.man = man;
        Game.ship = ship;

        return portal;
    },

    assignportalposition: function (Game) {
        var pack = [];
        checkobjectcollision.detect_collision_between_portal_stuff(Game);
        if (Game.appear_portal) {
            pack.push({
                x: Game.portal.x,
                y: Game.portal.y
            })
        }
        return pack;
    },

    ship_assign_position: function (Game) {
        var pack = [];
        if (Game.appear_portal) {
            self.move_ship_position(Game);
            pack.push({
                x: Game.ship.x,
                y: Game.ship.y,
                rad: Game.ship.radius
            })
        }
        return pack;

    },

    man_assign_position: function (Game) {
        var pack = [];
        if (Game.appear_portal) {
            self.move_man_position(Game);
            pack.push({
                x: Game.man.x,
                y: Game.man.y,
                rad: Game.man.radius
            })
        }

        return pack;
    },

    asteroid_assign_position: function (Game) {
        var pack = [];
        if (Game.appear_portal) {
            self.move_asteroid_position(Game);
            pack.push({
                x: Game.asteroid.x,
                y: Game.asteroid.y,
                rad: Game.asteroid.radius,
            })

        }
        return pack;
    },

    move_asteroid_position: function (Game) {
        var speed = Math.random() * 3 + 2;
        Game.asteroid.x += speed;
        Game.asteroid.y += speed;
    },

    move_man_position: function (Game) {
        var speed = Math.random() * 3 + 3;
        Game.man.x -= speed;
        Game.man.y += speed;
    },

    move_ship_position: function (Game) {
        var speed = Math.random() * 3 + 4;
        Game.ship.x += speed;
        Game.ship.y -= speed;
    }
}