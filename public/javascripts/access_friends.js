GameState.access_friends = {

    preload: function () {

    },

    create: function () {

        var connect_pic = game.add.sprite(0, 0, 'connect');
        connect_pic.scale.setTo(0.55, 0.4);
        var shift_profile_pic = 0;
        var display_more = false;
        var start_counter = 0;
        var stop_counter = 0;
        var temp;
        var people = {};
        var shift_level_position = 0;

        everthing = game.add.group();

        graphics = game.add.graphics(0, 0);
        graphics.beginFill(0x6A5E76, 1);
        graphics.moveTo(340, 0);
        graphics.lineTo(1180, 0);
        graphics.lineTo(1140, 70);
        graphics.lineTo(380, 70);
        graphics.endFill();


        style = { fontSize: '19px', fill: '#ffffff' };
        mytext = game.add.text(630, 22, "Friends Panel  :  Watch Out", style);



        // var profile = game.add.sprite(30 + shift_profile_pic, 130, 'profile');
        // profile.scale.setTo(0.5, 0.5);

        // var profile = game.add.sprite(50 + shift_profile_pic * 2, 130, 'profile');
        // profile.scale.setTo(0.5, 0.5);

        // var profile = game.add.sprite(50 + shift_profile_pic * 3, 130, 'profile');
        // profile.scale.setTo(0.5, 0.5);

        $.ajax({
            type: 'POST',
            url: '/access_friends',
            dataType: 'json',
            success: function (response) {
                if (response.msg === "success") {
                    // window.location.href = "/game";
                }
                else {
                    $('#error-msg').html('');
                    $('#error-msg').append('<span>Login Failed!</span>');
                }
                //console.log(response);
                //console.log(response.data.pack);

                people.stuff = response.data.pack;
                //console.log(people.stuff);
                // console.log(people.stuff.length);
                stop_counter = people.stuff.length;
                console.log("stop counter :" + stop_counter);
                for (var i = 0; i < people.stuff.length; i++) {
                    temp = people.stuff[i];
                    // console.log(temp);
                    display_screen(temp);
                    start_counter++;
                    stop_counter--;
                    console.log("stop counter : " + stop_counter);
                    if (i === 3) {
                        console.log("limit exceeds than 3 stop the function now");
                        display_more = true;
                        //console.log(display_more);
                        break;
                    }
                }
            }

        });

        var my_profile;
        function display_screen(temp) {
            console.log("the length of the temp is : " + temp.length);

            myGroup = game.add.group();
            everthing = game.add.group();
            multiple = game.add.group();


            for (var i = 0; i < temp.length; i++) {
                console.log("hi");
                var something = temp[i];
                var count = 0;

                my_profile = game.add.sprite(20 + shift_profile_pic, 130, 'profile');
                my_profile.scale.setTo(0.5, 0.5);
                everthing.add(my_profile);

                style = { fontSize: '18px', fill: '#ffffff' };
                style2 = { fontSize: '18px', fill: '#000000' };


                var profile_x_start = 160 + shift_profile_pic;
                var profile_y_start = 265;
                var player_level_x = 54 + shift_profile_pic;
                var player_level_y = 326;
                mytext = game.add.text(profile_x_start, profile_y_start, something.username, style);
                everthing.add(mytext);
                mytext = game.add.text(player_level_x, player_level_y, something.level, style2);
                everthing.add(mytext);

                var shift_space = 20;
                var well_space = 20;
                var fill_info_x = 40;
                var fill_info_y = 385;
                style3 = { fontSize: '13px', fill: '#ffffff' };
                mytext = game.add.text(fill_info_x + shift_profile_pic, fill_info_y, "Total Games Played : " + something.total_games_played, style3);
                everthing.add(mytext);
                mytext = game.add.text(fill_info_x + shift_profile_pic, fill_info_y + shift_space + 3, "Total Wins : " + something.total_wins, style3);
                everthing.add(mytext);
                shift_space += well_space;
                mytext = game.add.text(fill_info_x + shift_profile_pic, fill_info_y + shift_space, "Level : " + something.level, style3);
                everthing.add(mytext);
                shift_space += well_space;
                mytext = game.add.text(fill_info_x + shift_profile_pic, fill_info_y + shift_space, "XP : " + something.xp, style3);
                everthing.add(mytext);
                shift_space += well_space;
                mytext = game.add.text(fill_info_x + shift_profile_pic, fill_info_y + shift_space, "Highest Single Player Score : " + something.highest_single_player_score, style3);
                everthing.add(mytext);
                shift_space += well_space;
                mytext = game.add.text(fill_info_x + shift_profile_pic, fill_info_y + shift_space, "Highest MultiPlayer Score : " + something.highest_multi_player_score, style3);
                everthing.add(mytext);
                shift_space += well_space;
                mytext = game.add.text(fill_info_x + shift_profile_pic, fill_info_y + shift_space, "Total MultiPlayer Game Won : " + something.total_multi_player_game_won, style3);
                everthing.add(mytext);
                shift_space += well_space;
                mytext = game.add.text(fill_info_x + shift_profile_pic, fill_info_y + shift_space, "Total Single Player Game Won : " + something.total_single_player_game_won, style3);
                everthing.add(mytext);
                shift_space += well_space;
                console.log(something.username);
                shift_profile_pic += 380;


                var next = game.add.button(1400, 615, 'next', show_next_friends, this, 2, 1, 0);
                next.scale.setTo(0.1, 0.1);

                var level_position_x = 85 + shift_level_position;
                var level_position_y = 338;
                var border = game.add.sprite(level_position_x, level_position_y, 'border');
                var more = something.level;

                // console.log(parseInt(more)+20);
                shift_level_position+=380;
                var set_level = (parseInt(more) + 10) / 100;
                border.scale.setTo(set_level, 0.04);
                myGroup.add(mytext);

            }

        }



        function show_next_friends() {
            //everthing.destroy(my_profile);

            console.log(display_more);
            if (display_more) {
                game.world.removeAll();
                var connect_pic = game.add.sprite(0, 0, 'connect');
                connect_pic.scale.setTo(0.55, 0.4);
                graphics = game.add.graphics(0, 0);
                graphics.beginFill(0x6A5E76, 1);
                graphics.moveTo(340, 0);
                graphics.lineTo(1180, 0);
                graphics.lineTo(1140, 70);
                graphics.lineTo(380, 70);
                graphics.endFill();


                style = { fontSize: '19px', fill: '#ffffff' };
                mytext = game.add.text(630, 22, "Friends Panel  :  Watch Out", style);
                shift_profile_pic = 0;
                shift_level_position = 0;
                console.log("stop counter : " + stop_counter);
                if (stop_counter > 0) {
                    for (i = 0; i < stop_counter; i++) {
                        //console.log(start_counter);
                        var send = people.stuff[start_counter];
                        console.log(send);
                        //console.log("i am gettting executed");
                        //console.log("The value of send is : " + send);
                        display_screen(send);
                        start_counter++;
                        //console.log(stop_counter);
                        if (i === 3) {
                            show_next_friends();
                            break;
                        }
                    }

                    stop_counter -= 4;
                    if (stop_counter < 0) {
                        display_more = false;
                    }
                }
                else {
                    display_more = false;
                }
                //console.log("yeah he has more friends");
            }

        }














    },

    update: function () {

    }
}

