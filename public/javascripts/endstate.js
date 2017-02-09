
var endmusic;
GameState.end = {
    create: function () {
        
        endmusic = game.add.audio('endmusic');
        endmusic.loop = true;
        endmusic.play();
        var over = game.add.sprite(0, 0, 'over');
        over.scale.setTo(0.6,0.5);
        winner = game.add.text(300, 40, 'Winner : ' + finalwinner, { fontSize: '25px', fill: '#fff' });
        play = game.add.text(50, 230, 'Back to Earth', { fontSize: '25px', fill: '#fff' });
        replay = game.add.button(-40, -50, 'playagain', play_again, this, 2, 1, 0);
        replay.scale.setTo(0.2, 0.2);
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
        
    }
}
