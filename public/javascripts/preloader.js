GameState.preloader = function (game) {
    //this.preloadSprite = null;
    ready = false;
};


GameState.preloader.prototype = {
    preload: function () {
        this.preloadBar = this.add.sprite(10, 30, 'preloadbar');
        this.load.setPreloadSprite(this.preloadBar);


        game.load.image('backstart', './images/startbackground.png');
        game.load.image('singleplayer', './images/singleplayerai.png');
        game.load.image('multiplayer', './images/multiplayer.jpg');
        game.load.image('matter', './images/earth1.png');
        game.load.image('peopleplanet', './images/peopleplanet.png');
        game.load.image('antimatter', './images/mars1.png');
        game.load.image('over', './images/endmaterial.jpg');
        game.load.image('playagain', './images/overearth.png');
        game.load.image('blackhole', './images/blackhole2.png');
        game.load.image('fireball', './images/fireball.png');
        game.load.image('asteroid', './images/asteroid.png');
        game.load.image('bonus','./images/bonus.png');
        game.load.image('gen','./images/bttn.png');

        game.load.image('man', './images/spaceman.png');
        game.load.image('ship', './images/spaceship.png');
        game.load.image('spaceportalborder', './images/spaceportalborder.png');
        game.load.image('portal', './images/portal.png');
        game.load.image('ufo', './images/ufo.png');
        game.load.image('nstar', './images/nstar.png');

        game.load.image('saturn', './images/saturn.png');
        game.load.image('rules', './images/howtoplay.png');
        game.load.image('storybg', './images/storybg.jpg');
        game.load.image('storybt', './images/storybt.png');
        game.load.image('homebt', './images/home.png');
        game.load.image('smallstar', './images/large_star.png');
        game.load.image('border', './images/border.png');
        game.load.image('spaceback', './images/spaceback.jpg');
        game.load.image('profile', './images/profile.png');
        game.load.image('connect', './images/connect.jpg');
        game.load.image('next', './images/next.png');
        game.load.image('htp', './images/howtoplayinside.png');
        game.load.image('endgame', './images/endgame.png');
        game.load.image('accepticon', './images/accepticon.png');

        //----------- Its music time -------------
        game.load.audio('boden', './music/syncloading.mp3');
        game.load.audio('multiplayermusic', './music/multiplayermusic.mp3');
        game.load.audio('maintheme', './music/Treasure_Planet_Soundtrack_-_Track_03_12_Years_Later.mp3');
        game.load.audio('singlemusic', './music/singleplayer.mp3');
        game.load.audio('endmusic', './music/end.mp3');
        //--start planets ----------
        game.load.image('moon', './images/moon.png');
        game.load.image('psaturn', './images/saturn1.png');
        game.load.image('urenus', './images/urenus.png');
        game.load.image('pluto', './images/pluto.png');
        game.load.image('venus', '/images/venus.png');
        game.load.image('mercury', './images/mercury.png');
        game.load.image('steps', './images/steps.png');

        //this.load.onLoadComplete.add(this.loadComplete, this);
    },

    loadComplete: function () {
        this.ready = true;
    },


    create: function () {
        this.state.start('start');
    }
};

