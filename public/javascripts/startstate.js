
GameState.start = {
    preload: function () {
        game.load.image('backstart', './images/startbackground.png');
        game.load.image('singleplayer', './images/singleplayerai.png');
        game.load.image('multiplayer', './images/multiplayer.jpg');
        game.load.image('matter', './images/earth.png');
        game.load.image('peopleplanet', './images/peopleplanet.png');
        game.load.image('antimatter', './images/mars.png');
        game.load.image('over', './images/endmaterial.jpg');
        game.load.image('playagain', './images/overearth.png');
        game.load.image('blackhole', './images/blackhole2.png');
        game.load.image('fireball', './images/fireball.png');
        game.load.image('asteroid', './images/asteroid.png');

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
        game.load.image('accepticon','./images/accepticon.png');


        //----------- Its music time -------------
        game.load.audio('boden', './music/syncloading.mp3');
        game.load.audio('multiplayermusic', './music/multiplayermusic.mp3');

        //--start planets ----------
        game.load.image('moon', './images/moon.png');
        game.load.image('psaturn', './images/saturn1.png');
        game.load.image('urenus', './images/urenus.png');
        game.load.image('pluto', './images/pluto.png');
        game.load.image('venus', '/images/venus.png');
        game.load.image('mercury', './images/mercury.png');
        game.load.image('steps', './images/steps.png');


    },
    create: function () {

        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        var backstart = game.add.sprite(-50, -50, 'backstart');
        backstart.scale.setTo(0.5, 0.5);

        // steps
       
        multiple_add = 50;
        multiple = 45;
        space = 20;
        for (var i = 0; i < 9; i++) {
            multiple_add += 60;
            var step = game.add.sprite(multiple + multiple_add + space, 70, 'steps');
            step.scale.setTo(0.2, 0.2);
        }

        space = 90;
        var morespace = 15;
        for (var i = 0; i < 5; i++) {
            morespace += 10;
            var step = game.add.sprite(50 + morespace, 100 + space, 'steps');
            step.scale.setTo(0.2, 0.2);
            space += 63;
        }

        space = 90;
        for (var i = 0; i < 5; i++) {
            var step = game.add.sprite(700 + space, 525, 'steps');
            step.scale.setTo(0.2, 0.2);
            space += 63;
        }

        space = 90;
        for (var i = 0; i < 7; i++) {
            var step = game.add.sprite(140 + space, 525, 'steps');
            step.scale.setTo(0.2, 0.2);
            space += 63;
        }

        space = 90;
        morespace = 5;
        for (var i = 0; i < 7; i++) {
            var step = game.add.sprite(355 + space, 320 - morespace, 'steps');
            step.scale.setTo(0.2, 0.2);
            space += 63;
            morespace += 5;
        }


        space = 90;
        vary = 10;
        for (var i = 0; i < 3; i++) {
            var step = game.add.sprite(740 + space, 90 + vary, 'steps');
            step.scale.setTo(0.2, 0.2);
            space += 63;
            vary += 10;
        }

        space = 90;
        vary = 10;
        for (var i = 0; i < 3; i++) {
            var step = game.add.sprite(1050 + space, 130 + vary, 'steps');
            step.scale.setTo(0.2, 0.2);
            space += 63;
            vary += 50;
        }

        space = 90;
        vary = 10;
        for (var i = 0; i < 3; i++) {
            var step = game.add.sprite(1050 + space, 480 + vary, 'steps');
            step.scale.setTo(0.2, 0.2);
            space += 63;
            vary -= 50;
        }

        //game.add.tileSprite(0, 0, winwidth, winheight, 'backstart');
        //game.add.sprite(winwidth/2,winheight/2,'buttonimage');

        // start
        replay = game.add.sprite(-20, -40, 'playagain');
        replay.scale.setTo(0.15, 0.15);
        play = game.add.text(80, 165, 'Start', { fontSize: '20px', fill: '#fff' });

        //single player
        singleplayerbutton = game.add.button(winwidth / 2, winheight / 7, 'mercury', botsattack, this, 2, 1, 0);
        singleplayerbutton.scale.setTo(1, 0.95);
        singleplayerbutton.anchor.setTo(0.5, 0.5);
        play = game.add.text(700, 180, 'Single Player', { fontSize: '20px', fill: '#fff' });

        //story
        startbutton = game.add.button(winwidth / 1.6, winheight / 2.2, 'nstar', storyline, this, 2, 1, 0);
        startbutton.scale.setTo(0.2, 0.2);
        startbutton.anchor.setTo(0.5, 0.5);
        play = game.add.text(930, 400, 'story', { fontSize: '20px', fill: '#fff' });

        //how to play
        rulesbutton = game.add.button(750, 550, 'pluto', rulespgclick, this, 2, 1, 0);
        rulesbutton.scale.setTo(1, 0.98);
        rulesbutton.anchor.setTo(0.5, 0.5);
        play = game.add.text(690, 630, 'How To Play', { fontSize: '20px', fill: '#fff' });

        //multiplayer
        storybutton = game.add.button(1250, 270, 'antimatter', actionOnClick, this, 2, 1, 0);
        storybutton.scale.setTo(0.5, 0.49);
        play = game.add.text(1280, 420, 'MultiPlayer', { fontSize: '20px', fill: '#fff' });

        //search friend
        friend = game.add.button(290, 260, 'moon', findfriend, this, 2, 1, 0);
        friend.scale.setTo(0.9, 0.9);
        play = game.add.text(330, 425, 'Add a Friend', { fontSize: '20px', fill: '#fff' });

        // accept friend request 
        newbutton = game.add.button(1000, 70, 'venus', see_request, this, 2, 1, 0);
        newbutton.scale.setTo(1, 0.95);
        play = game.add.text(1180, 150, 'Friend Requests', { fontSize: '20px', fill: '#fff' });

        // profile
        newbutton = game.add.button(1000, 500, 'psaturn', see_profile, this, 2, 1, 0);
        newbutton.scale.setTo(0.7, 0.7);
        newbutton.angle = -15;
        play = game.add.text(1110, 615, 'Profile', { fontSize: '20px', fill: '#fff' });

        // My friends
        newbutton = game.add.button(50, 470, 'urenus', friends, this, 2, 1, 0);
        newbutton.scale.setTo(0.8, 0.8);
        newbutton.angle = 5;
        play = game.add.text(140, 625, 'Friends', { fontSize: '20px', fill: '#fff' });

        // PLANETSORB
        var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
        var text = game.add.text(650, 270, "Planetsorb", { fontSize: '45px', fill: '#fff' });
        text.anchor.setTo(0.5, 0.5);


        


    }
}