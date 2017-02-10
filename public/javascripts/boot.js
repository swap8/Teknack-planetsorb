BootState = {
    preload: function () {

        game.load.image('preloadbar', './images/loading.png');
        game.load.image('over', './images/endmaterial.jpg');
        game.load.image('loader', './images/loader.png');
        game.load.image('bar', './images/bar.png');

        //this.load.onLoadComplete.add(this.nowstartstate, this);
    },

    create: function () {
        //game.add.sprite(50, 50, 'loading');
        //console.log("no problem till here");

        game.state.start('preloader');
    },
    update: function () {

    }
}