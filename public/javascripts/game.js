
winwidth = 1520;
winheight = 680;
var finalwinner = '';
var Player1Text = '';
var Player1Type = '';
var Player1score = 0;
var player2score = 0;
var Player2Type = '';
var Player2Text = '';
var angle = 0;
var green_planet_angle = 0;
var red_planet_angle = 0;
var loading_planet_angle = 0;
var filter;
var sprite;
var astroid_angle = 0;
var lock_deadlock = true;
var multi_id;
var lock_deadlock_single_player = true;
var stop_movements = false;
var call_only_once = true;
var call_only_once_single_player = true;
var single_player_final_winner;

var cursor, wasd;

//var fireball_x_coord;
var game = new Phaser.Game(winwidth, winheight, Phaser.AUTO);

var GameState = {};

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
        var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
        var text = game.add.text(winwidth / 2, winheight / 6, "Planetsorb", style);
        text.anchor.setTo(0.5, 0.5);
    }
}

GameState.end = {
    create: function () {
        game.add.sprite(0, 0, 'over');
        winner = game.add.text(300, 40, 'Winner : ' + finalwinner, { fontSize: '25px', fill: '#fff' });
        replay = game.add.button(winwidth / 3, winheight / 1.5, 'playagain', play_again, this, 2, 1, 0);
        replay.scale.setTo(0.2, 0.2);
        replay.scale.setTo(0.5, 0.5);
    }
}

GameState.bot_end = {
    create: function () {
        game.add.sprite(0, 0, 'over');
        winner = game.add.text(300, 40, 'Winner : ' + gamewinner, { fontSize: '25px', fill: '#fff' });
        replay = game.add.button(winwidth / 3, winheight / 1.5, 'playagain', play_again, this, 2, 1, 0);
        replay.scale.setTo(0.2, 0.2);
        replay.scale.setTo(0.5, 0.5);
    }
}

