
var game = new Phaser.Game(1000, 600, Phaser.AUTO, "gameCore", { preload: preload, create: create, update: update });
var player;
var x = 3500;
var y = 0;
var skillCount = 0;
var cssText;
var projects;
var skills;
var projectOneLocationX = 1400;
var projectOneLocationY = 200;
var distanceBetweenProjects = 1000;

function preload() {
	//preloads all game elements
	game.load.image('sky', 'images/game-core/sky.png');
    game.load.image('ground', 'images/game-core/platform.png');
    //skill tree 
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
    //projects
    game.load.image('bobs', 'images/game-core/projects/bobs.png');
    game.load.image('friends', 'images/game-core/projects/friend-finder.png');
    game.load.image('ranger', 'images/game-core/projects/hike-finder.png');
    game.load.image('giphy', 'images/game-core/projects/widget-info.png');
    game.load.image('trivia', 'images/game-core/projects/trivia.png');
    game.load.image('fetch', 'images/game-core/projects/bobs.png');
    game.load.image('rpg', 'images/game-core/projects/role-player.png');
    game.load.image('hang-man', 'images/game-core/projects/hang-man.png');
    //players
    game.load.spritesheet('dude', 'images/game-core/baddie.png', 32, 30);
}

function create() {
	//game physics
	game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'sky');

    //world bounds
    game.world.setBounds(0, 0, 10000, 1000);

    //  The platforms group contains the ground and ledges
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 60, 'ground');

    //  Scale it to fit the width of the game
    ground.scale.setTo(100, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create ledges
    var ledge = platforms.create(1500, 800, 'ground');

    ledge.body.immovable = true;

    ledge = platforms.create(1800, 670, 'ground');

    ledge.body.immovable = true;
    
    ledge = platforms.create(1500, 500, 'ground');

    ledge.body.immovable = true;

    ledge = platforms.create(1500, 500, 'ground');

    ledge.body.immovable = true;

    //projects group
    projects = game.add.group();

    projects.enableBody = true;
    
    //project Loader
    projects.create(projectOneLocationX, projectOneLocationY, 'bobs');

    projects.create(projectOneLocationX+= distanceBetweenProjects, projectOneLocationY, 'friends');

    projects.create(projectOneLocationX+= distanceBetweenProjects, projectOneLocationY, 'ranger');

    projects.create(projectOneLocationX+= distanceBetweenProjects, projectOneLocationY, 'fetch');

    projects.create(projectOneLocationX+= distanceBetweenProjects, projectOneLocationY, 'hang-man');

    projects.create(projectOneLocationX+= distanceBetweenProjects, projectOneLocationY, 'giphy');

    projects.create(projectOneLocationX+= distanceBetweenProjects, projectOneLocationY, 'trivia');

    projects.create(projectOneLocationX+= distanceBetweenProjects, projectOneLocationY, 'rpg');


    //skill-set group
    skills = game.add.group();

    skills.enableBody = true;

    // //skill-set loaders
    // skills.create(600, 300, 'js');

    // skills.create(400, 400, 'html');

    // skills.create(600, 200, 'css');

    // skills.create(600, 400, 'github');

    // skills.create(800, 400, 'jquery');

    // skills.create(1000, 400, 'node');

    // skills.create(1200, 400, 'bootstrap');

    // skills.create(1400, 400, 'mocha');

    // skills.create(1600, 400, 'chai');

    // skills.create(1800, 400, 'react');

    // skills.create(2000, 400, 'sass');

    //text loaders
    AboutMeLineOne = game.add.text(10,650, 'Hello and welcome to my portfolio game', { fontSize: '12px', fill: '#000' });
    AboutMeLineTwo = game.add.text(10,700, 'Move the Left or Right arrows to traverse this world', { fontSize: '12px', fill: '#000' });
    AboutMeLineThree = game.add.text(10,750, 'If you want to learn more about a project simply bump it with your head!', { fontSize: '12px', fill: '#000' });

    scoreText = game.add.text(1100, 450, 'Bobs Burgers', { fontSize: '32px', fill: '#000' });
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
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 3;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -400;
    }

    //starts collision
    game.physics.arcade.collide(skills, platforms);

    game.physics.arcade.overlap(player, skills, gainSkill, null, this);
}


function gainSkill (player, skill) {

    // Removes the star from the screen
    skill.kill();

    // switch(skillCount) {
    // case 0:
    //     skills.create(x, y, "html");
    //     x+= 10;
    //     y+= 10;
    //     break;
    // case 1:
    //     skills.create(x, y, "css");
    //     x+= 10;
    //     //y+= 200;
    //     break;
    // case 2:
    //     skills.create(x, y, "js");
    //     x+= 10;
    //     //y+= 200;
    //     break; 
    // case 3:
    //     skills.create(x, y, "jquery");
    //     x+= 10;
    //     //y+= 200;
    //     break;
    // case 4:
    //     skills.create(x, y, "bootstrap");
    //     x+= 10;
    //     //y+= 200;
    //     break;  
    // case 5:
    //     skills.create(x, y, "github");
    //     x+= 100;
    //     //y+= 200;
    //     break;  
    // case 6:
    //     skills.create(x, y, "mocha");
    //     x+= 10;
    //     //y+= 200;
    //     break;
    // case 7:
    //     skills.create(x, y, "chai");
    //     x+= 10;
    //     //y+= 200;
    //     break;
    // case 8:
    //     skills.create(x, y, "react");
    //     x+= 10;
    //     //y+= 200;
    //     break; 
    // case 9:
    //     skills.create(x, y, "sass");
    //     x+= 10;
    //     //y+= 200;
    //     break;         

    // default:
    //     skills.create(x, y, "node");
    //     x+= 10;
    //     //y+= 100;
       
//}
    skillCount++;
    console.log(this);



}
