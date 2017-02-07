
GameState.start = {
    preload: function () {
        game.load.image('backstart', './images/spacetile.jpg');
        game.load.image('singleplayer', './images/singleplayerai.png');
        game.load.image('multiplayer', './images/multiplayer.jpg');
        game.load.image('matter', './images/earth.png');
        game.load.image('peopleplanet', './images/peopleplanet.png');
        game.load.image('antimatter', './images/mars.png');
        game.load.image('over', './images/over1.jpg');
        game.load.image('playagain', './images/playagain.png');
        game.load.image('blackhole', './images/blackhole2.png');
        game.load.image('fireball', './images/fireball.png');
        game.load.image('asteroid', './images/asteroid.png');

        game.load.image('man', './images/spaceman.png');
        game.load.image('ship', './images/spaceship.png');
        game.load.image('spaceportalborder', './images/spaceportalborder.png');
        game.load.image('portal', './images/portal.png');
        game.load.image('ufo', './images/ufo.png');
        game.load.image('nstar', './images/nstar.png');

        game.load.image('saturn', './images/saturn.png');
        game.load.image('rules', './images/howtoplay.png');
        game.load.image('rulesbg', './images/rulespg.jpg');
        game.load.image('storybg', './images/storybg.jpg');
        game.load.image('storybt', './images/storybt.png');
        game.load.image('homebt', './images/home.png');
        game.load.image('smallstar', './images/large_star.png');
        game.load.image('border', './images/border.png');
        game.load.image('spaceback', './images/spaceback.jpg');
        game.load.image('profile', './images/profile.png');
        game.load.image('connect', './images/connect.jpg');
        game.load.image('next', './images/next.png');
        game.load.image('htp','./images/howtoplayinside.png');


    },
    create: function () {

        game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
        game.add.tileSprite(0, 0, winwidth, winheight, 'backstart');
        //game.add.sprite(winwidth/2,winheight/2,'buttonimage');
        singleplayerbutton = game.add.button(winwidth / 2, winheight / 2.8, 'singleplayer', botsattack, this, 2, 1, 0);
        singleplayerbutton.scale.setTo(1, 1);
        singleplayerbutton.anchor.setTo(0.5, 0.5);
        startbutton = game.add.button(winwidth / 2, winheight / 1.8, 'multiplayer', actionOnClick, this, 2, 1, 0);
        startbutton.scale.setTo(0.25, 0.25);
        startbutton.anchor.setTo(0.5, 0.5);

        rulesbutton = game.add.button(750, 570, 'rules', rulespgclick, this, 2, 1, 0);
        rulesbutton.scale.setTo(1,1);
        rulesbutton.anchor.setTo(0.5, 0.5);

        storybutton = game.add.button(1050, 270, 'storybt', storyline, this, 2, 1, 0);
        storybutton.scale.setTo(0.3, 0.3);

        friend = game.add.button(300, 270, 'storybt', findfriend, this, 2, 1, 0);
        friend.scale.setTo(0.3, 0.3);

        newbutton = game.add.button(1000, 70, 'storybt', see_request, this, 2, 1, 0);
        newbutton.scale.setTo(0.3, 0.3);

        newbutton = game.add.button(1000, 500, 'storybt', see_profile, this, 2, 1, 0);
        newbutton.scale.setTo(0.3, 0.3);

        newbutton = game.add.button(100, 500, 'storybt', friends, this, 2, 1, 0);
        newbutton.scale.setTo(0.3, 0.3);

        var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
        var text = game.add.text(winwidth / 2, winheight / 6, "Planetsorb", style);
        text.anchor.setTo(0.5, 0.5);



        //game.add.image(432, 487, 'logo');

        // THREE.JS variables
        // var globalW = 600,
        //     globalH = 600,
        //     fov = 45,
        //     far = 1000,
        //     container = document.getElementById('mything'),
        //     renderer = new THREE.WebGLRenderer(),
        //     scene = new THREE.Scene(),
        //     cam = new THREE.PerspectiveCamera(fov, globalW / globalH, 1, far),
        //     mainLight = new THREE.PointLight(0xd29553),
        //     ambLight = new THREE.AmbientLight(0x2A4159);
        // baseMat = new THREE.MeshLambertMaterial({
        //     color: 0xa7897d,
        //     shading: THREE.FlatShading
        // }),
        //     secondMat = new THREE.MeshPhongMaterial({ /* credit goes to Mombasa */
        //         color: new THREE.Color("rgb(216,25,203)"),
        //         emissive: new THREE.Color("rgb(255,78,14)"),
        //         specular: new THREE.Color("rgb(235,135,235)"),
        //         shininess: 10,
        //         shading: THREE.FlatShading,
        //         transparent: 1,
        //         opacity: .7
        //     }),
        //     mainSphere = new THREE.Mesh(new THREE.IcosahedronGeometry(100, 2), baseMat),
        //     group = new THREE.Object3D();

        // // Initialize THREE.js system
        // (function initTHREE() {
        //     renderer.setSize(globalW, globalH);
        //     container.appendChild(renderer.domElement);
        //     scene.add(cam);
        //     scene.add(mainLight);
        //     scene.add(ambLight);

        //     group.add(mainSphere);

        //     scene.add(group);

        //     cam.position.z = 600;

        //     mainLight.position.z = 400;
        //     mainLight.position.y = 200;
        //     mainLight.position.x = 50;
        //     mainLight.target = mainSphere;

        //     // For every single face on the sphere, create a new, smaller sphere
        //     // This makes 112 spheres, on a 16x8 sphere
        //     for (var i = 1, j = mainSphere.geometry.faces.length; i < j; i++) {
        //         var newSphere = new THREE.Mesh(new THREE.IcosahedronGeometry(20, 1), secondMat);

        //         // Calculate average centroid of the two triangles
        //         newSphere.position = mainSphere.geometry.faces[i].centroid;

        //         // Animation based values
        //         newSphere.target = new THREE.Vector3(Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100);
        //         newSphere.base = new THREE.Vector3(newSphere.position.x, newSphere.position.y, newSphere.position.z);

        //         // Add to render group
        //         group.add(newSphere);
        //     }

        //     renderer.render(scene, cam);
        // })();

        // // Animation-based variables
        // var t = 0,
        //     decell = false,
        //     lastP = 0;

        // (function tick() {
        //     t++;
        //     var progress = Math.sin(t / 13) / 2 + 0.5;

        //     // Scale main sphere
        //     group.children[0].scale.x = 1 + (progress / 5);
        //     group.children[0].scale.y = 1 + (progress / 5);
        //     group.children[0].scale.z = 1 + (progress / 5);

        //     // Loop through every small sphere
        //     for (var i = 1, j = group.children.length; i < j; i++) {
        //         var sphere = group.children[i];

        //         // Animate to target
        //         sphere.position.x = sphere.base.x + (sphere.target.x * progress);
        //         sphere.position.y = sphere.base.y + (sphere.target.y * progress);
        //         sphere.position.z = sphere.base.z + (sphere.target.z * progress);
        //     }

        //     if (progress < lastP && !decell) { decell = true; }
        //     if (progress > lastP && decell) {
        //         // Generate new random targets
        //         for (var i = 1, j = group.children.length; i < j; i++) {
        //             group.children[i].target = new THREE.Vector3(Math.random() * 200 - 100, Math.random() * 200 - 100, Math.random() * 200 - 100);
        //         }
        //         decell = false;
        //     }
        //     lastP = progress;

        //     group.rotation.y += rotDeg(1.5);
        //     renderer.render(scene, cam);
        //     requestAnimationFrame(tick);
        // })();

        // // Utility functions
        // function rotDeg(deg) {
        //     return deg * (Math.PI / 180);
        // }
    }
}