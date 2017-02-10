var music;
var titles = ['START','SINGLEPLAYER','VIEW MY FRIENDS', 'ACCEPT REQUESTS', 'HOW TO PLAY', 'STORY', 'ADD A FRIEND', 'PROFILE', 'MULTIPLAYER'];

GameState.start = {
    preload: function () {

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
        game.world.bringToTop(icongrp);
        
        appear(replay);
        appear(singleplayerbutton);
        appear(friendslist);
        appear(accfrnd);
        appear(how);
        appear(story);
        appear(addfrnd);
        appear(profile);
        appear(multiplayer);
    }, 3000);
    
    planetgroup = game.add.group();
    icongrp = game.add.group();

       // start
        replay = game.add.sprite(130, 340, 'playagain');
        replay.anchor.setTo(0.5, 0.5);
        replay.scale.setTo(0.09, 0.09);
        
        icongrp.add(replay);

        //single player
        singleplayerbutton = game.add.button(370, 340, 'mercury', botsattack, this, 2, 1, 0);
        singleplayerbutton.scale.setTo(0.46, 0.46);
        singleplayerbutton.anchor.setTo(0.5, 0.5);
        icongrp.add(singleplayerbutton);

        //story
        story = game.add.button(960, 340, 'nstar', storyline, this, 2, 1, 0);
        story.scale.setTo(0.12, 0.12);
        story.anchor.setTo(0.5, 0.5);
        icongrp.add(story);
        

        //how to play
        how = game.add.button(800, 340, 'pluto', rulespgclick, this, 2, 1, 0);
        how.scale.setTo(0.5, 0.5);
        how.anchor.setTo(0.5, 0.5);
        icongrp.add(how);

        //multiplayer
        multiplayer = game.add.button(1430, 340, 'antimatter', actionOnClick, this, 2, 1, 0);
        multiplayer.scale.setTo(0.3, 0.3);
        multiplayer.anchor.setTo(0.5, 0.5);
        icongrp.add(multiplayer);

        //search friend
        addfrnd = game.add.button(1140, 340, 'moon', findfriend, this, 2, 1, 0);
        addfrnd.scale.setTo(0.5, 0.5);
        addfrnd.anchor.setTo(0.5, 0.5);
        icongrp.add(addfrnd);

        // accept friend request 
        accfrnd = game.add.button(670, 340, 'venus', see_request, this, 2, 1, 0);
        accfrnd.scale.setTo(0.5, 0.5);
        accfrnd.anchor.setTo(0.5, 0.5);
        icongrp.add(accfrnd);

        // profile
        profile = game.add.button(1270, 340, 'psaturn', see_profile, this, 2, 1, 0);
        profile.scale.setTo(0.5, 0.5);
        profile.anchor.setTo(0.5, 0.5);
        profile.angle = -15;
        icongrp.add(profile);

        // My friends
        friendslist = game.add.button(510, 340, 'urenus', friends, this, 2, 1, 0);
        friendslist.scale.setTo(0.5, 0.5);
        friendslist.anchor.setTo(0.5, 0.5);
        friendslist.angle = 5;
        icongrp.add(friendslist);

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
        game.add.tween(replay).to({ x: 520, y: 340 }, 3000, Phaser.Easing.Exponential.Out, true, 800, 0, false);
        game.add.tween(multiplayer).to({ x: 830, y: 90 }, 3000, Phaser.Easing.Exponential.Out, true, 800, 0, false);
        game.add.tween(friendslist).to({ x: 1060, y: 420 }, 3000, Phaser.Easing.Exponential.Out, true, 800, 0, false);
        game.add.tween(addfrnd).to({ x: 710, y: 470 }, 3000, Phaser.Easing.Exponential.Out, true, 800, 0, false);
        game.add.tween(profile).to({ x: 860, y: 300 }, 3000, Phaser.Easing.Exponential.Out, true, 800, 0, false);
        game.add.tween(accfrnd).to({ x: 1170, y: 550 }, 3000, Phaser.Easing.Exponential.Out, true, 800, 0, false);
        game.add.tween(story).to({ x: 550, y: 560 }, 3000, Phaser.Easing.Exponential.Out, true, 800, 0, false);
        game.add.tween(how).to({ x: 350, y: 550 }, 3000, Phaser.Easing.Exponential.Out, true, 800, 0, false);
        game.add.tween(singleplayerbutton).to({ x: 610, y: 160 }, 3000, Phaser.Easing.Exponential.Out, true, 800, 0, false);

        //--------------dots lines -----------------

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
            planetgroup.add(step);
                
            }
        }//end of calc

        function appear(x){
            // console.log("count before:" + ind);
           play = game.add.text(x.x, x.y+60, titles[ind], iconstyle);
           play.anchor.setTo(0.5,0.5);
           play.scale.setTo(0.5,0.5);
           planetgroup.add(play);
           ind++;
            // console.log("count after:" + ind);
        }
    }
    
}