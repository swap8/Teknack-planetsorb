var music;
var titles = ['START','SINGLEPLAYER','VIEW MY FRIENDS', 'ACCEPT REQUESTS', 'HOW TO PLAY', 'STORY', 'ADD A FRIEND', 'PROFILE', 'MULTIPLAYER'];

GameState.start = {
    preload: function () {
        game.load.image('backstart', './images/startbackground.png');
        game.load.image('singleplayer', './images/singleplayerai.png');
        game.load.image('multiplayer', './images/multiplayer.jpg');
        game.load.image('matter', './images/earth10.png');
        game.load.image('peopleplanet', './images/peopleplanet.png');
        game.load.image('antimatter', './images/mars1.png');
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


    },
    create: function () {
        var ind=0;
        iconstyle={ fontSize: '30px', fill: 'yellow' };
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;

        music = game.add.audio('maintheme');
        music.loop = true;
        music.play();

        var backstart = game.add.sprite(-50, -50, 'backstart');
        backstart.scale.setTo(0.5, 0.5);

        //-------------------to generate titles and dotted path--------------
         setTimeout(function() {
        calc(replay.x,singleplayerbutton.x,replay.y,singleplayerbutton.y);
        calc(singleplayerbutton.x,multiplayer.x,singleplayerbutton.y,multiplayer.y);
        calc(how.x,story.x,how.y,story.y);
        calc(story.x,addfrnd.x,story.y,addfrnd.y);
        calc(addfrnd.x,replay.x,addfrnd.y,replay.y);
        calc(replay.x,profile.x,replay.y,profile.y);
        calc(profile.x,friendslist.x,profile.y,friendslist.y);
        calc(addfrnd.x,profile.x,addfrnd.y,profile.y);
        calc(friendslist.x,accfrnd.x,friendslist.y,accfrnd.y);
        game.world.bringToTop(planetgroup);
        
        appear(replay);
        appear(singleplayerbutton);
        appear(friendslist);
        appear(accfrnd);
        appear(how);
        appear(story);
        appear(addfrnd);
        appear(profile);
        appear(multiplayer);
    }, 4000);
    
    planetgroup = game.add.group();

       // start
        replay = game.add.sprite(130, 340, 'playagain');
        replay.anchor.setTo(0.5, 0.5);
        replay.scale.setTo(0.09, 0.09);
        
        planetgroup.add(replay);

        //single player
        singleplayerbutton = game.add.button(170, 340, 'mercury', botsattack, this, 2, 1, 0);
        singleplayerbutton.scale.setTo(0.46, 0.46);
        singleplayerbutton.anchor.setTo(0.5, 0.5);
        planetgroup.add(singleplayerbutton);

        //story
        story = game.add.button(960, 340, 'nstar', storyline, this, 2, 1, 0);
        story.scale.setTo(0.12, 0.12);
        story.anchor.setTo(0.5, 0.5);
        planetgroup.add(story);

        //how to play
        how = game.add.button(800, 340, 'pluto', rulespgclick, this, 2, 1, 0);
        how.scale.setTo(0.5, 0.5);
        how.anchor.setTo(0.5, 0.5);
        planetgroup.add(how);

        //multiplayer
        multiplayer = game.add.button(1430, 340, 'antimatter', actionOnClick, this, 2, 1, 0);
        multiplayer.scale.setTo(0.3, 0.3);
        multiplayer.anchor.setTo(0.5, 0.5);
        planetgroup.add(multiplayer);

        //search friend
        addfrnd = game.add.button(1140, 340, 'moon', findfriend, this, 2, 1, 0);
        addfrnd.scale.setTo(0.5, 0.5);
        addfrnd.anchor.setTo(0.5, 0.5);
        planetgroup.add(addfrnd);

        // accept friend request 
        accfrnd = game.add.button(670, 340, 'venus', see_request, this, 2, 1, 0);
        accfrnd.scale.setTo(0.5, 0.5);
        accfrnd.anchor.setTo(0.5, 0.5);
        planetgroup.add(accfrnd);

        // profile
        profile = game.add.button(1270, 340, 'psaturn', see_profile, this, 2, 1, 0);
        profile.scale.setTo(0.5, 0.5);
        profile.anchor.setTo(0.5, 0.5);
        profile.angle = -15;
        planetgroup.add(profile);

        // My friends
        friendslist = game.add.button(510, 340, 'urenus', friends, this, 2, 1, 0);
        friendslist.scale.setTo(0.5, 0.5);
        friendslist.anchor.setTo(0.5, 0.5);
        friendslist.angle = 5;
        planetgroup.add(friendslist);

        // PLANETSORB
        var heading = { font: "90px Impact",  align: "center" };
        var text = game.add.text(1180, 220, "PLANET-SORB", heading);
        text.anchor.setTo(0.5, 0.5);
        text.scale.setTo(1,1);
        text.setShadow(5, 5, 'rgba(255,0,0,3)', 5);
         var grd = text.context.createLinearGradient(0, 0, 0, text.height);

    //  Add in 2 color stops
    grd.addColorStop(0, '#8ED6FF');   
    grd.addColorStop(1, '#004CB3');

    //  And apply to the Text
    text.fill = grd;
    game.add.tween(text).to({alpha:0},2000,Phaser.Easing.Linear.None,true,0,-1,true);

        //----------------experimental stuff----------------
        game.add.tween(replay).to({ x: 520, y: 340 }, 3000, Phaser.Easing.Exponential.Out, true, 1500, 0, false);
        game.add.tween(multiplayer).to({ x: 830, y: 90 }, 3000, Phaser.Easing.Exponential.Out, true, 1500, 0, false);
        game.add.tween(friendslist).to({ x: 1060, y: 420 }, 3000, Phaser.Easing.Exponential.Out, true, 1500, 0, false);
        game.add.tween(addfrnd).to({ x: 710, y: 470 }, 3000, Phaser.Easing.Exponential.Out, true, 1500, 0, false);
        game.add.tween(profile).to({ x: 860, y: 300 }, 3000, Phaser.Easing.Exponential.Out, true, 1500, 0, false);
        game.add.tween(accfrnd).to({ x: 1170, y: 550 }, 3000, Phaser.Easing.Exponential.Out, true, 1500, 0, false);
        game.add.tween(story).to({ x: 550, y: 560 }, 3000, Phaser.Easing.Exponential.Out, true, 1500, 0, false);
        game.add.tween(how).to({ x: 350, y: 550 }, 3000, Phaser.Easing.Exponential.Out, true, 1500, 0, false);
        game.add.tween(singleplayerbutton).to({ x: 610, y: 160 }, 3000, Phaser.Easing.Exponential.Out, true, 1500, 0, false);

        //--------------dots lines -----------------

        // multiple_add = 520;
        // multiple = 45;
        // space = 5;
        // y = 70;
        // for (var i = 0; i < 15; i++) {
        //     multiple_add += 30;
        //     var step = game.add.sprite(multiple + multiple_add + space, 70, 'steps');
        //     step.scale.setTo(0.05, 0.05);
        //     step.anchor.setTo(0.5, 0.5);
        // }
       
        
        // space = 90;
        // var morespace = 15;
        // for (var i = 0; i < 5; i++) {
        //     morespace += 10;
        //     var step = game.add.sprite(50 + morespace, 100 + space, 'steps');
        //     step.scale.setTo(0.2, 0.2);
        //     space += 63;
        // }

        // space = 90;
        // for (var i = 0; i < 5; i++) {
        //     var step = game.add.sprite(700 + space, 525, 'steps');
        //     step.scale.setTo(0.2, 0.2);
        //     space += 63;
        // }

        // space = 90;
        // for (var i = 0; i < 7; i++) {
        //     var step = game.add.sprite(140 + space, 525, 'steps');
        //     step.scale.setTo(0.2, 0.2);
        //     space += 63;
        // }

        // space = 90;
        // morespace = 5;
        // for (var i = 0; i < 7; i++) {
        //     var step = game.add.sprite(355 + space, 320 - morespace, 'steps');
        //     step.scale.setTo(0.2, 0.2);
        //     space += 63;
        //     morespace += 5;
        // }


        // space = 90;
        // vary = 10;
        // for (var i = 0; i < 3; i++) {
        //     var step = game.add.sprite(740 + space, 90 + vary, 'steps');
        //     step.scale.setTo(0.2, 0.2);
        //     space += 63;
        //     vary += 10;
        // }

        // space = 90;
        // vary = 10;
        // for (var i = 0; i < 3; i++) {
        //     var step = game.add.sprite(1050 + space, 130 + vary, 'steps');
        //     step.scale.setTo(0.2, 0.2);
        //     space += 63;
        //     vary += 50;
        // }

        // space = 90;
        // vary = 10;
        // for (var i = 0; i < 3; i++) {
        //     var step = game.add.sprite(1050 + space, 480 + vary, 'steps');
        //     step.scale.setTo(0.2, 0.2);
        //     space += 63;
        //     vary -= 50;
        // }
        
        function calc(x1, x2, y1, y2) {
          var s , space = 10;
          var  x=x1;
          var  y=y1;
          var  dx = (x2 - x1);
          var  dy = (y2 - y1);
            if (Math.abs(dx) > Math.abs(dy)) {
                s = 10;
            }
            else {
                s = 10;
            }
            var xi = dx / s;
            var yi = dy / s;
            
            for (var k = 0; k < s; k++) {
                x = x + xi;
                y = y + yi;
                // console.log("X:"+ Math.abs(x)+ "  Y:" + Math.abs(y));
                var step = game.add.sprite(x,y, 'steps');
            step.scale.setTo(0.05, 0.05);
            step.anchor.setTo(0.5, 0.5);
                
            }
        }//end of calc

        function appear(x){
            console.log("count before:" + ind);
           play = game.add.text(x.x, x.y+60, titles[ind], iconstyle);
           play.anchor.setTo(0.5,0.5);
           play.scale.setTo(0.5,0.5);
           ind++;
            // console.log("count after:" + ind);
        }
    }
    
}