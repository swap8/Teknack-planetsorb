var eye,cursors;
var worldScale=2;
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
    },
    
    create: function () {
        //------------animations var-------
        
        backg = game.add.tileSprite(0,0, window.innerWidth,window.innerHeight, 'storybg');

        homebutton = game.add.button(1080, 470, 'homebt', gohome, this, 2, 1, 0);
        homebutton.scale.setTo(0.1, 0.1);
       game.world.setBounds(0, 0, 4000, 4000);


       function startstory(){
           
       }
        earth = game.add.sprite(250,350, 'earth');
        earth.anchor.setTo(0.5, 0.5);
        earth.scale.setTo(0.2, 0.2);
        

        var title = game.add.text(earth.x+100,earth.y, "ARE WE THE ONLY SENTIENT BEINGS IN THE COSMOS?????", { font: "32px Arial", fill: "#f26c4f", align: "center" });
        title.anchor.setTo(0,0);
        title.scale.setTo(0.5,0.5);
        console.log(title.x,title.y);
        //---------render earth-----------
        
        //---------render blkhole pic -------------
        // blkhole = game.add.sprite(50, 50, 'blkhole');
        // blkhole.scale.setTo(1, 1);

        //-----------render destroyer ---------
        // destroyer = game.add.sprite(80, 450, 'destroyer');
        // destroyer.anchor.setTo(0.5, 0.5);
        // destroyer.scale.setTo(0.5, 0.5);

        eye = game.add.sprite(350,350,'eye');
        eye.anchor.setTo(0.5,0.5);
        eye.scale.setTo(0.2,0.2);
        eye.fixedToCamera = true;
        game.camera.x = (eye.x);
        game.camera.y = (eye.y);
        cursors = game.input.keyboard.createCursorKeys();

        var t = game.add.text(0, 0, "this text is fixed to the camera", { font: "32px Arial", fill: "#ffffff", align: "center" });
        t.fixedToCamera = true;
        t.cameraOffset.setTo(200, 500);
        
        atom = game.add.sprite(32, 32, 'atom');
        atom.scale.setTo(0.2, 0.2);

        // logo1.fixedToCamera = true;
        // logo1.alpha = 1;
        atom.cameraOffset.setTo(100, 100);
       // setTimeout(function(){atomfade();},3000);

        function atomfade(){
            game.add.tween(atom).to({ x: 600, y: 300, }, 3500, Phaser.Easing.Linear.None, true, 0, 0, false);
        var trig = game.add.tween(atom).to({ alpha: 0 }, 3000, Phaser.Easing.Linear.None, true, 1000, 0, false);
        trig.onComplete.add(blast);
        }
        
        function blast(){
            game.camera.flash(0xff0000, 500);
            bang = game.add.sprite(atom.x, atom.y, 'bigbang');
            bang.scale.setTo(0.2, 0.2);
            bang.alpha = 1;
            setTimeout(function(){bang.destroy();},1000);
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
    if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
    //   game.world.pivot.y -= 5;  
    //   player.y -= 5;
    game.camera.y-=30;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) {
    //   game.world.pivot.y += 5;    
    //   player.y += 5;
    game.camera.y+=30;
    }
    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
    //   game.world.pivot.x -= 5;
    //   player.x -= 5;
    game.camera.x-=30;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
    //   game.world.pivot.x += 5;    
    //   player.x += 5;
    game.camera.x+=30;
    }

        if (game.input.keyboard.isDown(Phaser.Keyboard.Q)) {
        worldScale += 0.05;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.A)) {
        worldScale -= 0.05;
    }
    
    // set a minimum and maximum scale value
    worldScale = Phaser.Math.clamp(worldScale, 0.25, 4);
    
    // set our world scale as needed
    game.world.scale.set(worldScale);
    game.debug.text(worldScale, 32,32);
    game.debug.text("eye.x"+eye.x+"\neye.y"+eye.y, 32,42);

    }
}