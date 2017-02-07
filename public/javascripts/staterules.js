//---------------- rules page----------------
GameState.gamerules = {
    preload: function () {


    },

    create: function () {
        var rulestext = "General Rules:\nA black hole can only absorb those objects who have size smaller than itself\n\nWinning\nThe games ends when another black hole absorbs you or black hole size reduces to \nsingularity\nThe Game is also time bound. When time runs out player with larger size wins\n\nSingle Player Rules\n1. Out smart the bot black hole to grow larger in size\n2. Absorb bonus objects to boost size\n\nMultiplayer Rules\n1. Absorb only your specific colour. contact with enemy black hole\nor opposite colour makes you shrink.\n2. Absorb incoming fireballs to grow in size.\n\n";
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        //game.add.tileSprite(0, 0, winwidth, winheight, 'rulesbg');

        //game.debug.text(winheight);
        //game.debug.text(winwidth, 23, 43);
        //--------title----------
        //var title = game.add.text(0, 0, 'RULES AND TIPS', style);


        var style = { font: "20px Arial", fill: "#fff", align: "center", wordwrap: true, wordWrapWidth: 300 };

        var text = game.add.text(100, 100, rulestext, style);
        text.setTextBounds(16, 16, 600, 600);
        text.anchor.x = 0;  


        var htp = game.add.sprite(600,0,'htp');
        htp.scale.setTo(0.4,0.4);

        var blackhole = game.add.sprite(20,80,'blackhole');
        blackhole.scale.setTo(0.15,0.15);



        homebutton = game.add.button(1300, 580, 'homebt', gohome, this, 2, 1, 0);
        homebutton.scale.setTo(0.05, 0.05);

    },

    update: function () {

    }
}