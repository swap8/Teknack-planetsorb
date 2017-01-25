
winwidth = 1520;
winheight = 680;
var finalwinner = '';
var Player1Text = '';
var Player1Type = '';
var Player1score = 0;
var player2score = 0;
var Player2Type = '';
var Player2Text = '';
var game = new Phaser.Game(winwidth, winheight, Phaser.AUTO);

var GameState = {};

GameState.start = {
    preload: function () {
        game.load.image('backstart', './images/spacetile.jpg');
        game.load.image('buttonimage', './images/start_button.png');
        game.load.image('matter', './images/earth.png');
        game.load.image('antimatter', './images/mars.png');
        game.load.image('over', './images/over1.jpg');
        game.load.image('playagain', './images/playagain.png');

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
        replay.scale.setTo(0.2,0.2);
        replay.scale.setTo(0.5,0.5);
    }
}


GameState.main = {
    create: function () {
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
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

        socket.on('message', function (data) {
            //game.world.removeAll();
            //console.log("responce");
            myGroup.destroy();
            myGroup = game.add.group();


            for (var i = 0; i < data.greenPlanet.length; i++) {

                var matter = game.add.sprite(data.greenPlanet[i].x, data.greenPlanet[i].y, 'matter');
                matter.anchor.setTo(0.5, 0.5);
                var radius = data.greenPlanet[i].rad / 140;
                matter_scale = radius;
                matter.scale.setTo(matter_scale, matter_scale);
                myGroup.add(matter);
            }

            for (var i = 0; i < data.redPlanet.length; i++) {
                var antimatter = game.add.sprite(data.redPlanet[i].x, data.redPlanet[i].y, 'antimatter');
                antimatter.anchor.setTo(0.5, 0.5);
                var radius = data.redPlanet[i].rad / 140;
                antimatter_scale = radius;
                antimatter.scale.setTo(antimatter_scale, antimatter_scale);
                myGroup.add(antimatter);

            }

            for (var i = 0; i < data.player.length; i++) {
                if (data.player[i].rad > 1) {
                    graphics = game.add.graphics(0, 0);
                    graphics.lineStyle(3, 0x8016F0);
                    graphics.beginFill(0xB4ABBD, 1);
                    graphics.arc(data.player[i].x, data.player[i].y, data.player[i].rad, 0, game.math.degToRad(365), false);
                    graphics.endFill();
                    myGroup.add(graphics);
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

            if (data.overstate) {

                //socket.emit('player_lost',{gameid : data.gameid});
                //game.world.removeAll();
                myGroup.destroy();
                socket.emit('communication_lost', { communication: true });
                socket.emit('player_lost', { gameid: data.gameid });
                game.state.start('end');

            }
        });



    },

    update: function () {
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

}




game.state.add('main', GameState.main);
game.state.add('end', GameState.end);
game.state.add('start', GameState.start);
game.state.start('start');

function actionOnClick() {
    game.state.start('main');

}
function play_again(){
    game.state.start('main');
}



