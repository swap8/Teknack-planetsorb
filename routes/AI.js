var self = module.exports = {

    create_bot: function () {

        var bot = {
            x: 1100,
            y: 350,
            rad: 18
        };

        return bot;
    },

    create_player: function (id) {

        var assignvalues = {
            x: 400,
            y: 350,
            rad: 18,
            id: id,
            maxSpeed : 2,
            pressingRight: false,
            pressingLeft: false,
            pressingUp: false,
            pressingDown: false,
        };
        assignvalues.updatePosition = function () {
            if (assignvalues.pressingRight)
                assignvalues.x += assignvalues.maxSpeed;
            if (assignvalues.pressingLeft)
                assignvalues.x -= assignvalues.maxSpeed;
            if (assignvalues.pressingDown)
                assignvalues.y += assignvalues.maxSpeed;
            if (assignvalues.pressingUp)
                assignvalues.y -= assignvalues.maxSpeed;

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


        pack.push({
            x: Game.bot.x,
            y: Game.bot.y,
            rad: Game.bot.rad

        })

        return pack;
    },

}