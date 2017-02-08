GameState.profilestate = {
    preload: function () {

    },

    create: function () {



        var spaceback = game.add.sprite(0, 0, 'connect');
        spaceback.scale.setTo(0.8, 0.7);

        myGroup = game.add.group();
        graphics = game.add.graphics(0, 0);
        graphics.beginFill(0x6A5E76, 1);
        graphics.moveTo(340, 0);
        graphics.lineTo(1180, 0);
        graphics.lineTo(1140, 70);
        graphics.lineTo(380, 70);
        graphics.endFill();
        style = { fontSize: '20px', fill: '#ffffff' };

        mytext = game.add.text(580, 22, "Player Profile Panel : Track Your Activities", style);

        var profile = game.add.sprite(100, 90, 'profile');
        profile.scale.setTo(0.6, 0.6);

        newbutton = game.add.button(1370, 30, 'homebt', gohome, this, 2, 1, 0);
        newbutton.scale.setTo(0.05, 0.05);
        myGroup.add(newbutton);

        $.ajax({
            type: 'POST',
            url: '/see_profile',
            dataType: 'json',
            success: function (response) {
                if (response.msg === "success") {
                    // window.location.href = "/game";
                }
                else {
                    $('#error-msg').html('');
                    $('#error-msg').append('<span>Login Failed!</span>');
                }
                console.log(response);
                style = { fontSize: '22px', fill: '#ffffff' };
                style2 = { fontSize: '22px', fill: '#000000' };
                mytext = game.add.text(270, 250, response.data[0].username, style);
                mytext = game.add.text(140, 325, response.data[0].level, style2);





                var shift_space = 20;
                var well_space = 25;
                style3 = { fontSize: '16px', fill: '#ffffff' };
                mytext = game.add.text(120, 385, "Total Games Played : " + response.data[0].total_games_played, style3);
                mytext = game.add.text(120, 385 + shift_space + 3, "Total Wins : " + response.data[0].total_wins, style3);
                shift_space += well_space;
                mytext = game.add.text(120, 385 + shift_space, "Level : " + response.data[0].level, style3);
                shift_space += well_space;
                mytext = game.add.text(120, 385 + shift_space, "XP : " + response.data[0].xp, style3);
                shift_space += well_space;
                mytext = game.add.text(120, 385 + shift_space, "Highest Single Player Score : " + response.data[0].highest_single_player_score, style3);
                shift_space += well_space;
                mytext = game.add.text(120, 385 + shift_space, "Highest MultiPlayer Score : " + response.data[0].highest_multi_player_score, style3);
                shift_space += well_space;
                mytext = game.add.text(120, 385 + shift_space, "Total MultiPlayer Game Won : " + response.data[0].total_multi_player_game_won, style3);
                shift_space += well_space;
                mytext = game.add.text(120, 385 + shift_space, "Total Single Player Game Won : " + response.data[0].total_single_player_game_won, style3);
                shift_space += well_space;
                console.log(response.data[0].username);

                graphics.beginFill(0x6A5E76, 1);
                var rect = graphics.drawRect(88, 78, 408, 600);
                myGroup.add(rect);

                var border = game.add.sprite(177,339,'border');
                var more = response.data[0].level;

               // console.log(parseInt(more)+20);
                var set_level = (parseInt(more)+10)/100;
                border.scale.setTo(set_level,0.05);

            }
        });
    },

    update: function () {

    }

}