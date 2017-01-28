
var display = require('./display');
var self = module.exports = {

    createfireball: function () {
        var fireball = {};
        fireball.x = Math.floor(Math.random() * 100 + 100);
        fireball.y = 700;
        return fireball;
    },

    render_fireball: function (fireball) {
        fireball.x++;
        fireball.y--;
    }


}