GameState.main = {
    player: null,

    create: function () {
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        stop_movements = false;
        call_only_once = true;
        socket = io();
        var multi_id = 4;
        socket.on('send_socket_id', function (data) {
            //console.log(data);
            multi_id = data;
            socket.emit('multi_player_mission', multi_id);
            // console.log(multi_id);
        });
        //console.log(multi_id);


        //create a group
        myGroup = game.add.group();
        graphics = game.add.graphics(0, 0);
        graphics.beginFill(0x6A5E76, 1);
        graphics.moveTo(340, 0);
        graphics.lineTo(1180, 0);
        graphics.lineTo(1140, 70);
        graphics.lineTo(380, 70);
        graphics.endFill();
        cursors = game.input.keyboard.createCursorKeys();
        wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        };
        //filter background
        var fragmentSrc = [
            "precision mediump float;",
            "uniform float     time;",
            "uniform vec2      resolution;",
            "uniform vec2      mouse;",
            "#define MAX_ITER 4",
            "void main( void )",
            "{",
            "vec2 v_texCoord = gl_FragCoord.xy / resolution;",
            "vec2 p =  v_texCoord * 8.0 - vec2(20.0);",
            "vec2 i = p;",
            "float c = 1.0;",
            "float inten = .05;",
            "for (int n = 0; n < MAX_ITER; n++)",
            "{",
            "float t = time * (1.0 - (3.0 / float(n+1)));",
            "i = p + vec2(cos(t - i.x) + sin(t + i.y),",
            "sin(t - i.y) + cos(t + i.x));",
            "c += 1.0/length(vec2(p.x / (sin(i.x+t)/inten),",
            "p.y / (cos(i.y+t)/inten)));",
            "}",
            "c /= float(MAX_ITER);",
            "c = 1.5 - sqrt(c);",
            "vec4 texColor = vec4(0.0, 0.01, 0.015, 1.0);",
            "texColor.rgb *= (1.0 / (1.0 - (c + 0.05)));",
            "gl_FragColor = texColor;",
            "}"
        ];
        filter = new Phaser.Filter(game, null, fragmentSrc);
        filter.setResolution(winwidth, winheight);
        sprite = game.add.sprite();
        sprite.width = winwidth;
        sprite.height = winheight;
        sprite.filters = [filter];
        myGroup.add(sprite);

        //loading planet
        loading_planet = game.add.sprite(winwidth / 2, winheight / 2, 'peopleplanet');
        loading_planet.anchor.setTo(0.5, 0.5);
        loading_planet.scale.setTo(0.4, 0.4);
        myGroup.add(loading_planet);
        startgroup = game.add.group();
        var start_text = game.add.text(600, 30, "Game Status : ", { font: "17px Arial", fill: "#ffffff", align: "center" });
        startgroup.add(start_text);
        //text
        var style = { font: "35px Arial", fill: "#ffffff", align: "center" };
        var wait_text = game.add.text(500, 600, "Waiting for another player to Join", style);
        startgroup.add(wait_text);

        socket.on('message', function (data) {

            startgroup.destroy();
            if (data.start_the_game) {
                //game.world.removeAll();
                //console.log("responce");
                stop_movements = true;
                myGroup.destroy();
                myGroup = game.add.group();

                for (var i = 0; i < data.greenPlanet.length; i++) {
                    var matter = game.add.sprite(data.greenPlanet[i].x, data.greenPlanet[i].y, 'matter');
                    matter.anchor.setTo(0.5, 0.5);
                    matter.angle = greenplanetangle();
                    var radius = data.greenPlanet[i].rad / 140;
                    matter_scale = radius;
                    if (!data.greenPlanet[i].fade) {
                        matter.alpha = 0.5;
                    }
                    matter.scale.setTo(matter_scale, matter_scale);
                    myGroup.add(matter);
                }

                for (var i = 0; i < data.redPlanet.length; i++) {
                    var antimatter = game.add.sprite(data.redPlanet[i].x, data.redPlanet[i].y, 'antimatter');
                    antimatter.anchor.setTo(0.5, 0.5);
                    antimatter.angle = redplanetangle();
                    var radius = data.redPlanet[i].rad / 140;
                    antimatter_scale = radius;
                    if (!data.redPlanet[i].fade) {
                        antimatter.alpha = 0.7;
                    }
                    antimatter.scale.setTo(antimatter_scale, antimatter_scale);
                    myGroup.add(antimatter);
                }

                for (var i = 0; i < data.player.length; i++) {
                    if (data.player[i].rad > 1) {
                        player = game.add.sprite(data.player[i].x, data.player[i].y, 'blackhole');
                        //player.scale.setTo(0.2, 0.2);
                        player.anchor.setTo(0.5, 0.5);
                        var radius = data.player[i].rad / 380;
                        player_scale = radius;
                        player.scale.setTo(player_scale, player_scale);
                        player.angle = calangle();
                        myGroup.add(player);
                    }
                }
                style = { fontSize: '14px', fill: '#ffffff' }
                mytext = game.add.text(370, 10, data.player1.username, style);
                myGroup.add(mytext);
                mytext = game.add.text(380, 28, 'Absorb : ' + data.player1.type, style);
                myGroup.add(mytext);
                mytext = game.add.text(385, 48, 'Score : ' + data.player1.score, style);
                myGroup.add(mytext);
                mytext = game.add.text(870, 10, data.player2.username, style);
                myGroup.add(mytext);
                mytext = game.add.text(1050, 28, 'Absorb : ' + data.player2.type, style);
                myGroup.add(mytext);
                mytext = game.add.text(1050, 48, 'Score : ' + data.player2.score, style);
                myGroup.add(mytext);
                mytext = game.add.text(720, 15, 'Time : ' + data.gmtime, { fontSize: '16px', fill: '#ffffff' });
                myGroup.add(mytext);
                finalwinner = data.winner;

                // drawing the fireball image on screen
                for (i = 0; i < data.fireball.length; i++) {
                    //console.log(data.fireball[i].x);
                    fireball_meteor = game.add.sprite(data.fireball[i].x, data.fireball[i].y, 'fireball');
                    fireball_meteor.scale.setTo(0.2, 0.2);
                    fireball_meteor.anchor.setTo(0.5, 0.5);
                    myGroup.add(fireball_meteor);
                }

                if (data.gmtime == 0) {

                    lock_deadlock = false;
                    if (call_only_once) {
                        call_only_once = false;
                        socket.emit('find_winner', { gameid: data.gameid });
                    }
                    lock_deadlock = true;
                }
                if (data.overstate) {
                    if (lock_deadlock) {
                        myGroup.destroy();
                        socket.emit('communication_lost', { communication: true });
                        socket.emit('player_lost', { gameid: data.gameid });
                        game.state.start('end');
                    }
                }
            }
            else {
                startgroup = game.add.group();
                style = { fontSize: '14px', fill: '#ffffff' }
                mytext = game.add.text(370, 10, data.player1.username, style);
                startgroup.add(mytext);

                mytext = game.add.text(870, 10, data.player2.username, style);
                startgroup.add(mytext);

                mytext = game.add.text(1050, 28, 'Absorb : ' + data.player2.type, style);
                startgroup.add(mytext);

                mytext = game.add.text(380, 28, 'Absorb : ' + data.player1.type, style);
                startgroup.add(mytext);

                start_text = game.add.text(600, 30, "Game Status : Your game will begin in " + data.start_time, { font: "16px Arial", fill: "#ffffff", align: "center" });
                startgroup.add(start_text);
            }

        });

        socket.on('player_disconnected', function (data) {
            if (data.disconnect) {
                // console.log("hii");
                finalwinner = data.username;
                game.state.start('end');
            }
        });
    },

    update: function () {
        if (cursors.left.isDown || wasd.left.isDown) {
            socket.emit('keyPress', { InputId: 'left', state: true });
        }
        else {
            socket.emit('keyPress', { InputId: 'left', state: false });
        }
        if (cursors.right.isDown || wasd.right.isDown) {
            socket.emit('keyPress', { InputId: 'right', state: true });
        }
        else {
            socket.emit('keyPress', { InputId: 'right', state: false });
        }
        if (cursors.up.isDown || wasd.up.isDown) {
            socket.emit('keyPress', { InputId: 'up', state: true });
        }
        else {
            socket.emit('keyPress', { InputId: 'up', state: false });
        }
        if (cursors.down.isDown || wasd.down.isDown) {
            socket.emit('keyPress', { InputId: 'down', state: true });
        }
        else {
            socket.emit('keyPress', { InputId: 'down', state: false });
        }

        loading_planet.angle += 0.1;
        if (!stop_movements)
            filter.update(game.input.activePointer);
    }
}

