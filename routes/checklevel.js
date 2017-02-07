var self = module.exports = {

    find_level: function (xp) {

        if (xp <= 1000)
            return 1;
        else if (xp <= 2000)
            return 2;
        else if (xp <= 3000)
            return 3;
        else if (xp <= 4000)
            return 4;
        else if (xp <= 5000)
            return 5;
        else if (xp <= 6000)
            return 6;
        else if (xp <= 7000)
            return 7;
        else if (xp <= 8000)
            return 8;
        else if (xp <= 9000)
            return 9;
        else if (xp <= 10000 || xp > 10000)
            return 10;
    }
}