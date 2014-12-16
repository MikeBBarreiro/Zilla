var level = (function(){
  var o = {

    preload: preload,
    create: create,
    update: update
  };

  // var platforms, music;
  var player, layer, map, cursors;

  function preload(){
    game.load.tilemap('Zilla', '/assets/tilemaps/maps/ninja-tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('kenney', '/assets/tilemaps/tiles/kenney.png');
    game.load.spritesheet('Godzilla', '/assets/img/slice01_01_5x40.png', 197, 82);
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
    map.setCollisionBetween(38, 60);
    map.setCollisionBetween(99, 120);
    // map.setCollisionBetween(27, 28);
    // map.setCollision(19);



    player = game.add.sprite(32, 232, 'Godzilla');
    // game.world.height - 150
    game.physics.arcade.enable(player);
    player.anchor.setTo(0.10, 0.10);
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;

    player.animations.add('right', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 10, false);
    player.animations.add('left', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 10, false);
    player.animations.add('stop', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);


  }


  function render(){
    player.debug = true;
    game.debug.spriteBounds(player);
    game.debug.spriteCorners(player, true, true);
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
      // player.animations.stop();
      player.animations.play('stop');
      // player.frame = 4;
      // player.animations.add('stop', [00, 01, 02, 03, 04, 05, 06, 07, 08, 09], false);
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