//for bots - play a single player mission
GameState.bots = {
    preload: function () {

    },
    create: function () {
        //console.log("I am ready!");
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


        cursors = game.input.keyboard.createCursorKeys();
        wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
        };
        var fragmentSrc = [

            "precision mediump float;",
            "uniform float     time;",
            "uniform vec2      resolution;",
            "uniform vec2      mouse;",

            "// Posted by Trisomie21",
            "// modified by @hintz",

            "// from http://glsl.heroku.com/e#5248.0",
            "#define BLADES 4.0",
            "#define BIAS 0.0001",
            "#define SHARPNESS 3.0",

            "vec3 star(vec2 position, float t)",
            "{",
            "float d2D = 2.0 / length(position) + t * 3.7;",
            "float a2D = atan(position.y, position.x);",
            "float qq = d2D * 0.01 + sin(d2D) * 0.02 * cos(a2D * 3.0) + sin(d2D * 0.02) * 0.3 * cos(a2D * 8.0)",
            "+ max(0.0, sin(d2D * 0.1 + 10.0) - 0.5) * cos(a2D * 20.0 + sin(d2D * 0.2) * 5.0)",
            "+ max(0.0, sin(d2D * 0.03 + 18.0) - 0.5) * cos(a2D * 5.0 + sin(d2D * 0.2) * 5.0);",
            "vec3 color = vec3(sin(qq * 2.0), sin(qq * 3.0), sin(qq * 5.0));",

            "color = color * 0.2;",

            "float blade = clamp(pow(sin(atan(position.y,position.x )*BLADES)+BIAS, SHARPNESS), 0.0 , 1.0);",

            "color += mix(vec3(-0.34, -0.5, -1.0), vec3(0.0, -0.5, -1.0), (position.y + 1.0) * 0.25);",
            "color += (vec3(0.95, 0.65, 0.30) * 1.0 / distance(vec2(0.0), position) * 0.075);",
            "color += vec3(0.95, 0.45, 0.30) * min(1.0, blade *0.7) * (1.0 / distance(vec2(0.0, 0.0), position)*0.075);",

            "return color;",
            "}",


            "// Tweaked from http://glsl.heroku.com/e#4982.0",
            "float hash(float n) { return fract(sin(n)*43758.5453); }",

            "float noise(in vec2 x)",
            "{",
            "vec2 p = floor(x);",
            "vec2 f = fract(x);",
            "f = f*f*(3.0-2.0*f);",
            "float n = p.x + p.y*57.0;",
            "float res = mix(mix(hash(n+0.0), hash(n+1.0),f.x), mix(hash(n+57.0), hash(n+58.0),f.x),f.y);",

            "return res;",
            "}",

            "vec3 cloud(vec2 p)",
            "{",
            "float f = 0.0;",
            "f += 0.50000*noise(p*1.0*3.0);",
            "f += 0.25000*noise(p*2.0*3.0);",
            "f += 0.12500*noise(p*3.2*3.0);",
            "f += 0.06250*noise(p*2.5*10.0);",
            "f *= f;",

            "return vec3(f*.65, f*.45, f)*.6;",
            "}",

            "const float LAYERS = 3.0;",
            "const float SPEED  = 0.005;",
            "const float SCALE  = 5.0;",
            "const float DENSITY    = 0.004;",
            "const float BRIGHTNESS = 0.1;",
            "vec2 ORIGIN    = resolution.xy*.5;",

            "float rand(vec2 co){ return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453); }",

            "void main(void)",
            "{",
            "vec2   pos = gl_FragCoord.xy - ORIGIN;",
            "float dist = length(pos) / resolution.y;",
            "vec2 coord = vec2(pow(dist, 0.1), atan(pos.x, pos.y) / (3.1415926*2.0));",

            "// Nebulous cloud",
            "vec3 color = cloud(pos/resolution);",

            "// Background stars",
            "float a = pow((1.0-dist), 20.0);",
            "float t = time*-0.05;",
            "float r = coord.x - (t*SPEED);",
            "float c = fract(a+coord.y + 0.0*0.543);",
            "vec2  p = vec2(r, c*0.5)*4000.0;",
            "vec2 uv = fract(p)*2.0-1.0;",
            "float m = clamp((rand(floor(p))-0.9)*BRIGHTNESS, 0.0, 1.0);",
            "color +=  clamp((1.0-length(uv*2.0))*m*dist, 0.0, 1.0);",

            "// Flying stars into black hole",
            "for (float i = 1.0; i < (LAYERS+1.0); ++i)",
            "{",
            "float a = pow((1.0-dist),20.0);",
            "float t = i*10.0 + time*i*i;",
            "float r = coord.x - (t*SPEED);",
            "float c = fract(a+coord.y + i*.543);",
            "vec2  p = vec2(r, c*.5)*SCALE*(LAYERS/(i*i));",
            "vec2 uv = fract(p)*2.0-1.0;",
            "float m = clamp((rand(floor(p))-DENSITY/i)*BRIGHTNESS, 0.0, 1.0);",
            "color +=  clamp(star(uv*0.5, time+i*10.0)*m*dist, 0.0, 1.0);",
            "}",


            "gl_FragColor = vec4(color, 1.0);",
            "}"
        ];

        filter = new Phaser.Filter(game, null, fragmentSrc);
        filter.setResolution(800, 600);

        sprite = game.add.sprite();
        sprite.width = 1520;
        sprite.height = 680;

        sprite.filters = [filter];
        myGroup.add(sprite);


        portal_border = game.add.sprite(winwidth / 2, winheight / 2, 'spaceportalborder');
        portal_border.anchor.setTo(0.5, 0.5);
        portal_border.scale.setTo(0.25, 0.25);

        portal = game.add.sprite(winwidth / 2, winheight / 2, 'portal');
        portal.anchor.setTo(0.5, 0.5);
        portal.scale.setTo(0.24, 0.24);

        nstar = game.add.sprite(winwidth / 1.5, winheight / 2, 'nstar');
        nstar.anchor.setTo(0.5, 0.5);
        nstar.scale.setTo(0.15, 0.15);
        nstar.alpha = 0;

    game.add.tween(nstar).to( { alpha: 1 }, 500, Phaser.Easing.Linear.None, true, 0, 1000, true);

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
            for (var i = 0; i < data.player.length; i++) {
                if (data.player[i].rad > 1) {
                    //console.log(data.player[i].y);
                    player = game.add.sprite(data.player[i].x, data.player[i].y, 'blackhole');
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

            style = { fontSize: '15px', fill: '#ffffff' }
            mytext = game.add.text(385, 10, data.player_name, style);
            myGroup.add(mytext);

            mytext = game.add.text(385, 30, "Absorb : Everything", style);
            myGroup.add(mytext);

            mytext = game.add.text(950, 10, data.bot_name, style);
            myGroup.add(mytext);

            mytext = game.add.text(950, 30, "Staus : " + data.bot_status, { fontSize: '14px', fill: '#ffffff' });
            myGroup.add(mytext);

            mytext = game.add.text(720, 12, 'Time : ' + data.gmtime, { fontSize: '16px', fill: '#ffffff' });
            myGroup.add(mytext);

            mytext = game.add.text(385, 48, 'Score : ' + data.player_score, style);
            myGroup.add(mytext);

            mytext = game.add.text(950, 48, 'Score : ' + data.bot_score, style);
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
                    socket.emit('single_player_lost', { gameid: data.gameid });
                    game.state.start('bot_end');
                }

            }
        });




    },
    update: function () {

        if (cursors.left.isDown || wasd.left.isDown) {
            socket.emit('keyPress', { InputId: 'left', state: true });
        }
        else {
            socket.emit('keyPress', { InputId: 'left', state: false });
        }
        if (cursors.right.isDown || wasd.right.isDown) {
            socket.emit('keyPress', { InputId: 'right', state: true });
        }
        else {
            socket.emit('keyPress', { InputId: 'right', state: false });
        }
        if (cursors.up.isDown || wasd.up.isDown) {
            socket.emit('keyPress', { InputId: 'up', state: true });
        }
        else {
            socket.emit('keyPress', { InputId: 'up', state: false });
        }
        if (cursors.down.isDown || wasd.down.isDown) {
            socket.emit('keyPress', { InputId: 'down', state: true });
        }
        else {
            socket.emit('keyPress', { InputId: 'down', state: false });
        }

        filter.update(game.input.mousePointer);
        portal.angle += 0.5;
        nstar.angle += 0.5; 
    }
}

game.state.add('main', GameState.main);
game.state.add('end', GameState.end);
game.state.add('start', GameState.start);
game.state.add('bots', GameState.bots);
game.state.add('bot_end', GameState.bot_end);
game.state.start('start');

function actionOnClick() {
    game.state.start('main');
}
function play_again() {
    game.state.start('start');
}
function calangle() {
    angle += 1;
    return angle;
}
function greenplanetangle() {
    green_planet_angle += 0.01;
    return green_planet_angle;
}
function redplanetangle() {
    red_planet_angle += 0.01;
    return red_planet_angle;
}
function astangle() {
    astroid_angle -= 1;
    return astroid_angle;
}
function botsattack() {
    game.state.start('bots');
}
var spaceship_angle = 0;
function spaceshipangle() {
    spaceship_angle += 0.1;
    return spaceship_angle;
}
man_angle = 0;
function manangle() {
    man_angle += 0.4;
    return man_angle;
}