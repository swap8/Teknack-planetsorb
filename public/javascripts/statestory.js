
var eye, cursors, count = 1;
var style = { font: "50px Impact", fill: "yellow", align: "left"};
var vert, horz;
var worldScale = 2;
var creation, words, txtlng;
var flag = 0;
var atom, plnt, plnt1, plnt2, plnt3;
var trig, trig1, trig2, trig3, trig4, sigi;
var bang;
var backg, earth, destroyer;
var blkst1, blkst2, supnov;

GameState.storyline = {

    preload: function () {
        game.stage.backgroundColor = '#000';
        game.load.image('bigbang', './images/bigbang.png');
        game.load.image('atom', './images/atom.png');
        game.load.image('creation', './images/creation.jpg');
        game.load.image('storybg', './images/storybg.jpg');
        game.load.image('destroyer', './images/blackholeedit.png');
        
        game.load.image('earth', './images/earthstory.png');
        game.load.image('eye', './images/eye.png');
        game.load.image('blkst', './images/blkstory.png');
        game.load.image('pluto','./images/pluto.png');
        game.load.image('uranus','./images/urenus.png');
        game.load.image('venus', './images/venus.png');
        game.load.image('plnt', './images/mars.png');
        game.load.image('supnov', './images/supernova.png');
        game.load.image('planets','./images/plants.jpg');
        game.load.image('quest','./images/quest.png');


    },

    createText: function() {

    text = game.add.text(game.world.centerX, game.world.centerY, "- phaser -\nrocking with\ngoogle web fonts");
    text.anchor.setTo(0.5);

    text.font = 'Revalia';
    text.fontSize = 60;
    },
    create: function () {
       

        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        sigi = new Phaser.Signal();
        sigi.addOnce(atomfade, this);

        //------------animations var-------
        game.physics.startSystem(Phaser.Physics.ARCADE);
        backg = game.add.tileSprite(0, 0, 1920,1080, 'storybg');
       
        game.world.setBounds(0, 0, 2000, 1200);

       
        //----------eye--------
        eye = game.add.sprite(230, 220, 'eye');
        eye.anchor.setTo(0.5, 0.5);
        eye.scale.setTo(0.2, 0.2);
        eye.alpha = 0;
       
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
            earth = game.add.sprite(230, 270, 'earth');
            earth.anchor.setTo(0.5, 0.5);
            earth.scale.setTo(0.3, 0.3);
            var title = game.add.text(140, 110, "ARE WE EARTHLINGS,\n THE ONLY SENTIENT BEINGS IN THE COSMOS???\n COULD THERE BE SOMEONE OUT THERE!!", style);
            title.setShadow(5, 5, 'rgba(255,255,255,0.5)', 5);
            title.anchor.setTo(0, 0);
            title.scale.setTo(0.5, 0.5);
            title.alpha = 0;
            var quest = game.add.sprite(330, 270, 'quest');
                quest.anchor.setTo(0.5,0.5);
                quest.scale.setTo(0.5,0.5);
                quest.alpha=0;
               game.add.tween(quest).to({ alpha: 1 }, 100, Phaser.Easing.Linear.None, true, 1000, 0, false);

            trig = game.add.tween(title).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false);
            trig.onComplete.add(setTimeout(function () {
                // flag =2;
                
                console.log("flag 2 called");
                game.add.tween(eye).to({ x: 350, y: 920 }, 1000, Phaser.Easing.Linear.None, true, 0, 0, false); //move down
                // earth.destroy();
                // title.destroy();
                sigi.dispatch();

            }, 4000))


        }

        function atomfade() {

            sigi.remove(atomfade);
            // flag =1;
            setTimeout(function() {
                creation =game.add.sprite(450,920,'creation');
                creation.anchor.setTo(0.7,0.5);
                creation.scale.setTo(0.5,0.5);
                creation.alpha=0;
                game.add.tween(creation).to({alpha:1},1500,Phaser.Easing.Linear.None,true,50,0,true);

            }, 3000);
            game.add.tween(atom).to({ x: 350, y: 980, }, 4000, Phaser.Easing.Linear.None, true, 0, 0, false);
            var title = game.add.text(120, 810, "AEONS AGO THE NASCENT UNIVERSE \n SAW TWO PRIMORDIAL BEINGS\n THE 'SKEMDARVARGUR'\nTHE DESTROYER OF WORLDS", style);
            // title.setShadow(5, 5, 'rgba(255,255,255,0.5)', 5);
            title.anchor.setTo(0, 0);
            title.scale.setTo(0.5, 0.5);
            title.alpha = 0;
            game.add.tween(title).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 550, 0, false);

            var trig1 = game.add.tween(atom).to({ alpha: 0 }, 3000, Phaser.Easing.Linear.None, true, 000, 0, false);
            trig1.onComplete.add(blast);
        }
        function blast() {
            game.camera.flash(0xff0000, 500);
            bang = game.add.sprite(atom.x, atom.y, 'bigbang');
            bang.scale.setTo(0.2, 0.2);
            setTimeout(function () {
                bang.destroy();
            }, 500);
            setTimeout(function () {
                // flag =1;
                game.add.tween(eye).to({ x: 1610, y: 200 }, 2000, Phaser.Easing.Linear.None, true, 0, 0, false);
                creation.destroy();
                twoblk();
            }, 3000);
        }

        function twoblk() {

           
            blkst1.alpha = blkst2.alpha = 1;
           
            game.camera.flash(0xffff00, 100);
            var title = game.add.text(1400, 100, "IN THE VOID \n THEY TOOK THE FORM OF WHAT WE CALL TODAY\n 'SUPERMASSIVE BLACKHOLES'", style);
            // title.setShadow(5, 5, 'rgba(255,255,255,0.5)', 5);
            title.anchor.setTo(0, 0);
            title.scale.setTo(0.5, 0.5);
            game.add.tween(title).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 550, 0, false);
            
            setTimeout(function () {
               
            
                game.add.tween(eye).to({ x: 1550, y: 650 }, 2000, Phaser.Easing.Linear.None, true, 1000, 0, false);
                sorb();
                 blkst1.destroy();blkst2.destroy();
            }, 6700);
        }

        function sorb() {
                destroyer = game.add.sprite(1550, 650, 'planets');
                destroyer.anchor.setTo(0.5,0.5);
                destroyer.scale.setTo(0.8,0.8);
                destroyer.alpha = 0;
            var title = game.add.text(1350, 550, "DEVOURING ALL MATTER IN THEIR PATH\n THEY ARE FOREVER AT WAR\n WITH EACH OTHER...", style);
            // title.setShadow(5, 5, 'rgba(255,255,255,0.5)', 5);
            title.anchor.setTo(0, 0);
            title.scale.setTo(0.5, 0.5);
            game.add.tween(title).to({ alpha: 1 }, 1000, Phaser.Easing.Linear.None, true, 550, 0, false);
           
           
            plnt = game.add.sprite(1430, 710, 'plnt');
            plnt.anchor.setTo(0.5, 0.5);
            plnt.scale.setTo(0.1, 0.1);

            plnt1 = game.add.sprite(1640, 650, 'venus');
            plnt1.anchor.setTo(0.5, 0.5);
            plnt1.scale.setTo(0.3, 0.3);

            plnt2 = game.add.sprite(1340, 740, 'uranus');
            plnt2.anchor.setTo(0.5, 0.5);
            plnt2.scale.setTo(0.3, 0.3);

            plnt3 = game.add.sprite(1370, 650, 'pluto');
            plnt3.anchor.setTo(0.5, 0.5);
            plnt3.scale.setTo(0.3, 0.3);

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
           gohome();
            }
        }


    },





    update: function () {
       
        game.camera.x = eye.x;
        game.camera.y = eye.y;
        game.camera.follow(eye, Phaser.Camera.FOLLOW_LOCKON);
        if (game.input.keyboard.isDown(Phaser.Keyboard.UP)) {
            eye.y -= 30;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN)) { 
            eye.y += 30;
        }
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
            eye.x -= 30;
        }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            eye.x += 30;
        }

        if (game.input.keyboard.isDown(Phaser.Keyboard.Z)) { worldScale += 0.05; }
        else if (game.input.keyboard.isDown(Phaser.Keyboard.X)) { worldScale -= 0.05; }




       

        game.debug.spriteInfo(eye, 32, 62);
        atom.rotation +=0.02;
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