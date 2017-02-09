GameState.main = {
    player: null,

    preload: function () {


    },

    create: function () {

        var turn_music_off = false;
        //music = new Phaser.Sound(game,'boden',1,true);
        music = game.add.audio('boden');
        mainmusic = game.add.audio('multiplayermusic');
        music.loop = true;
        music.play();

        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        stop_movements = false;
        call_only_once = true;
        socket = io();
        var multi_id = 4;
        var person = prompt("Please enter your name", "Harry Potter");
        socket.on('send_socket_id', function (data) {
            //console.log(data);
            multi_id = data;
            socket.emit('multi_player_mission', { multi_id: multi_id, person: person });
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



        var start_animation_status = false;

        function start_animation() {



            var fragmentSrc = [

                "precision mediump float;",
                "uniform float     time;",
                "uniform vec2      resolution;",
                "uniform vec2      mouse;",

                "// Posted by Trisomie21",
                "// modified by @hintz",

                "// from http://glsl.heroku.com/e#5248.0",
                "#define BLADES 3.0",
                "#define BIAS 0.0001",
                "#define SHARPNESS 1.0",

                "vec3 star(vec2 position, float t)",
                "{",
                "float d2D = 4.0 / length(position) + t * 3.7;",
                "float a2D = atan(position.y, position.x);",
                "float qq = d2D * 0.1 + sin(d2D) * 0.02 * cos(a2D * 3.0) + sin(d2D * 0.02) * 0.3 * cos(a2D * 8.0)",
                "+ max(0.0, sin(d2D * 0.1 + 10.0) - 0.5) * cos(a2D * 20.0 + sin(d2D * 0.2) * 5.0)",
                "+ max(0.0, sin(d2D * 0.03 + 18.0) - 0.5) * cos(a2D * 5.0 + sin(d2D * 0.2) * 5.0);",
                "vec3 color = vec3(sin(qq * 2.0), sin(qq * 3.0), sin(qq * 5.0));",

                "color = color * 0.2;",

                "float blade = clamp(pow(sin(atan(position.y,position.x )*BLADES)+BIAS, SHARPNESS), 0.0, 1.0);",

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

        }


        socket.on('message', function (data) {

            startgroup.destroy();
            if (data.start_the_game) {
                if (!turn_music_off) {
                    music.pause();
                    turn_music_off = true;
                    mainmusic.play();
                    start_animation();
                }

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
                // shoot stuff
                for (var i = 0; i < data.shoot_stuff.length; i++) {

                    aurora = game.add.sprite(data.shoot_stuff[i].x, data.shoot_stuff[i].y, 'asteroid');
                    //player.scale.setTo(0.2, 0.2);
                    aurora.anchor.setTo(0.5, 0.5);
                    //var radius = data.player[i].rad / 380;
                    //player_scale = radius;
                    aurora.scale.setTo(0.35, 0.35);

                    myGroup.add(aurora);

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
                        mainmusic.pause();
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
        sendcount = 1;
        if (stop_movements) {
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

            document.onkeydown = function (event) {
                if (event.keyCode === 69)//e
                {
                    console.log("i pressed e");
                    socket.emit('keyPress', { InputId: 'power', state: true });
                }

            }

            game.input.mouse.capture = true;
            if(sendcount)
            if (game.input.activePointer.leftButton.isDown) {
                // console.log(game.input.mousePointer.x);
                // console.log(game.input.mousePointer.y);
                //socket.emit('click', { InputId: 'down', state: true });
                socket.emit('click', { InputId: 'clickme', x: game.input.mousePointer.x, y: game.input.mousePointer.y, state: true });
                sendcount--;
            }


        }


        loading_planet.angle += 0.1;
        filter.update(game.input.activePointer);

        // if(start_animation_status){
        //      filter.update(game.input.mousePointer);
        // }
    }
}