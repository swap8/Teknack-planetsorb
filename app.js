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
var fireball = require('./routes/fireball');
var AI = require('./routes/AI');
var superstar = require('./routes/superstar');
var AI_game_time = require('./routes/AI_game_time');
var portal_function = require('./routes/portal');
var update_score = require('./routes/updatescore');
var aurora = require('./routes/aurora');
var single_player_updatescore = require('./routes/single_player_updatescore');
var AI_collision_detection = require('./routes/AI_collision_detection');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://spaceworld:plutosonic@127.0.0.1:27017/virtualspace');
var session = require('express-session');
var session2 = require('client-sessions');
var checking = require('./routes/checking');

var _ = require('underscore');
var checklevel = require('./routes/checklevel');
var User = require('./models/User');


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

app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));

app.use(express.static(path.join(__dirname, 'public')));


// //*****    client-sessions usage  **********//
// //cookie setup KEEP THIS THE SAME AS BELOW!!
app.use(session2({
    cookieName: "sess",
    secret: "134klh389dbcbsldvn1mcbj",
    duration: 30 * 60 * 1000, //30 min session duration
    activeDuration: 5 * 60 * 1000 //5 min active session
}));


app.use(function (req, res, next) {   //enforce a cookie requirement for all requests starting with '/'
    //req.sess.username = 'fill';
    if (!req.sess.username) {              //i.e. accessing the server needs session to be set
        console.log("redirecting cookie not found");
        res.redirect("http://teknack.in/"); //this url will be provided later 
        // req.sess.username = 'swap'; 
        //next();
    } else {
        next();
    }
});
app.use('/', index);

app.use('/who', function (req, res) {
    res.send("var u = '" + req.sess.username + "';");
});


// to get the leaderboard
app.get('/leadget', function (req, res) {
    // var send = "hellow swapnil here";
    //console.log(send);
    console.log("hellow");
    // var username = req.session.user;
    var player_id;
    var data = [];
    console.log("hii i am in display");
    User.find({}).sort({ highest_multi_player_score: -1 }).exec(function (err, docs) {
        if (err) {
            console.log(err);
        }
        //console.log(docs);
        for (var i = 0; i < 10; i++) {
            if (docs[i] != null) {
                data[i] = docs[i];
            }

        }
        var new_object = {};
        new_object.data = data;
        //res.send(JSON.stringify({ 'msg': 'success', data: data }));
        res.send(new_object);
    });
});


// to see user profile
app.get('/see_my_profile', function (req, res) {
    console.log("hi it's working");
    var sometext = "hi this is swapnil trying to display the profile board";


    var username = req.sess.username;
    var people_name = [];
    User.count({ username: username }, function (error, userCount) {

        if (error) {
            console.log(error);
        }
        if (userCount > 0) {
            //console.log("this means user is there in the database and just show him all the stuff");
            // To display stuff in the database
            User.find({ username: username })
                .then(function (doc) {
                    //player_id = doc;
                    console.log(doc);
                    //people_name = doc[0].pending_request;
                    //console.log(people_name);
                    //send_id = player_id[0]._id;
                    var new_object = {};
                    new_object.data = doc;
                    res.send(new_object);
                    // res.send(JSON.stringify({ 'msg': 'success', data: doc }));
                });
        }
    });

});




//  i finding friend request send friend reqest
app.get('/send_this_data/:x', function (req, res) {

    console.log(req.params.x);
    //res.send(req.params.x);

    var same_name = false;
    var username = req.params.x;
    temp_name = username;
    var requested_user_name = req.sess.username;
    if (username === requested_user_name) {
        console.log("you can't request yourself");
        same_name = true;
    }
    User.count({ username: username }, function (error, userCount) {

        if (error) {
            console.log(error);
            res.send(error);
            //return res.status(500).send(JSON.stringify({ 'msg': 'servererror' }));
        }
        if (userCount > 0) {
            console.log("i have found in the database");

            //req.session.user = username;
            if (!same_name) {
                //User.update({ username: username }, { "$pushAll": { pending_request: requested_user_name } });
                console.log("hi i don't know");
                User.find({ username: temp_name })
                    .then(function (doc) {
                        player_id = doc;
                        //console.log(player_id[0]._id);
                        send_id = player_id[0]._id;
                        console.log(send_id);
                        checking.updatedata(send_id, requested_user_name);
                        res.send("success");
                    });

                //res.send(JSON.stringify({ 'msg': 'success' }));
            }
            else
                res.send("yourself");
            //res.send({ msg: "yourself" });
        }
        else {
            res.send("invalid");
            //res.send({ msg: "invalid" });
        }

    });

});

