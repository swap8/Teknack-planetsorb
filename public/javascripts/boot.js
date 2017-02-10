BootState = {
    preload: function () {

        game.load.image('preloadbar', './images/loading.png');
        //this.load.onLoadComplete.add(this.nowstartstate, this);
    },

    create: function () {
        //game.add.sprite(50, 50, 'loading');
        console.log("no problem till here");
        game.state.start('preloader');
    },
    update: function () {

    }
}