var eye, cursors;
var vert, horz;
var worldScale = 2;
var next;
var flag = 0;
var atom;
var bang;
var backg, earth, destroyer, blkhole;
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
        game.load.image('blkst','./images/blkstory.png');

        game.load.image('player', './images/mars.png');

    },

    create: function () {
        //------------animations var-------
        game.physics.startSystem(Phaser.Physics.ARCADE);



        backg = game.add.tileSprite(0, 0, window.innerWidth, window.innerHeight, 'storybg');

        homebutton = game.add.button(1080, 470, 'homebt', gohome, this, 2, 1, 0);
        homebutton.scale.setTo(0.01, 0.01);
        homebutton.fixedToCamera = true;
        homebutton.cameraOffset.setTo(1400, 600);
        game.world.setBounds(0, 0, 1920, 1080);

        player = game.add.sprite(350, 350, 'player');
        player.anchor.setTo(0.5, 0.5);
        player.scale.setTo(0.2, 0.2);
        //----------eye--------
        eye = game.add.sprite(350, 350, 'eye');
        eye.anchor.setTo(0.5, 0.5);
        eye.scale.setTo(0.2, 0.2);
        eye.fixedToCamera = true;
        game.physics.enable(eye, Phaser.Physics.ARCADE);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        game.camera.x = (eye.x);
        game.camera.y = (eye.y);
        cursors = game.input.keyboard.createCursorKeys();


        setTimeout(function () {
            startstory();
        }, 2000);

        function startstory() {

            earth = game.add.sprite(250, 350, 'earth');

            earth.anchor.setTo(0.5, 0.5);
            earth.scale.setTo(0.2, 0.2);
            var title = game.add.text(earth.x + 100, earth.y, "ARE WE THE ONLY SENTIENT BEINGS IN THE COSMOS?????", { font: "32px Arial", fill: "#f26c4f", align: "center" });
            title.anchor.setTo(0, 0);
            title.scale.setTo(0.5, 0.5);
            title.alpha = 0;
            game.add.tween(title).to({ alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 500, 0, false);
            setTimeout(function () {
                console.log("move funct called");
                movecam();
            }, 200);
        }

        function movecam() {
            // flag==1;
            // player.body.velocity.setTo(20,20);
            console.log("move start")
            game.physics.arcade.moveToXY(game.camera, 500,500, 2000, 50);
            // game.add.tween(player).to({x:500,y:500},6000,Phaser.Easing.Linear.None, true, 0,0,false);
        }






        //---------render blkhole pic -------------
        // blkhole = game.add.sprite(50, 50, 'blkhole');
        // blkhole.scale.setTo(1, 1);

        //-----------render destroyer ---------
        // destroyer = game.add.sprite(80, 450, 'destroyer');
        // destroyer.anchor.setTo(0.5, 0.5);
        // destroyer.scale.setTo(0.5, 0.5);



        var t = game.add.text(0, 0, "this text is fixed to the camera", { font: "32px Arial", fill: "#ffffff", align: "center" });
        t.fixedToCamera = true;
        t.cameraOffset.setTo(200, 500);

        atom = game.add.sprite(0, 880, 'atom');
        atom.scale.setTo(0.2, 0.2);


        atom.cameraOffset.setTo(100, 100);
        // setTimeout(function(){atomfade();},3000);

        function atomfade() {
            game.add.tween(atom).to({ x: 350, y: 920, }, 3500, Phaser.Easing.Linear.None, true, 0, 0, false);
            var trig = game.add.tween(atom).to({ alpha: 0 }, 3000, Phaser.Easing.Linear.None, true, 1000, 0, false);
            trig.onComplete.add(blast);
        }

        function blast() {
            game.camera.flash(0xff0000, 500);
            bang = game.add.sprite(atom.x, atom.y, 'bigbang');
            bang.scale.setTo(0.2, 0.2);
            bang.alpha = 1;
            setTimeout(function () { bang.destroy(); }, 1000);
        }

    },





    update: function () {
        // game.camera.x=logo1.cameraOffset.x;
        // game.camera.y=logo1.cameraOffset.y;
        //backg.x=logo1.cameraOffset.x;
        //backg.y=logo1.cameraOffset.y;
        // console.log(logo1.alpha);
        //game.debug.text(game.time.events.duration, 32, 32);
        // movement
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP) || flag == 1) {
            //   game.world.pivot.y -= 5;  
            //   player.y -= 5;
            game.camera.y -= 30;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN) || flag == 1) {
            //   game.world.pivot.y += 5;    
            //   player.y += 5;
            game.camera.y += 30;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT) || flag == 1) {
            //   game.world.pivot.x -= 5;
            //   player.x -= 5;
            game.camera.x -= 30;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT) || flag == 1) {
            //   game.world.pivot.x += 5;    
            //   player.x += 5;
            game.camera.x += 30;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) {
            worldScale += 0.05;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.X)) {
            worldScale -= 0.05;
        }

        // set a minimum and maximum scale value
        worldScale = Phaser.Math.clamp(worldScale, 0.25, 4);

        // set our world scale as needed
        game.world.scale.set(worldScale);
        game.debug.text(worldScale, 32, 32);


        if (game.input.keyboard.isDown(Phaser.Keyboard.W)) {
            player.y -= 10;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
            player.x -= 10;
        }

        else if (game.input.keyboard.isDown(Phaser.Keyboard.S)) {
            player.y += 10;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.D)) {
            player.x += 10;
        }
        game.debug.text("p.x" + player.x + "\np.y" + player.y, 32, 42);
        // game.debug.text(eye.body.velocity.x + "**" + eye.body.velocity.y + "///" + eye.angle, 250, 42);
        game.debug.spriteInfo(eye, 32, 62);

        eye.body.velocity.setTo(0,0);
        player.body.velocity.setTo(0,0);
        // // eye.body.angularVelocity = 0;

        // // if (flag = 1)
        // // {
        //      game.physics.arcade.moveToXY(eye.body.velocity, 350,920, 300,1000);
        // }


    }
}