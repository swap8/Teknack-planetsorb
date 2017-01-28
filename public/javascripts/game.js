
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
var stop_movements = false;
var call_only_once = true;
var game = new Phaser.Game(winwidth, winheight, Phaser.AUTO);

var GameState = {};

GameState.start = {
    preload: function () {
        game.load.image('backstart', './images/spacetile.jpg');
        game.load.image('buttonimage', './images/start_button.png');
        game.load.image('matter', './images/earth.png');
        game.load.image('peopleplanet', './images/peopleplanet.png');
        game.load.image('antimatter', './images/mars.png');
        game.load.image('over', './images/over1.jpg');
        game.load.image('playagain', './images/playagain.png');
        game.load.image('blackhole', './images/blackhole2.png');
        game.load.image('fireball', './images/fireball.png');


    },
    create: function () {

        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.add.tileSprite(0, 0, winwidth, winheight, 'backstart');
        //game.add.sprite(winwidth/2,winheight/2,'buttonimage');
        startbutton = game.add.button(winwidth / 2, winheight / 2, 'buttonimage', actionOnClick, this, 2, 1, 0);
        startbutton.scale.setTo(0.5, 0.5);
        startbutton.anchor.setTo(0.5, 0.5);
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
        var text = game.add.text(winwidth / 2, winheight / 3, "Planetsorb", style);
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

GameState.main = {
    player: null,
    create: function () {
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        stop_movements = false;
        call_only_once = true;
        socket = io();

        //create a group
        myGroup = game.add.group();
        graphics = game.add.graphics(0, 0);
        graphics.beginFill(0xFFC900, 1);
        graphics.moveTo(340, 0);
        graphics.lineTo(1180, 0);
        graphics.lineTo(1140, 70);
        graphics.lineTo(380, 70);
        graphics.endFill();

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
        var start_text = game.add.text(600, 25, "Game Status : ", { font: "17px Arial", fill: "#000000", align: "center" });
        startgroup.add(start_text);
        //text
        var style = { font: "35px Arial", fill: "#ffffff", align: "center" };
        var wait_text = game.add.text(500, 600, "Waiting for another player to Join", style);
        startgroup.add(wait_text);

        //text.anchor.set(0.5);


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
                    matter.scale.setTo(matter_scale, matter_scale);
                    myGroup.add(matter);
                }

                for (var i = 0; i < data.redPlanet.length; i++) {
                    var antimatter = game.add.sprite(data.redPlanet[i].x, data.redPlanet[i].y, 'antimatter');
                    antimatter.anchor.setTo(0.5, 0.5);
                    antimatter.angle = redplanetangle();
                    var radius = data.redPlanet[i].rad / 140;
                    antimatter_scale = radius;
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
                style = { fontSize: '14px', fill: '#000' }
                mytext = game.add.text(370, 10, data.player1.username, style);
                myGroup.add(mytext);
                /*game.add.text(380, 28, 'Absorb : ' + data.player1.type, style);*/
                mytext = game.add.text(385, 48, 'Score : ' + data.player1.score, style);
                myGroup.add(mytext);

                mytext = game.add.text(870, 10, data.player2.username, style);
                myGroup.add(mytext);
                /*game.add.text(1050, 28, 'Absorb : ' + data.player2.type, style);*/
                mytext = game.add.text(1050, 48, 'Score : ' + data.player2.score, style);
                myGroup.add(mytext);

                mytext = game.add.text(720, 15, 'Time : ' + data.gmtime, { fontSize: '16px', fill: '#000' });
                myGroup.add(mytext);

                finalwinner = data.winner;

                // drawing the fireball image on screen
                fireball_meteor = game.add.image(winwidth / 2, winheight / 2, 'fireball');
                fireball_meteor.anchor.setTo(0.5, 0.5);
                fireball_meteor.scale.setTo(0.4, 0.4);
                myGroup.add(fireball_meteor);

                if (data.gmtime == 0) {
                    if (call_only_once) {
                        call_only_once = false;
                        socket.emit('find_winner',{ gameid: data.gameid });
                        //socket.emit('game_time_over', { gameid: data.gameid });
                    }
                }
                if (data.overstate) {

                    //socket.emit('player_lost',{gameid : data.gameid});
                    //game.world.removeAll();
                    myGroup.destroy();
                    socket.emit('communication_lost', { communication: true });
                    socket.emit('player_lost', { gameid: data.gameid });
                    game.state.start('end');

                }

            }
            else {
                startgroup = game.add.group();
                start_text = game.add.text(600, 25, "Game Status : Your game will begin in " + data.start_time, { font: "17px Arial", fill: "#000000", align: "center" });
                startgroup.add(start_text);

            }

        });

        socket.on('player_disconnected', function (data) {
            if (data.disconnect) {
                console.log("hii");
                finalwinner = data.username;
                game.state.start('end');

            }

        });





    },

    update: function () {
        if (stop_movements) {
            document.onkeydown = function (event) {
                if (event.keyCode === 68)//d
                    socket.emit('keyPress', { InputId: 'right', state: true });
                else if (event.keyCode === 83)//s
                    socket.emit('keyPress', { InputId: 'down', state: true });
                else if (event.keyCode === 65)//a
                    socket.emit('keyPress', { InputId: 'left', state: true });
                else if (event.keyCode === 87)//w
                    socket.emit('keyPress', { InputId: 'up', state: true });
            }
            document.onkeyup = function (event) {
                if (event.keyCode === 68)//d
                    socket.emit('keyPress', { InputId: 'right', state: false });
                else if (event.keyCode === 83)//s
                    socket.emit('keyPress', { InputId: 'down', state: false });
                else if (event.keyCode === 65)//a
                    socket.emit('keyPress', { InputId: 'left', state: false });
                else if (event.keyCode === 87)//w
                    socket.emit('keyPress', { InputId: 'up', state: false });
            }
        }

        loading_planet.angle += 0.1;
        if (!stop_movements)
            filter.update(game.input.activePointer);

    }

}

game.state.add('main', GameState.main);
game.state.add('end', GameState.end);
game.state.add('start', GameState.start);
game.state.start('start');

function actionOnClick() {
    game.state.start('main');

}
function play_again() {
    game.state.start('main');
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


