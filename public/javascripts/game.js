
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

var game = new Phaser.Game(winwidth, winheight, Phaser.AUTO);



game.state.add('main', GameState.main);
game.state.add('end', GameState.end);
game.state.add('start', GameState.start);
game.state.add('bots', GameState.bots);
game.state.add('bot_end', GameState.bot_end);
game.state.add('gamerules', GameState.gamerules);
game.state.add('storyline', GameState.storyline);


game.state.start('start');

//---------------- functions called in game ---------------------
function actionOnClick() {
    game.state.start('main');
}

function rulespgclick() {
    game.state.start('gamerules');
}

function storyline() {
    game.state.start('storyline');
}
function play_again() {
    game.state.start('start');
}
function calangle() {
    angle += 1;
    return angle;
}

function manangle() {
    angle += 0.0001;
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

function gohome(){
    game.state.start('start');

}