
var singlemusic;
//for bots - play a single player mission
GameState.bots = {
    preload: function () {

    },
    create: function () {
        singlemusic=game.add.audio('singlemusic');
        singlemusic.play();
        //console.log("I am ready!");
         flash_once = true;
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


        myGroup = game.add.group();
        socket = io();
        var single_id;
        call_only_once_single_player = true;
        graphics = game.add.graphics(0, 0);
        graphics.beginFill(0x6A5E76, 1);
        graphics.moveTo(340, 0);
        graphics.lineTo(1180, 0);
        graphics.lineTo(1140, 70);
        graphics.lineTo(380, 70);
        graphics.endFill();
        graphics.fixedToCamera = true;
        game.world.setBounds(-100, -100, 2000, 1000);


        cursors = game.input.keyboard.createCursorKeys();
        wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        };

        socket.on('send_socket_id', function (data) {
            single_id = data;
            socket.emit('single_player_mission', single_id);
        });
        myGroup = game.add.group();
        socket.on('bot_game', function (data) {
            //console.log("hiii");
            // console.log(data.planet);
            myGroup.destroy();
            myGroup = game.add.group();

            //var portal_border = game.add.sprite(500, 500, 'portal');


            for (var i = 0; i < data.planet.length; i++) {
                //console.log(data.planet[i].fade);
                var planet = game.add.sprite(data.planet[i].x, data.planet[i].y, 'antimatter');
                planet.anchor.setTo(0.5, 0.5);
                planet.angle = redplanetangle();
                var radius = data.planet[i].rad / 140;
                planet_scale = radius;
                if (!data.planet[i].fade) {
                    planet.alpha = 0.7;
                }
                planet.scale.setTo(planet_scale, planet_scale);
                myGroup.add(planet);
            }
            
                  // ----------------------portal --------------------------------
            for (var i = 0; i < data.portal.length; i++) {
                if(flash_once){
                    game.camera.flash(0xffffff, 500);
                    flash_once = false;
                }
                portal_border = game.add.sprite(data.portal[i].x, data.portal[i].y, 'spaceportalborder');
                portal_border.anchor.setTo(0.5, 0.5);
                portal_border.scale.setTo(0.25, 0.25);
                myGroup.add(portal_border);
                portal = game.add.sprite(data.portal[i].x, data.portal[i].y, 'portal');
                portal.anchor.setTo(0.5, 0.5);
                portal.scale.setTo(0.24, 0.24);
                portal.angle = calangle();
                myGroup.add(portal);
            }
            
            for (var i = 0; i < data.player.length; i++) {
                if (data.player[i].rad > 1) {
                    //console.log(data.player[i].y);
                    player = game.add.sprite(data.player[i].x, data.player[i].y, 'blackhole');
                    game.camera.follow(player);
                    //player.scale.setTo(0.2, 0.2);
                    player.anchor.setTo(0.5, 0.5);
                    var radius = data.player[i].rad / 380;
                    player_scale = radius;
                    player.scale.setTo(player_scale, player_scale);
                    player.angle = calangle();
                    myGroup.add(player);
                }
            }
            for (var i = 0; i < data.bot.length; i++) {
                if (data.bot[i].rad > 1) {
                    bot = game.add.sprite(data.bot[i].x, data.bot[i].y, 'blackhole');
                    bot.cameraOffset.setTo(200, 500);
                    //game.camera.follow(bot);
                    //player.scale.setTo(0.2, 0.2);
                    bot.anchor.setTo(0.5, 0.5);
                    var radius = data.bot[i].rad / 380;
                    player_scale = radius;
                    bot.scale.setTo(player_scale, player_scale);
                    bot.angle = calangle();
                    myGroup.add(bot);
                }
            }

            // --------------- asteroid ------------------
            for (var i = 0; i < data.asteroid.length; i++) {

                //console.log(data.asteroid);
                asteroid = game.add.sprite(data.asteroid[i].x, data.asteroid[i].y, 'asteroid');
                //player.scale.setTo(0.2, 0.2);
                asteroid.anchor.setTo(0.5, 0.5);
                //asteroid.alpha = 0;
                //game.add.tween(asteroid).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
                var radius = data.asteroid[i].rad / 50;
                asteroid_scale = radius;
                asteroid.scale.setTo(asteroid_scale, asteroid_scale);
                asteroid.angle = astangle();
                myGroup.add(asteroid);

            }

            // ----------------------man --------------------------------
            for (var i = 0; i < data.man.length; i++) {

                //console.log(data.man);
                man = game.add.sprite(data.man[i].x, data.man[i].y, 'man');
                //player.scale.setTo(0.2, 0.2);
                man.anchor.setTo(0.5, 0.5);
                var radius = data.man[i].rad / 100;
                man_scale = radius;
                man.scale.setTo(man_scale, man_scale);
                man.angle = manangle();
                myGroup.add(man);
            }

            // ----------------------ship --------------------------------
            for (var i = 0; i < data.ship.length; i++) {

                //console.log(data.man);
                ship = game.add.sprite(data.ship[i].x, data.ship[i].y, 'ship');
                //player.scale.setTo(0.2, 0.2);
                ship.anchor.setTo(0.5, 0.5);
                var radius = data.ship[i].rad / 380;
                ship_scale = radius;
                ship.scale.setTo(ship_scale, ship_scale);

                ship.angle = spaceshipangle();
                myGroup.add(ship);


            }

            //--------------------saturn--------------
            for (var i = 0; i < data.saturn.length; i++) {
                saturn = game.add.sprite(data.saturn[i].x, data.saturn[i].y, 'saturn');
                saturn.anchor.setTo(0.5, 0.5);
                var radius = data.saturn[i].rad / 380;
                saturn_scale = radius;
                saturn.scale.setTo(saturn_scale, saturn_scale);
                saturn.angle = manangle();
                myGroup.add(saturn);

            }

            // ----------------------superstar --------------------------------
            for (var i = 0; i < data.nstar.length; i++) {
                nstar = game.add.sprite(data.nstar[i].x, data.nstar[i].y, 'nstar');
                nstar.anchor.setTo(0.5, 0.5);
                var radius = data.nstar[i].rad / 380;
                nstar_scale = radius;
                nstar.scale.setTo(nstar_scale, nstar_scale);
                nstar.angle = manangle();
                if (data.nstar[i].shake) {
                    game.camera.shake(0.05, 500);
                }
                myGroup.add(nstar);
            }

         

            style = { fontSize: '15px', fill: '#ffffff' }
            mytext = game.add.text(385, 10, data.player_name, style);
            mytext.fixedToCamera = true;
            myGroup.add(mytext);

            mytext = game.add.text(385, 30, "Absorb : Everything", style);
            mytext.fixedToCamera = true;
            myGroup.add(mytext);

            mytext = game.add.text(950, 10, data.bot_name, style);
            mytext.fixedToCamera = true;
            myGroup.add(mytext);

            mytext = game.add.text(950, 30, "Staus : " + data.bot_status, { fontSize: '14px', fill: '#ffffff' });
            mytext.fixedToCamera = true;
            myGroup.add(mytext);

            mytext = game.add.text(720, 12, 'Time : ' + data.gmtime, { fontSize: '16px', fill: '#ffffff' });
            mytext.fixedToCamera = true;
            myGroup.add(mytext);

            mytext = game.add.text(385, 48, 'Score : ' + data.player_score, style);
            mytext.fixedToCamera = true;
            myGroup.add(mytext);

            mytext = game.add.text(950, 48, 'Score : ' + data.bot_score, style);
            mytext.fixedToCamera = true;
            myGroup.add(mytext);


            if (data.gmtime == 0) {
                lock_deadlock_single_player = false;
                if (call_only_once_single_player) {
                    call_only_once_single_player = false;
                    socket.emit('single_player_find_winner', { gameid: data.gameid });
                }
                gamewinner = data.winner;
                lock_deadlock_single_player = true;
                // game.state.start('bot_end');
            }

            if (data.overstate) {
                if (lock_deadlock_single_player) {

                    myGroup.destroy();
                    singlemusic.destroy();
                    socket.emit('single_player_lost', { gameid: data.gameid });
                    music.destroy();
                    game.state.start('bot_end');
                }

            }
        });
    },
    update: function () {

        if (cursors.left.isDown || wasd.left.isDown) {
            socket.emit('keyPress', { InputId: 'left', state: true });
            //game.camera.x -= 4;
        }
        else {
            socket.emit('keyPress', { InputId: 'left', state: false });

        }
        if (cursors.right.isDown || wasd.right.isDown) {
            socket.emit('keyPress', { InputId: 'right', state: true });
            //game.camera.x += 4;
        }
        else {
            socket.emit('keyPress', { InputId: 'right', state: false });
        }
        if (cursors.up.isDown || wasd.up.isDown) {
            socket.emit('keyPress', { InputId: 'up', state: true });
            //game.camera.y -= 4;
        }
        else {
            socket.emit('keyPress', { InputId: 'up', state: false });
        }
        if (cursors.down.isDown || wasd.down.isDown) {
            socket.emit('keyPress', { InputId: 'down', state: true });
            //game.camera.y += 4;
        }
        else {
            socket.emit('keyPress', { InputId: 'down', state: false });
        }



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

    }
}