
GameState.storyline = {

    preload: function () {


    },

    create: function () {
        var line = [];
        var wordIndex = 0;
        var lineIndex = 0;
        var wordDelay = 120;
        var lineDelay = 400;
        var storylinetext = [
            "I am Death the destroyer of Worlds.",
            "Unknown until it was thought that we were the only sentient life in Universe. Are we?",
            "Aeons ago when the nascent uiverse saw two beings the 'skemdarvargur'. in the void ",
            "they took the form of what we call today as supermassive black holes. ",
            "Devouring all matter in their path ",
            "they are forever at war with each other."
        ];
        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.add.tileSprite(0, 0, winwidth, winheight, 'storybg');

        // game.debug.text(winheight);
        // game.debug.text(winwidth, 23, 43);
        //--------title----------
        var style = { font: "20px Arial", fill: "#fab", align: "center" };
        var title = game.add.text(0, 0, 'STORYLINE', style);
        title.anchor.setTo(0, 0);


        var style1 = { font: "20px Arial", fill: "#fff", align: "center", wordwrap: true, wordWrapWidth: 300 };

        //    var text = game.add.text(100,100, rulestext, style);
        //    text.setTextBounds(16,16, 600,600);
        //    text.anchor.x=0;
        var text = game.add.text(600, 300,'', style1);
        text.setTextBounds(0,0,300,300);
        nextLine();1

        function nextLine() {
            if (lineIndex === storylinetext.length) {
                return;
            }

            line = storylinetext[lineIndex].split(' ');
            wordIndex = 0;

            game.time.events.repeat(wordDelay, line.length, nextWord, this);

            lineIndex++;

        }

        function nextWord() {
            text.text = text.text.concat(line[wordIndex] + " ");
            wordIndex++;

            if (wordIndex === line.length) {
                text.text = text.text.concat("\n");

                game.time.events.add(lineDelay, nextLine, this);
            }
        }

        homebutton = game.add.button(1050, 270, 'homebt', gohome, this, 2, 1, 0);
        homebutton.scale.setTo(0.3, 0.3);
    },



    update: function () {

    }
}