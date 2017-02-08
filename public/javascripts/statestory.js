
var eye, cursors, count = 1;
var style = { font: "50px Impact", fill: "#f26c4f", align: "left", style: "italics" };
var vert, horz;
var worldScale = 2;
var next, words, txtlng;
var flag = 0;
var atom, plnt, plnt1, plnt2, plnt3;
var trig, trig1, trig2, trig3, trig4, sigi;
var bang;
var backg, earth, destroyer, blkhole;
var blkst1, blkst2, supnov;

WebFontConfig = {

    //  'active' means all requested fonts have finished loading
    //  We set a 1 second delay before calling 'createText'.
    //  For some reason if we don't the browser cannot render the text the first time it's created.
    // active: function() { game.time.events.add(Phaser.Timer.SECOND, createText, this); },

    //  The Google Fonts we want to load (specify as many as you like in the array)
    google: {
      families: ['Montserrat']
    }
}

GameState.storyline = {

    preload: function () {
        game.stage.backgroundColor = '#000';
        game.load.image('bigbang', './images/bigbang.png');
        game.load.image('atom', './images/atom.png');
        game.load.image('galxy', './images/galxy.jpg');
        game.load.image('storybg', './images/storybg.jpg');
        game.load.image('destroyer', './images/blackholeedit.png');
        game.load.image('blkhole', './images/blkhole 2.jpg');
        game.load.image('earth', './images/earth_2.png');
        game.load.image('eye', './images/eye.png');
        game.load.image('blkst', './images/blkstory.png');
        game.load.image('player', './images/mars.png');
        game.load.image('plnt', './images/mars.png');
        game.load.image('supnov', './images/supernova.png');
        game.load.image('planets','./images/plants.jpg');
        game.load.script('webfont', '//ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js');

    },

    create: function () {


        // game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        // game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        sigi = new Phaser.Signal();
        sigi.addOnce(atomfade, this);

        var style1 = { font: "20px Montserrat", fill: "#fff", align: "left", wordwrap: true, wordWrapWidth: 300 };
        text = game.add.text(200,200, "- phaser -\nrocking with\ngoogle web fonts",style1);
    text.anchor.setTo(0.5);

    // text.font = 'Montserrat';
    // text.fontSize = 60;
        //------------animations var-------
        game.physics.startSystem(Phaser.Physics.ARCADE);
        backg = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'storybg');
        homebutton = game.add.button(1080, 470, 'homebt', gohome, this, 2, 1, 0);
        homebutton.scale.setTo(0.01, 0.01);
        // homebutton.fixedToCamera = true;
        // homebutton.cameraOffset.setTo(1400, 600);
        game.world.setBounds(0, 0, 10000, 1200);

        player = game.add.sprite(350, 350, 'player');
        player.anchor.setTo(0.5, 0.5);
        player.scale.setTo(0.2, 0.2);
        //----------eye--------
        eye = game.add.sprite(230, 220, 'eye');
        eye.anchor.setTo(0.5, 0.5);
        eye.scale.setTo(0.2, 0.2);
        // game.camera.follow(eye, Phaser.Camera.FOLLOW_LOCKON);
        // game.physics.enable(eye, Phaser.Physics.ARCADE);
        game.camera.x = (eye.x);
        game.camera.y = (eye.y);
        cursors = game.input.keyboard.createCursorKeys();

        //----------atom---------------
        atom = game.add.sprite(-80, 880, 'atom');
        atom.scale.setTo(0.2, 0.2);

        blkst1 = game.add.sprite(1590, 230, 'blkst');
        blkst1.anchor.setTo(0.5, 0.5);
        blkst1.scale.setTo(0.5,0.5);
        blkst1.pivot.y = 200;
        blkst1.alpha = 0;


        blkst2 = game.add.sprite(1590, 230, 'blkst');
        blkst2.anchor.setTo(0.5, 0.5);
        blkst2.scale.setTo(0.5, 0.5);
        blkst2.pivot.x = 200;
        blkst2.alpha = 0;

        setTimeout(function () {
            // nextLine();
            startstory();
        }, 1000);

        function startstory() {
            // flag =1;
            earth = game.add.sprite(230, 230, 'earth');
            earth.anchor.setTo(0.5, 0.5);
            earth.scale.setTo(0.18, 0.18);
            var title = game.add.text(140, 110, "ARE WE EARTHLINGS,\n THE ONLY SENTIENT BEINGS IN THE COSMOS???\n COULD THERE BE SOMEONE OUT THERE!!", style);
            title.anchor.setTo(0, 0);
            title.scale.setTo(0.5, 0.5);
            title.alpha = 0;


            trig = game.add.tween(title).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 500, 0, false);
            trig.onComplete.add(setTimeout(function () {
                // flag =2;
                console.log("flag 2 called");
                game.add.tween(eye).to({ x: 350, y: 920 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false); //move down
                // earth.destroy();
                // title.destroy();
                sigi.dispatch();

            }, 4000))


        }


        // setTimeout(function(){
        //     // game.add.tween(atom).to({ x: 350, y: 920, }, 4000, Phaser.Easing.Linear.None, true, 0, 0, false);
        //     atomfade();},3000);

        function atomfade() {

            sigi.remove(atomfade);
            // flag =1;
            game.add.tween(atom).to({ x: 350, y: 920, }, 4000, Phaser.Easing.Linear.None, true, 0, 0, false);
            var title = game.add.text(120, 830, "AEONS AGO THE NASCENT UNIVERSE \n SAW TWO PRIMORDIAL BEINGS\n THE 'SKEMDARVARGUR'\nTHE DESTROYER OF WORLDS", style);
            title.anchor.setTo(0, 0);
            title.scale.setTo(0.5, 0.5);
            title.alpha = 0;
            game.add.tween(title).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 550, 0, false);

            var trig1 = game.add.tween(atom).to({ alpha: 0 }, 3000, Phaser.Easing.Linear.None, true, 000, 0, false);
            trig1.onComplete.add(blast);
        }
        function blast() {
            // atom.destroy();
            // flag =2;
            game.camera.flash(0xff0000, 500);
            bang = game.add.sprite(atom.x, atom.y, 'bigbang');
            bang.scale.setTo(0.2, 0.2);
            setTimeout(function () {
                bang.destroy();
            }, 500);
            setTimeout(function () {
                // flag =1;
                game.add.tween(eye).to({ x: 1610, y: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
                twoblk();
            }, 3000);
        }

        function twoblk() {

            // flag =1;
            blkst1.alpha = blkst2.alpha = 1;
            // game.add.tween(eye).to({x:1610,y:200},2000,Phaser.Easing.Linear.None, true, 0,0,false);
            game.camera.flash(0xffff00, 100);
            var title = game.add.text(1400, 100, "IN THE VOID \n THEY TOOK THE FORM OF WHAT WE CALL TODAY\n 'SUPERMASSIVE BLACKHOLES'", style);
            title.anchor.setTo(0, 0);
            title.scale.setTo(0.5, 0.5);
            game.add.tween(title).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 550, 0, false);
            // game.add.tween(blkst1).to( { y: 400 }, 5000, Phaser.Easing.Back.InOut, true, 0, 0, true);
            //game.add.tween(blkst2).to( { x: 400 }, 2000, Phaser.Easing.Back.InOut, true, 0, 2000, true);
            // game.add.tween(eye).to({x:1610,y:920},2000,Phaser.Easing.Linear.None, true, 1000,0,false);
            setTimeout(function () {
               
                // flag =2;
                game.add.tween(eye).to({ x: 1550, y: 650 }, 2000, Phaser.Easing.Linear.None, true, 1000, 0, false);
                sorb();
                 blkst1.destroy();blkst2.destroy();
            }, 6700);
        }

        function sorb() {
            // flag = 1;
             destroyer = game.add.sprite(1550, 650, 'planets');
                destroyer.anchor.setTo(0.5,0.5);
                destroyer.scale.setTo(0.8,0.8);
                destroyer.alpha = 0;
            var title = game.add.text(1350, 550, "DEVOURING ALL MATTER IN THEIR PATH\n THEY ARE FOREVER AT WAR\n WITH EACH OTHER...", style);
            title.anchor.setTo(0, 0);
            title.scale.setTo(0.5, 0.5);
            game.add.tween(title).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 550, 0, false);
            // flag = 2;
           
            plnt = game.add.sprite(1430, 710, 'player');
            plnt.anchor.setTo(0.5, 0.5);
            plnt.scale.setTo(0.1, 0.1);

            plnt1 = game.add.sprite(1640, 650, 'player');
            plnt1.anchor.setTo(0.5, 0.5);
            plnt1.scale.setTo(0.2, 0.2);

            plnt2 = game.add.sprite(1340, 740, 'player');
            plnt2.anchor.setTo(0.5, 0.5);
            plnt2.scale.setTo(0.2, 0.2);

            plnt3 = game.add.sprite(1370, 650, 'player');
            plnt3.anchor.setTo(0.5, 0.5);
            plnt3.scale.setTo(0.12, 0.12);

            setTimeout(function () {
                eat();
            }, 2000);

            function eat() {
                game.add.tween(destroyer).to({alpha: 1},1500,Phaser.Easing.Linear.None,true,900,0,false);
               blkst1 = game.add.sprite(1520, 650, 'blkst');
        blkst1.anchor.setTo(0.5, 0.5);
        blkst1.scale.setTo(0.3,0.3);
        trig2 =game.add.tween(blkst1).to({x:1430, y:710},900,Phaser.Easing.Linear.None,true,900,0,false);
          var interval = setTimeout(function() {
           console.log("2 called me");
           game.add.tween(blkst1.scale).to({x: 0.6, y: 0.6},200,Phaser.Easing.Linear.None,true,0,0,false);
       plnt.destroy();
       game.add.tween(blkst1).to({x:1370, y:650},900,Phaser.Easing.Linear.None,true,900,0,false);    
       }, 3000);
       
       trig2.onComplete.add(interval,
       setTimeout(function() {
           last();
       }, 5000));
            }
        
            function last(){
                console.log("last");
                
           game.add.tween(eye).to({x:1070, y:890},500,Phaser.Easing.Linear.None,true,0,0,false);
        //    gohome();
            }
        }


    },





    update: function () {
        // game.world.pivot.x=game.camera.x=eye.x;
        // game.world.pivot.ys=game.camera.y=eye.y;
        game.camera.x = eye.x;
        game.camera.y = eye.y;
        game.camera.follow(eye, Phaser.Camera.FOLLOW_LOCKON);
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {//   game.world.pivot.y -= 5;  //   player.y -= 5;
            eye.y -= 30;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {  //   game.world.pivot.y += 5;  //   player.y += 5;
            eye.y += 30;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) { //   game.world.pivot.x -= 5; //   player.x -= 5;
            eye.x -= 30;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) { //   game.world.pivot.x += 5;      //   player.x += 5;
            eye.x += 30;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) { worldScale += 0.05; }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.X)) { worldScale -= 0.05; }




        if (game.input.keyboard.isDown(Phaser.Keyboard.W)) { player.y -= 10; }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) { player.x -= 10; }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) { player.y += 10; }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) { player.x += 10; }
        game.debug.text("p.x" + player.x + "\np.y" + player.y, 32, 42);

        game.debug.spriteInfo(eye, 32, 62);

        blkst1.rotation -= 0.05;
        blkst2.rotation += 0.05;

        if (game.input.keyboard.isDown(Phaser.Keyboard.X)) { worldScale -= 0.5; }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) { worldScale += 0.5; }
        if (flag == 1) {
            (flag == 1) ? (setTimeout(function () { }, 500), count++ , worldScale += 0.05) : (flag = 0);

            console.log("peep");
        }
        if (flag == 2) {
            (flag == 2) ? (setTimeout(function () { }, 500), count-- , worldScale -= 0.3) : (flag = 0);

            console.log(flag);
        }

        worldScale = Phaser.Math.clamp(worldScale, 1, 3); // set a minimum and maximum scale value
        game.world.scale.set(worldScale);// set our world scale as needed
        game.debug.text(worldScale, 32, 32);

        
    }// end of update
}// end of gaemstate