// show pending friend requests
app.get('/friend_request', function (req, res) {
    var username = req.sess.username;
    var people_name = [];
    User.count({ username: username }, function (error, userCount) {

        if (error) {
            console.log(error);
        }
        if (userCount > 0) {
            //console.log("this means user is there in the database just update his score");
            // To display stuff in the database
            User.find({ username: username })
                .then(function (doc) {
                    player_id = doc;
                    //console.log(doc);
                    people_name = doc[0].pending_request;
                    //console.log(people_name);
                    send_id = player_id[0]._id;
                    var new_object = {};
                    new_object.data = people_name;
                    res.send(new_object);
                    // res.send(JSON.stringify({ 'msg': 'success', data: people_name }));
                });
        }
    });

});


//to accept the friend request
app.get('/accept_friend/:x', function (req, res) {
    console.log(req.params.x);
    //res.send(req.params.x);


    var same_name = false;
    var username = req.params.x;
    var requested_user_name = req.sess.username;
    if (username === requested_user_name) {
        console.log("you can't request yourself");
        same_name = true;
    }
    User.count({ username: username }, function (error, userCount) {

        if (error) {
            console.log(error);
            return res.status(500).send(JSON.stringify({ 'msg': 'servererror' }));
        }
        if (userCount > 0) {
            //req.session.user = username;
            if (!same_name) {

                User.find({ username: username })
                    .then(function (doc) {
                        player_id = doc;
                        //console.log(player_id[0]._id);
                        send_id = player_id[0]._id;
                        console.log("validification : to see whether this person really exist in " + requested_user_name + " database ");
                        checking.acceptdata(send_id, requested_user_name, username);
                        res.send("success");
                    });
                //res.send(JSON.stringify({ 'msg': 'success' }));
            }
            else
                res.send("yourself");
            //res.send({ msg: "yourself" });
        }
        else {
            res.send("invalid");
            //res.send({ msg: "invalid" });
        }

    });
});

//time for accessing friends
app.get('/access_friends', function (req, res) {
    //var pass_string = "working fine";
    //res.send(pass_string);
    var username = req.sess.username;
    var people_name = [];
    User.count({ username: username }, function (error, userCount) {

        if (error) {
            console.log(error);
        }
        if (userCount > 0) {
            console.log("this means user is there in the database and just show him all the stuff");
            // To display stuff in the database
            User.find({ username: username })
                .then(function (doc) {
                    //player_id = doc;
                    console.log(doc);
                    //people_name = doc[0].pending_request;
                    //console.log(people_name);
                    //send_id = player_id[0]._id;
                    var friends = doc[0].friends;
                    console.log(friends);
                    var bind = {};
                    bind.pack = [];
                    var send_friends = friends.length;
                    for (var i = 0; i < friends.length; i++) {
                        //now find info of this friends
                        User.find({ username: friends[i] })
                            .then(function (doc) {
                                //player_id = doc;
                                // console.log(doc);
                                //people_name = doc[0].pending_request;
                                //console.log(people_name);
                                //send_id = player_id[0]._id;
                                var friends = doc[0].friends;
                                //console.log(friends);
                                var info = doc;
                                bind.pack.push(info)
                            });
                        send_friends--;
                    }
                    var count_time = 5;
                    var refreshId = setInterval(function () {

                        var send_details_to_client = false;
                        if (send_friends == 0) {
                            send_details_to_client = true;
                        }
                        if (send_details_to_client) {
                            var new_object = {};
                            new_object.data = bind;
                            res.send(new_object);
                            //res.send(JSON.stringify({ 'msg': 'success', data: bind }));
                            //console.log("done");
                            clearInterval(refreshId);
                        }
                        if (!count_time) {
                            clearInterval(refreshId);
                        }
                        count_time--;
                        //console.log("I am on");
                    }, 1000)
                    //console.log(pack);
                    //res.send(JSON.stringify({ 'msg': 'success', data: pack }));
                });
        }
    });

});

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

