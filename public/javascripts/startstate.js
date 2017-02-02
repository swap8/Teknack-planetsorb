GameState.start = {
    preload: function () {
        game.load.image('backstart', './images/spacetile.jpg');
        game.load.image('singleplayer', './images/singleplayerai.png');
        game.load.image('multiplayer', './images/multiplayer.jpg');
        game.load.image('matter', './images/earth.png');
        game.load.image('peopleplanet', './images/peopleplanet.png');
        game.load.image('antimatter', './images/mars.png');
        game.load.image('over', './images/over1.jpg');
        game.load.image('playagain', './images/playagain.png');
        game.load.image('blackhole', './images/blackhole2.png');
        game.load.image('fireball', './images/fireball.png');
        game.load.image('asteroid', './images/asteroid.png');

        game.load.image('man', './images/spaceman.png');
        game.load.image('ship', './images/spaceship.png');
        game.load.image('spaceportalborder', './images/spaceportalborder.png');
        game.load.image('portal', './images/portal.png');
        game.load.image('ufo', './images/ufo.png');
        game.load.image('nstar','./images/nstar.png');

        game.load.image('saturn', './images/saturn.png');
        game.load.image('rules', './images/smile.png');
        game.load.image('rulesbg', './images/rulespg.jpg');
        game.load.image('storybg', './images/storybg.jpg');
        game.load.image('storybt', './images/storybt.png');
        game.load.image('homebt', './images/home.png');



    },
    create: function () {

        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.add.tileSprite(0, 0, winwidth, winheight, 'backstart');
        //game.add.sprite(winwidth/2,winheight/2,'buttonimage');
        singleplayerbutton = game.add.button(winwidth / 2, winheight / 2.8, 'singleplayer', botsattack, this, 2, 1, 0);
        singleplayerbutton.scale.setTo(1, 1);
        singleplayerbutton.anchor.setTo(0.5, 0.5);
        startbutton = game.add.button(winwidth / 2, winheight / 1.8, 'multiplayer', actionOnClick, this, 2, 1, 0);
        startbutton.scale.setTo(0.25, 0.25);
        startbutton.anchor.setTo(0.5, 0.5);

        rulesbutton = game.add.button(750, 570, 'rules', rulespgclick, this, 2, 1, 0);
        rulesbutton.scale.setTo(0.3, 0.3);
        rulesbutton.anchor.setTo(0.5, 0.5);

        storybutton = game.add.button(1050, 270, 'storybt', storyline, this, 2, 1, 0);
        storybutton.scale.setTo(0.3, 0.3);

        var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
        var text = game.add.text(winwidth / 2, winheight / 6, "Planetsorb", style);
        text.anchor.setTo(0.5, 0.5);
    }
}