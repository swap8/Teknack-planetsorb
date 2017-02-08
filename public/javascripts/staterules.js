//---------------- rules page----------------
GameState.gamerules = {
    preload: function () {


    },

    create: function () {



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


        // var rulestext = "A black hole can only absorb those objects who have size smaller than itself\n\nWinning\nThe games ends when another black hole absorbs you or black hole size reduces to \nsingularity\nThe Game is also time bound. When time runs out player with larger size wins\n\nSingle Player Rules\n1. Out smart the bot black hole to grow larger in size\n2. Absorb bonus objects to boost size\n\nMultiplayer Rules\n1. Absorb only your specific colour. contact with enemy black hole\nor opposite colour makes you shrink.\n2. Absorb incoming fireballs to grow in size.\n\n";
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        //game.add.tileSprite(0, 0, winwidth, winheight, 'rulesbg');

        //game.debug.text(winheight);
        //game.debug.text(winwidth, 23, 43);
        //--------title----------
        //var title = game.add.text(0, 0, 'RULES AND TIPS', style);


        var style = { font: "20px Arial", fill: "#fff", align: "left", wordwrap: true, wordWrapWidth: 300 };

        // var text = game.add.text(100, 100, rulestext, style);
        // text.setTextBounds(16, 16, 600, 600);
        // text.anchor.x = 0;  

        var text = game.add.text(160, 150, 'A black hole can only absorb those objects who have size smaller than itself.', style)


        var htp = game.add.sprite(600, 0, 'htp');
        htp.scale.setTo(0.4, 0.4);

        blackhole = game.add.sprite(60, 150, 'blackhole');
        blackhole.scale.setTo(0.12, 0.12);
        blackhole.anchor.setTo(0.6, 0.6);

        circleGroup = game.add.group();
        circleGroup.x = game.world.centerX;
        circleGroup.y = game.world.centerY;


        endgame = game.add.sprite(-100, 200, 'endgame');
        endgame.scale.setTo(0.25, 0.25);

        circleGroup.add(endgame);

        var text = game.add.text(350, 610, 'The games ends when another black hole absorbs you or black hole size reduces too much\nThe Game is also time bound. When time runs out player with larger size wins', style)


        homebutton = game.add.button(1400, 580, 'homebt', gohome, this, 2, 1, 0);
        homebutton.scale.setTo(0.05, 0.05);
        fireball_list = {};
        var create_fireball = function () {

            var fireball = {
                id: Math.random() * 200,
                x: Math.random() * 1520,
                y: 700
            };
            console.log(fireball);
            fireball_list[fireball.id] = fireball;
        }

        // fireball = game.add.sprite();
        for (var i = 0; i < 25; i++) {
            create_fireball();
        }
        console.log(fireball_list);
        var pack = [];
        var move_fireball = function (fireball) {
            if (fireball.y < 0) {
                delete fireball_list[fireball.id];
            }
            fireball.x++;
            fireball.y--;
            pack.push({
                x: fireball.x,
                y: fireball.y
            })
            return pack;

        }
       


    },

    update: function () {
        blackhole.angle++;
        var baseScale = 1;
        var speed = 0.01;
        var magnitude = 0.05;
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