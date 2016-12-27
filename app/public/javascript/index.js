
var game = new Phaser.Game(1000, 600, Phaser.AUTO, "gameCore", { preload: preload, create: create, update: update });
var player;

function preload() {
	//preloads all game elements
	game.load.image('sky', 'images/sky.png');
    game.load.image('ground', 'images/platform.png');
    game.load.spritesheet('dude', 'images/baddie.png', 32, 30);
}

function create() {
	//game physics
	game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 64, 'ground');

    //  Scale it to fit the width of the game
    ground.scale.setTo(3, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

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
        player.body.velocity.x = 150;

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
