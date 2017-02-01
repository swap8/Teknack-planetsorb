var self = module.exports = {
    checkboundry_left: function (x_position) {
        if (x_position < 0) {
            console.log("hii");
            return false;
        }
        else {
            return true;
        }
    },
    checkboundry_right: function (x_position) {
        if (x_position > 1520) {
            console.log("hii");
            return false;
        }
        else {
            return true;
        }
    },

    

    checkboundry_up: function (y_position) {
        if (y_position < 0 ) {
            return false;
        }
        else {
            return true;
        }
    },

    checkboundry_down: function (y_position) {
        if (y_position > 680) {
            return false;
        }
        else {
            return true;
        }
    },
}