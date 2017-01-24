var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var index = require('./routes/index');
var users = require('./routes/users');
var planet = require('./routes/planet');
var player = require('./routes/player');
var display = require('./routes/display');
var room = require('./routes/room');
var uuid = require('node-uuid');
var gameover = require('./routes/gameover');
var socket_io = require("socket.io");
var collidePlayer = require('./routes/collidePlayer');
var collidePlanet = require('./routes/collidePlanet');
var app = express();

// Socket.io
var io = socket_io();
app.io = io;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

//Few Constants
var usernames = {};   //contains all username
var planet_list = {};   //contains all planet
var socket_list = {};   //contains all sockets
var user_list = {};   //contains all Users
var queue_list = {};   //contains players to be joined
var room_list = {};   //contains list of lobbys/rooms
var game_list = {};   //contains list of games that are currently executing
var ready_list = {};   //contains player that are ready for game

var check_win = function (lobby_name) {
    for (var i in socket_list) {
        var socket = socket_list[i];
        if (socket.lobby == lobby_name) {
            console.log("Player with Name : " + socket.username + " Win !")
        }
    }
}

io.on("connection", function (socket) {
    socket.username = uuid.v1();
    socket_list[socket.username] = socket;
    usernames[socket.username] = socket.username;
    user_list[socket.username] = socket;
    queue_list[socket.username] = socket;
    console.log("User with ID " + socket.username + " Connected.");

    var size = Object.keys(queue_list).length;
    var total_users_online = Object.keys(user_list).length;
    console.log("Total Users Connected : " + total_users_online);

    if (size >= 2)                                                         // If players in queue are more than 1
    {
        var temp = 0;
        var type = '';
        var next_player_position = 0;
        var lobby = uuid.v1();
        var Game = {};
        Game.time = 120;
        Game.overstate = false;
        Game.winner = '';
        Game.Game_list = {};
        Game.green_planet_list = {};
        Game.red_planet_list = {};
        id = uuid.v4();
        Game.id = id;
        //console.log("Room Created : " + lobby);
        //console.log("Game Created : " + Game.id);
        for (var i in queue_list) {
            if (temp < 2)                                                  // To select first 2 users from list
            {
                if (temp == 0) {
                    type = 'green';
                }
                else {
                    type = 'red';
                }
                var socket = queue_list[i];
                socket.join(lobby);
                socket.lobby = lobby;
                Game.lobby = socket.lobby;
                socket.game_id = Game.id;
                socket.priority = temp;
                socket.location = player.Player(socket.username, next_player_position, type);
                Game.Game_list[socket.username] = socket;
                room_list[lobby] = lobby;
                ready_list[socket.username] = socket;
                //console.log(socket.username + " Joined Room with Name : " + socket.lobby);
                //console.log(socket.username + " Joined Game with Name : " + Game.id);
            }
            else {
                break;                                                  // Don't search in the entire list
            }
            temp++;
            next_player_position += 700;
        }

        for (var i in queue_list)                                        // Delete the users from queue list
        {
            var remove_user = queue_list[i];
            var remove_user_name = remove_user.username;
            delete queue_list[remove_user_name];
        }
        Game.planet_list = planet.create_planet(Game);                      // Create Planets
        game_list[Game.id] = Game;
        gameover.game_over(game_list[socket.game_id]);
    }

    socket.on('disconnect', function () {
        console.log("User with ID " + socket.username + " Disconnected");
        console.log(socket.username + " Left Room with Name : " + socket.lobby);
        var lobby_name = socket.lobby;
        delete socket.lobby;
        delete usernames[socket.username];
        delete socket_list[socket.username];
        delete user_list[socket.username];
        delete queue_list[socket.username];
        check_win(lobby_name);                                              // If one player left the lobby, Declare Win for other
    });

    //-----keyboard movements--------------------------------
    socket.on('keyPress', function (data) {
        if (socket.location !== undefined) {
            if (data.InputId === 'right')
                socket.location.pressingRight = data.state;
            else if (data.InputId === 'left')
                socket.location.pressingLeft = data.state;
            else if (data.InputId === 'up')
                socket.location.pressingUp = data.state;
            else if (data.InputId === 'down')
                socket.location.pressingDown = data.state;
        }
    });
});

setInterval(function () {

    for (var i in ready_list) {
        var socket = ready_list[i];
        if (game_list[socket.game_id]) {
            collidePlayer.detect_collision(game_list[socket.game_id]);
            collidePlanet.detect_planet_collision(game_list[socket.game_id]);
            //socket.emit('message',pack);
            var their_game =
                {
                    player: player.assignPlayerPosition(game_list[socket.game_id]),
                    greenPlanet: display.assignGreenPlanetPosition(game_list[socket.game_id]),
                    redPlanet: display.assignRedPlanetPosition(game_list[socket.game_id]),
                    gmtime: game_list[socket.game_id].time,
                    player1: player.identify_player_first(game_list[socket.game_id]),
                    player2: player.identify_player_second(game_list[socket.game_id]),
                    winner: game_list[socket.game_id].winner,
                    overstate: game_list[socket.game_id].overstate,
                };
            socket.broadcast.to(socket.lobby).emit('message', their_game);
        }


    }

}, 30)
module.exports = app;
