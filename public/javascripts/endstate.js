
GameState.end = {
    create: function () {
        game.add.sprite(0, 0, 'over');
        winner = game.add.text(300, 40, 'Winner : ' + finalwinner, { fontSize: '25px', fill: '#fff' });
        replay = game.add.button(winwidth / 3, winheight / 1.5, 'playagain', play_again, this, 2, 1, 0);
        replay.scale.setTo(0.2, 0.2);
        replay.scale.setTo(0.5, 0.5);
    }
}

GameState.bot_end = {
    create: function () {
        game.add.sprite(0, 0, 'over');
        winner = game.add.text(300, 40, 'Winner : ' + gamewinner, { fontSize: '25px', fill: '#fff' });
        replay = game.add.button(winwidth / 3, winheight / 1.5, 'playagain', play_again, this, 2, 1, 0);
        replay.scale.setTo(0.2, 0.2);
        replay.scale.setTo(0.5, 0.5);
    }
}
