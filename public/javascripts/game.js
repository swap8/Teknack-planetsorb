
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
var flash_once = true;
var call_only_once_single_player = true;
var single_player_final_winner;
var winnnertype = '';
var cursor, wasd;

//  Path data table
var tab = [0, 0, -4, 25, 250, 2, 1, -4, 25, 100, 3, 1, -2, 25, 100, 4, 2, 2, 25, 100, -4, 2, 2, 10, 100, 0, 0, -2, 25, 250, 0, 2, 0, 25, 200, 0, 2, 2, 25, 100, 0, 0, 2, 25, 100, 2, 0, 2, 25, 200, 0, 2, 2, 25, 200, 2, 0, 2, 25, 200, 0, 4, 2, 25, 200];

var ppDist = 800;
var speedx = 0;
var speedy = 0;
var speedz = 0;
var speedx2 = 0;
var speedy2 = 0;
var speedz2 = 0;
var max = 164;
var balls = [];
var xx = [];
var yy = [];
var zz = [];
var bx = 0;
var tabb = 0;
var del = tab[tabb + 4];
var delx = tab[tabb + 3];
var spx = 1;
var spy = 1;
var spz = 1;

var game = new Phaser.Game(winwidth, winheight, Phaser.AUTO);
//game.stage.canvas.id = 'something';

game.state.add('boot', BootState);
game.state.add('preloader', GameState.preloader);
game.state.add('main', GameState.main);
game.state.add('end', GameState.end);
game.state.add('start', GameState.start);
game.state.add('bots', GameState.bots);
game.state.add('bot_end', GameState.bot_end);
game.state.add('gamerules', GameState.gamerules);
game.state.add('storyline', GameState.storyline);
game.state.add('accept_request', GameState.accept_request);
game.state.add('profilestate', GameState.profilestate);
game.state.add('access_friends', GameState.access_friends);

game.state.start('boot');
//game.state.start('preloader');

//---------------- functions called in game ---------------------
function actionOnClick() {
    music.destroy();
    game.state.start('main');
}

function rulespgclick() {

    game.state.start('gamerules');
}

function storyline() {
    game.state.start('storyline');
}
function play_again() {
    endmusic.destroy();
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
    music.pause();
    game.state.start('bots');
}

function friends() {
    game.state.start('access_friends');
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

function gohome() {
    game.world.scale.setTo(1);
    game.state.start('start');

}

function see_request() {
    game.state.start('accept_request');
}

function see_profile() {
    game.state.start('profilestate');
}


function findfriend() {
    //var person = prompt("Please enter your name", "Harry Potter");
    swal({
        title: "Add a Friend!",
        text: "Enter the name of your Friend :",
        type: "input",
        showCancelButton: true,
        closeOnConfirm: false,
        animation: "slide-from-top",
        inputPlaceholder: "eg. bill"
    },
        function (inputValue) {
            if (inputValue === false) return false;

            if (inputValue === "") {
                swal.showInputError("You need to write something!");
                return false
            }
            var username = inputValue;
            console.log(username);
            $.get("/send_this_data/" + username, {}, function (data) {
                console.log(data);
                if (data == "success") {
                    swal("Great!", "A Friend request has been sent succesfully.", "success");
                }
                else if (data == "yourself")
                    swal("Sorry!", "Please don't send Friend Request to Yourself");
                else {
                    swal("Sorry!", "No username exist");
                }
            });

        });
}