//---------------- rules page----------------
GameState.gamerules = {
    preload: function () {


    },

    create: function () {
        //  game.world.setBounds(0, 0, 2000, 1200);


        if (game.renderType === Phaser.WEBGL) {
            max = 2000;
        }

        var sprites = game.add.spriteBatch();

        balls = [];

        for (var i = 0; i < max; i++) {
            xx[i] = Math.floor(Math.random() * 1600) - 800;
            yy[i] = Math.floor(Math.random() * 1200) - 600;
            zz[i] = Math.floor(Math.random() * 1600) - 800;

            var star = game.make.sprite(0, 0, 'smallstar');
            star.anchor.set(0.5);
            //star.scale.setTo(0,0);
            //star.alpha = 0;

            sprites.addChild(star);
            balls.alpha = 0;
            balls.push(star);
        }

        speedx = tab[tabb + 0];
        speedy = tab[tabb + 1];
        speedz = tab[tabb + 2];

        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        //--------------title sprite-------------
        // var htp = game.add.sprite(600, 0, 'htp');
        // htp.scale.setTo(0.4, 0.4);

        var gentxt = "GENERAL\n1. A black hole can only absorb those objects who have size smaller than itself\n2. Absorb powerups for boost in points \n\nWinning\n The games ends when another black hole absorbs you or black hole size reduces to singularity. The Game is also time bound. When time runs out player with larger size wins";

        var sintxt = "Single Player Rules\n1. Out smart the bot black hole to grow larger in size\n2. Absorb bonus objects to boost size\n\nGAME ENHANCERS\n1. Grab\t\t\t\t\t\t\t\t\t\t\t to boost your size for a limited time\n2. Touch the objects thrown from the portal for increase in score";

        var multxt = "Multiplayer Rules\n1. Absorb only your specific colour. contact with enemy black hole or opposite colour makes you shrink.\n2. Absorb incoming fireballs to grow in size.\n\nGAME ENHANCERS\n1. Grab \t\t\t\t\t\t\t\t\t\t\t to grow in size.\n2. A limited ammo of 20 bullets to DESTROY WHATEVER YOU CLICK!!\n3. After 30 secs into the game you can use special powerup 'E' to absorb any 6 planets in your path";
        var achiv = "ACHIEVEMENTS\n\n1. You can view your achievements in the profile page\n2. Winning a game adds to XP and cumulative score in  'SINGLEPLAYER' and 'MULTIPLAYER' categories.\n3. You can add friends to follow their progress in the game, from the main menu";
        
        var btstyle = { font: "20px Impact", fill: "#fff", align: "left", wordWrap: true, wordWrapWidth: 500 };
        gen = game.add.button(310, 180, 'gen', general, this, 2,1,0);
        gen.anchor.setTo(0.5,0.5);
        gen.scale.setTo(0.3,0.3);
        inst = game.add.text(310,170,'GENERAL INSTRUCTIONS',btstyle)
        inst.anchor.setTo(0.5,0,5);


       
        
        single = game.add.button(310, 330, 'gen', singplyr, this, 2, 1, 0);
        single.anchor.setTo(0.5,0.5);
        single.scale.setTo(0.3,0.3);
        inst = game.add.text(310,320,'SINGLEPLAYER',btstyle)
        inst.anchor.setTo(0.5,0,5);

        multi = game.add.button(310, 480, 'gen', multplyr, this, 2, 1, 0);
        multi.anchor.setTo(0.5,0.5);
        multi.scale.setTo(0.3,0.3);
        inst = game.add.text(310,470,'MULTIPLAYER',btstyle)
        inst.anchor.setTo(0.5,0,5);

        bonus = game.add.button(310, 620, 'bonus', bonus, this, 2, 1, 0);
        bonus.anchor.setTo(0.5,0.5);
        bonus.scale.setTo(0.9, 0.9);

        var rulestyle = { font: "20px Verdana", fill: "#fff", align: "left", wordWrap: true, wordWrapWidth: 500 };
        var colrulestyle = { font: "25px Verdana", fill: "#fff", align: "left", wordWrap: true, wordWrapWidth: 700 };
        var col2rulestyle = { font: "20px bold Arial", fill: "#fff", align: "left", wordWrap: true, wordWrapWidth: 500 };
        txt = game.add.text(50,50, "CLICK BUTTONS FOR MORE INFO",col2rulestyle);

     
        singlgrp = game.add.group();
    multgrp = game.add.group();
    bonusgrp = game.add.group();
    gengrp = game.add.group();

    function general(){
            bonusgrp.destroy();
            bonusgrp = game.add.group();
            singlgrp.destroy();
            singlgrp = game.add.group();
            multgrp.destroy();
            multgrp = game.add.group();
             gm = game.add.text(800, 180, gentxt, colrulestyle);
              gm.anchor.x = 0;
              gengrp.add(gm);
    }

        function multplyr() {
            bonusgrp.destroy();
            bonusgrp = game.add.group();
            singlgrp.destroy();
            singlgrp = game.add.group();
            gengrp.destroy();
             gengrp = game.add.group();
             gm = game.add.text(800, 180, multxt, colrulestyle);
            //text.setTextBounds(16, 16, 600, 600);
             multgrp.add(gm);
              fireball = game.add.sprite(955, 420, 'fireball');
        fireball.anchor.setTo(0.5, 0.5);
        fireball.scale.setTo(0.2, 0.2);

            multgrp.add(fireball);
            gm.anchor.x = 0;
        }
   

        function singplyr() {
            bonusgrp.destroy();
            bonusgrp = game.add.group();
            multgrp.destroy();
            multgrp = game.add.group();
            gengrp.destroy();
             gengrp = game.add.group();
            nstar = game.add.sprite(950, 380, 'nstar');
            nstar.anchor.setTo(0.5, 0.5);
            nstar.scale.setTo(0.07, 0.07);
             gm = game.add.text(800, 180, sintxt, colrulestyle);
            //text.setTextBounds(16, 16, 600, 600);
            gm.anchor.x = 0;
            singlgrp.add(gm);
            singlgrp.add(nstar);
            
        }
        

        function bonus(){
            multgrp.destroy();
            multgrp = game.add.group();
            singlgrp.destroy();
            singlgrp = game.add.group();
             gm = game.add.text(800, 180, achiv, colrulestyle);
             gm.anchor.x=0;
             bonusgrp.add(gm);

        }


        blackhole = game.add.sprite(60, 150, 'blackhole');
        blackhole.scale.setTo(0.12, 0.12);
        blackhole.anchor.setTo(0.6, 0.6);
        game.add.tween(blackhole).to({x:1500, y:600},15000,Phaser.Easing.Sinusoidal.InOut,true,0,-1,true);
        circleGroup = game.add.group();
        circleGroup.x = game.world.centerX;
        circleGroup.y = game.world.centerY;


        endgame = game.add.sprite(-170, -350, 'htp');
        endgame.scale.setTo(0.4, 0.4);

        circleGroup.add(endgame);

        // var text = game.add.text(350, 610, 'The games ends when another black hole absorbs you or black hole size reduces too much\nThe Game is also time bound. When time runs out player with larger size wins', rulestyle)


        homebutton = game.add.button(1400, 580, 'homebt', gohome, this, 2, 1, 0);
        homebutton.scale.setTo(0.05, 0.05);




    },// end of create function

    update: function () {
      
        blackhole.angle++;
        var baseScale = 1;
        var speed = 0.005;
        var magnitude = 0.01;
        circleGroup.scale.setTo(
            baseScale + magnitude * Math.sin(game.time.now * speed),
            baseScale + magnitude * Math.cos(game.time.now * speed)
        );




        delx--;

        if (delx === 0) {
            if (speedz > speedz2) {
                speedz2 += 0.1;
            }

            if (speedz < speedz2) {
                speedz2 -= 0.1;
            }

            if (speedx > speedx2) {
                speedx2 += 0.1;
            }

            if (speedx < speedx2) {
                speedx2 -= 0.1;
            }

            if (speedy > speedy2) {
                speedy2 += 0.1;
            }

            if (speedy < speedy2) {
                speedy2 -= 0.1;
            }

            delx = tab[tabb + 3];
        }

        del--;

        if (del === 0) {
            tabb += 5;

            if (tabb >= tab.length) {
                tabb = 0;
            }

            speedx = tab[tabb + 0.1];
            speedy = tab[tabb + 0.2];
            speedz = tab[tabb + 0.3];

            del = tab[tabb + 0.4];
        }

        for (var i = 0; i < max; i++) {
            var perspective = ppDist / (ppDist - zz[i]);

            balls[i].x = 400 + xx[i] * perspective;
            balls[i].y = 300 + yy[i] * perspective;
            balls[i].alpha = Math.min(perspective / 5, 1);
            balls[i].scale.set(perspective / 10);

            xx[i] += speedx2;

            if (xx[i] < -800) {
                xx[i] = xx[i] + 1600;
            }

            if (xx[i] >= 800) {
                xx[i] = xx[i] - 1600;
            }

            yy[i] += speedy2;

            if (yy[i] < -600) {
                yy[i] = yy[i] + 1200;
            }

            if (yy[i] >= 600) {
                yy[i] = yy[i] - 1200;
            }

            zz[i] -= speedz2;

            if (zz[i] < -800) {
                zz[i] += 1600;
            }

            if (zz[i] > 800) {
                zz[i] -= 1600;
            }

        }

    },

}