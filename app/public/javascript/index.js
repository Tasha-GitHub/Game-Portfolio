
var game = new Phaser.Game(1000, 600, Phaser.AUTO, "gameCore", { preload: preload, create: create, update: update });
var player;

function preload() {
	//preloads all game elements
	game.load.image('sky', 'images/game-core/sky.png');
    game.load.image('ground', 'images/game-core/platform.png');
    game.load.image('js', 'images/skills-tree/javascript.png');
    game.load.image('html', 'images/skills-tree/htmlLogo.png');
    game.load.image('css', 'images/skills-tree/css.png');
    game.load.image('github', 'images/skills-tree/github.png');
    game.load.image('node', 'images/skills-tree/node.png');
    game.load.image('jquery', 'images/skills-tree/jquery.png');
    game.load.image('bootstrap', 'images/skills-tree/bootstrap.png');
    game.load.image('mocha', 'images/skills-tree/mocha.png');
    game.load.image('chai', 'images/skills-tree/chai.png');
    game.load.image('react', 'images/skills-tree/react.png');
    game.load.image('sass', 'images/skills-tree/sass.png');
    game.load.spritesheet('dude', 'images/game-core/baddie.png', 32, 30);
}

function create() {
	//game physics
	game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //world bounds
    game.world.setBounds(0, 0, 4000, 600);

    //  The platforms group contains the ground and ledges
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game
    ground.scale.setTo(11, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //skill-set loaders
    game.add.sprite(0, 400, 'js');

    game.add.sprite(200, 400, 'html');

    game.add.sprite(400, 400, 'css');

    game.add.sprite(600, 400, 'github');

    game.add.sprite(800, 400, 'jquery');

    game.add.sprite(1000, 400, 'node');

    game.add.sprite(1200, 400, 'bootstrap');

    game.add.sprite(1400, 400, 'mocha');

    game.add.sprite(1600, 400, 'chai');

    game.add.sprite(1800, 400, 'react');

    game.add.sprite(2000, 400, 'sass');

    //PLAYER DYNAMICS

    // The player and its settings
    player = game.add.sprite(10, game.world.height - 150, 'dude');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0,1], 10, true);
    player.animations.add('right', [2,3], 10, true);

    //camera follow
    game.camera.follow(player, Phaser.Camera.FOLLOW_LOCKON, 0.1, 0.1);



}

function update() {

		    //  Collide the player and the stars with the platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);

    cursors = game.input.keyboard.createCursorKeys();
    //  Reset the players velocity (movement)
    player.body.velocity.x = 0;



    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 350;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -400;
    }
}
