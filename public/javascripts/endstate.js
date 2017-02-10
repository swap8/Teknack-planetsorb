
var endmusic;
GameState.end = {
    create: function () {

        endmusic = game.add.audio('endmusic');
        endmusic.loop = true;
        endmusic.play();
        var over = game.add.sprite(0, 0, 'over');
        over.scale.setTo(0.6, 0.5);
        winner = game.add.text(300, 40, 'Winner : ' + finalwinner, { fontSize: '25px', fill: '#fff' });
        play = game.add.text(50, 230, 'Back to Earth', { fontSize: '25px', fill: '#fff' });
        replay = game.add.button(-40, -50, 'playagain', play_again, this, 2, 1, 0);
        replay.scale.setTo(0.2, 0.2);


        var endscore = game.add.sprite(750, 400, 'endscore');
        endscore.anchor.setTo(0.5, 0.5);

        $.get("/leadget", {}, function (response) {
            var add = 10;
            var add_more = 150;
            var more = 250;
            var start = 440;
            some = game.add.text(start - 70, 200 + add, "Rank", { fontSize: '20px', fill: '#fff' });
            some = game.add.text(start, 200 + add, "Name", { fontSize: '20px', fill: '#fff' });
            some = game.add.text(start + add_more - 40, 200 + add, "Multiplayer", { fontSize: '20px', fill: '#fff' });
            some = game.add.text(start + more - 10, 200 + add, "Level", { fontSize: '20px', fill: '#fff' });
            some = game.add.text(start + more + 50, 200 + add, "Total Wins", { fontSize: '20px', fill: '#fff' });
            some = game.add.text(start + more + 180, 200 + add, "SinglePlayer", { fontSize: '20px', fill: '#fff' });
            some = game.add.text(start + more + 310, 200 + add, "Total Games", { fontSize: '20px', fill: '#fff' });


            var add = 50;
            for (var i = 0; i < 10; i++) {
                some = game.add.text(start - 50, 200 + add, i + 1, { fontSize: '20px', fill: '#fff' });
                some = game.add.text(start, 200 + add, response.data[i].username, { fontSize: '20px', fill: '#fff' });
                some = game.add.text(start + add_more, 200 + add, response.data[i].highest_multi_player_score, { fontSize: '20px', fill: '#fff' });
                some = game.add.text(start + more, 200 + add, response.data[i].level, { fontSize: '20px', fill: '#fff' });
                some = game.add.text(start + more + 100, 200 + add, response.data[i].total_wins, { fontSize: '20px', fill: '#fff' });
                some = game.add.text(start + more + 200, 200 + add, response.data[i].highest_single_player_score, { fontSize: '20px', fill: '#fff' });
                some = game.add.text(start + more + 330, 200 + add, response.data[i].total_games_played, { fontSize: '20px', fill: '#fff' });

                add += 30;
            }

        })

    }
}

GameState.bot_end = {
    create: function () {
        endmusic = game.add.audio('endmusic');
        endmusic.loop = true;
        endmusic.play();
        game.add.sprite(0, 0, 'over');
        winner = game.add.text(300, 40, 'Winner : ' + gamewinner, { fontSize: '25px', fill: '#fff' });
        play = game.add.text(50, 230, 'Back to Earth', { fontSize: '25px', fill: '#fff' });
        replay = game.add.button(-40, -50, 'playagain', play_again, this, 2, 1, 0);
        replay.scale.setTo(0.2, 0.2);

        var endscore = game.add.sprite(750, 400, 'endscore');
        endscore.anchor.setTo(0.5, 0.5);


        $.get("/leadget", {}, function (response) {
            var add = 10;
            var add_more = 150;
            var more = 250;
            var start = 440;
            some = game.add.text(start - 70, 200 + add, "Rank", { fontSize: '20px', fill: '#fff' });
            some = game.add.text(start, 200 + add, "Name", { fontSize: '20px', fill: '#fff' });
            some = game.add.text(start + add_more - 40, 200 + add, "Multiplayer", { fontSize: '20px', fill: '#fff' });
            some = game.add.text(start + more - 10, 200 + add, "Level", { fontSize: '20px', fill: '#fff' });
            some = game.add.text(start + more + 50, 200 + add, "Total Wins", { fontSize: '20px', fill: '#fff' });
            some = game.add.text(start + more + 180, 200 + add, "SinglePlayer", { fontSize: '20px', fill: '#fff' });
            some = game.add.text(start + more + 310, 200 + add, "Total Games", { fontSize: '20px', fill: '#fff' });


            var add = 50;
            for (var i = 0; i < 10; i++) {
                some = game.add.text(start - 50, 200 + add, i + 1, { fontSize: '20px', fill: '#fff' });
                some = game.add.text(start, 200 + add, response.data[i].username, { fontSize: '20px', fill: '#fff' });
                some = game.add.text(start + add_more, 200 + add, response.data[i].highest_multi_player_score, { fontSize: '20px', fill: '#fff' });
                some = game.add.text(start + more, 200 + add, response.data[i].level, { fontSize: '20px', fill: '#fff' });
                some = game.add.text(start + more + 100, 200 + add, response.data[i].total_wins, { fontSize: '20px', fill: '#fff' });
                some = game.add.text(start + more + 200, 200 + add, response.data[i].highest_single_player_score, { fontSize: '20px', fill: '#fff' });
                some = game.add.text(start + more + 330, 200 + add, response.data[i].total_games_played, { fontSize: '20px', fill: '#fff' });

                add += 30;
            }

        })

    }
}