//Few Constants for multiplayer game
var usernames = {};   //contains all username
var planet_list = {};   //contains all planet
var socket_list = {};   //contains all sockets
var user_list = {};   //contains all Users
var queue_list = {};   //contains players to be joined
var room_list = {};   //contains list of lobbys/rooms
var game_list = {};   //contains list of games that are currently executing
var ready_list = {};   //contains player that are ready for game
var active_games = 0;

//few constants for single player game
bot_game_list = {};

var check_win = function (lobby_name, Game, lost_player_name) {
    for (var i in socket_list) {
        var socket = socket_list[i];
        if (socket.lobby == lobby_name) {
            //console.log("hi i am here");
            socket.disconnect = true;
            socket.emit('player_disconnected', { username: socket.username, disconnect: socket.disconnect });
            delete ready_list[lost_player_name];
            delete ready_list[socket.username];
            delete game_list[Game.id];
            active_games = Object.keys(game_list).length;
            console.log("Active Games " + active_games);
            //console.log("Player with Name : " + socket.username + " Win !")
        }
    }
}



io.on("connection", function (socket) {
    socket.username = uuid.v1();
    socket.communication = false;
    socket.disconnect = false;
    socket_list[socket.username] = socket;
    socket.emit('send_socket_id', socket.username);


    socket.on('multi_player_mission', function (data) {
        //console.log(data);
        var socket;
        for (var i in socket_list) {
            var player_socket = socket_list[i];
            if (player_socket.username === data.multi_id) {
                socket = player_socket;
                socket.username = data.person;
                //console.log(socket);
            }
        }
        usernames[socket.username] = socket.username;
        user_list[socket.username] = socket;
        queue_list[socket.username] = socket;
        console.log("User with ID " + socket.username + " Connected.");
        update_score.check_exist_in_database(socket.username);
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
            Game.time = 100;
            Game.planetidlist = {};
            Game.fireball_list = {};
            Game.aurora_list = {};
            //Game.generate_fireball = false;
            Game.activate_special_powers = false;
            Game.start_the_game = false;
            Game.start_time = 0;
            Game.lockscore = false;
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
            gameover.start_game(game_list[socket.game_id]);
            gameover.game_over(game_list[socket.game_id], game_list, ready_list);
            active_games = Object.keys(game_list).length;
            console.log("Total Games : " + active_games);
        }

    });
    //-------------------------------- single player starts here -------------------------------------

    socket.on('single_player_mission', function (data) {

        var socket;
        //console.log(data);
        for (var i in socket_list) {
            var player_socket = socket_list[i];
            if (player_socket.username === data.single_id) {
                socket = player_socket;
                socket.username = data.person;
            }
        }
        single_player_updatescore.check_exist_in_database(socket.username);
        var bot = AI.create_bot();
        bot.id = uuid.v1();

        var Game = {};
        Game.Game_list = {};
        Game.id = uuid.v1();
        Game.time = 60;
        Game.bot = bot;
        Game.change_object = false;
        Game.bot.status = 'Attacking';
        Game.bot_name = bot.name;
        Game.asteroid = false;

        Game.nstar_list = {};
        Game.appear_portal = false;


        saturn = AI.create_saturn();
        Game.saturn_add = saturn;

        Game.generate_fireball = false;
        Game.start_the_game = false;
        Game.overstate = false;
        Game.winner = '';
        Game.planetlist = {},
            Game.Game_list[bot.id] = bot;
        Game.planetlist = AI.create_planet();
        //console.log(Game.planetlist);
        var lobby = uuid.v1();
        socket.location = AI.create_player(socket.username);
        socket.join(lobby);
        socket.lobby = lobby;
        Game.lobby = socket.lobby;
        socket.game_id = Game.id;
        Game.player = socket;
        Game.player_name = socket.username;
        Game.Game_list[socket.username] = socket;

        bot_game_list[Game.id] = Game;

        AI_game_time.game_over(Game, bot_game_list);

    });





    socket.on('disconnect', function () {
        console.log("User with ID " + socket.username + " Disconnected");
        //console.log(socket.username + " Left Room with Name : " + socket.lobby);
        var lobby_name = socket.lobby;
        var game_id = socket.game_id;
        delete socket.lobby;
        delete usernames[socket.username];
        delete socket_list[socket.username];
        delete user_list[socket.username];
        delete queue_list[socket.username];
        //console.log(lobby_name);
        if (lobby_name != undefined) {
            for (var i in game_list) {
                var Game = game_list[i];
                if (lobby_name === Game.lobby) {
                    check_win(lobby_name, Game, socket.username);
                }
            }
        }
        for (var i in bot_game_list) {
            var Game = bot_game_list[i];
            if (game_id === Game.id) {
                delete bot_game_list[Game.id];
            }
        }
        // If one player left the lobby, Declare Win for other
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
            else if (data.InputId === 'power')
                socket.location.pressedE = data.state;
        }
    });

    socket.on('click', function (data) {
        if (socket.location != undefined) {
            if (data.InputId === 'clickme') {
                // console.log("x : " + data.x + "and y : " + data.y);
                aurora.fire_aurora_beam(data.x, data.y, socket.game_id, game_list, socket.location.id);
            }
        }

    });

    socket.on('communication_lost', function (data) {
        socket.communication = data.communication;
    });


    socket.on('player_lost', function (data) {
        for (var i in game_list) {
            var Game = game_list[i];
            if (data.gameid === Game.id) {
                for (var j in Game.Game_list) {
                    var player = Game.Game_list[j];
                    var temp = player.username;
                    if (player.communication) {
                        for (var k in Game.Game_list) {
                            var temp_player = Game.Game_list[k];
                            if (temp != temp_player.username) {
                                if (temp_player.communication) {
                                    update_score.updatescore(Game);
                                    delete ready_list[temp_player.location.id];
                                    delete ready_list[temp];
                                    delete game_list[Game.id];
                                    Game.overstate = false;
                                    active_games = Object.keys(game_list).length;
                                    console.log("Active Games " + active_games);
                                }
                            }
                        }
                    }
                }
            }
        }

    });

    socket.on('find_winner', function (data) {

        for (var i in game_list) {
            var Game = game_list[i];
            if (data.gameid === Game.id) {
                gameover.calculate_winner(Game);
            }
        }
        //gameover.calculate_winner(Game);
    });

    socket.on('single_player_find_winner', function (data) {
        for (var i in bot_game_list) {
            var Game = bot_game_list[i];
            if (data.gameid === Game.id) {
                AI_game_time.calculate_winner(Game);
            }
        }

    });

    socket.on('single_player_lost', function (data) {
        for (var i in bot_game_list) {
            var Game = bot_game_list[i];
            if (data.gameid === Game.id) {
                single_player_updatescore.updatescore(Game);
                Game.overstate = true;
                //console.log("hii");
                delete bot_game_list[Game.id];
            }
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
                    gameid: game_list[socket.game_id].id,
                    start_the_game: game_list[socket.game_id].start_the_game,
                    start_time: game_list[socket.game_id].start_time,
                    fireball: fireball.assignfireballposition(game_list[socket.game_id]),
                    shoot_stuff: aurora.show_aurora(game_list[socket.game_id])
                };
            socket.broadcast.to(socket.lobby).emit('message', their_game);
        }


    }

    for (var i in bot_game_list) {
        var Game = bot_game_list[i];
        AI.find_size_of_gamelist(Game);
        AI_collision_detection.detect_collision_player(Game);
        AI_collision_detection.detect_collision_bot(Game);
        var bot_game = {
            player: AI.assignPlayerPosition(Game),
            bot: AI.assignbotposition(Game),
            planet: AI.assignplanetposition(Game),
            player_name: Game.player_name,
            bot_name: Game.bot_name,
            bot_status: Game.bot.status,
            gmtime: Game.time,
            bot_score: Game.bot.score,
            player_score: Game.player.location.score,
            gameid: Game.id,
            winner: Game.winner,
            overstate: Game.overstate,
            saturn: AI.saturn_assign_position(Game),
            asteroid: portal_function.asteroid_assign_position(Game),
            man: portal_function.man_assign_position(Game),
            ship: portal_function.ship_assign_position(Game),
            portal: portal_function.assignportalposition(Game),
            nstar: superstar.assign_nstar_position(Game),

        }
        var socket = Game.player;
        socket.emit('bot_game', bot_game);
    }



}, 30)
module.exports = app;

