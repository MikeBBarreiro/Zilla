var level = (function(){
  var o = {

    preload: preload,
    create: create,
    update: update,
    render: render
  };

  // var platforms, music;
  var player, layer, map, cursors, level1Music;

  function preload(){
    game.load.tilemap('Zilla', '/assets/tilemaps/maps/ninja-tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('kenney', '/assets/tilemaps/tiles/kenney.png');
    game.load.spritesheet('Godzilla', '/assets/img/slice01_01_7x29.png', 141, 82);

    //Audio


    // game.load.image('ground', '/assets/ground.png');
    // game.load.image('sky', '/assets/sky.png');
    // //load jump sound effect
    // game.load.audio('jump', 'assets/audio/flap.wav');
    // game.load.audio('music', 'assets/audio/CatAstroPhi_shmup_normal.wav');
    // game.load.audio('score', '/assets/audio/score.wav');
    // game.load.spritesheet('dog', '/assets/dog.png', 32, 32);
    // game.load.image('star', '/assets/star.png');
    // game.load.image('diamond', '/assets/diamond.png');
  }

  function create(){

    game.physics.startSystem(Phaser.Physics.ARCADE);
    map = game.add.tilemap('Zilla');
    map.addTilesetImage('kenney');
    layer = map.createLayer('background01');
    layer.resizeWorld();

    cursors = game.input.keyboard.createCursorKeys();

    //Map Collision is activated here
    map.setCollisionBetween(37, 61);
    map.setCollisionBetween(98, 121);
    // map.setCollisionBetween(27, 28);
    map.setCollision(142);

    layer.debug = true


    player = game.add.sprite(230, 455, 'Godzilla');
    // game.world.height - 150
    game.physics.arcade.enable(player);
    player.anchor.setTo(0.10, 0.10);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.checkWorldBounds = true;
    player.body.collideWorldBounds = true;
    game.camera.follow(player);

    player.animations.add('right', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 10, false);
    player.animations.add('left', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 10, false);
    // player.animations.add('stop', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);


  }


  function render(){
    // player.debug = true;
    game.debug.body(player);
    // game.debug.spriteBounds(player);
    // game.debug.spriteCorners(player, true, true);
  }

  function update(){
    //physics collisions declared here
    game.physics.arcade.collide(player, layer);

    movePlayer();
  }

  function movePlayer(){
    //Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if(cursors.left.isDown){
      player.body.velocity.x = -150;
      player.animations.play('left');
    }else if(cursors.right.isDown){
      player.body.velocity.x = 150;
      player.animations.play('right');
    }else{
      //  Stand still
      player.animations.stop();
      // player.animations.play('stop');
      player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.onFloor()){
      player.body.velocity.y = -250;
    }


  }

  // function countDown(){
  //   if(o.l.time > 0){
  //     o.l.time -= 1;
  //     o.l.timeText.text = 'Time: ' + o.l.time;
  //   }else{
  //     o.l.music.stop();
  //     game.state.start('menu');
  //   }
  // }
  return o;
})();
