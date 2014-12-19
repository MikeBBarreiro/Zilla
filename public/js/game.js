var level = (function(){
  var o = {

    preload: preload,
    create: create,
    update: update,
    render: render
  };

  // var platforms, music;
  var player, layer, map, cursors, level1Music, boundsKill, boss1, fireBallSound, Roar, spaceKey, Zillablueray, emitter1;

  function preload(){
    game.load.tilemap('Zilla', '/assets/tilemaps/maps/ninja-tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('kenney', '/assets/tilemaps/tiles/kenney.png');
    game.load.spritesheet('Godzilla', '/assets/img/slice01_01_7x29.png', 141, 81);
    game.load.spritesheet('Boss1','/assets/img/slice01_01_8x10.png', 124, 135);
    game.load.spritesheet('Boss2','/assets/img/slice01_01_8x10.png', 124, 135);
    game.load.spritesheet('Shooter','/assets/img/other.png', 141, 81);
    game.load.image('backdrop', '/assets/img/night.png');
    game.load.image('fireball', '/assets/img/blueflame.png');
    game.load.image('blueRay', '/assets/img/blueray.png');
    game.load.image('bossExp', '/assets/particles/fire1.png');
    //Audio

    game.load.audio('fireball', '/assets/audio/fireball.wav');
    game.load.audio('ZillaRay', '/assets/audio/theshooting2.mp3');
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

    // game.add.sprite(0, 0, 'backdrop');
    var backgroundGame = game.add.tileSprite(0, 0, game.world.width +3050, game.world.height +250, 'backdrop');
    //give backgound speed in x
    backgroundGame.autoScroll(-20, 0);

    map = game.add.tilemap('Zilla');
    map.addTilesetImage('kenney');
    layer = map.createLayer('background01');
    layer.resizeWorld();

    spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    cursors  = game.input.keyboard.createCursorKeys();

    fireBallSound = game.add.audio('fireball', 0.5);
    Zillablueray  = game.add.audio('ZillaRay', 0.9);

    //Map Collision is activated here
    map.setCollisionBetween(37, 61);
    map.setCollisionBetween(98, 121);
    // map.setCollisionBetween(27, 28);
    map.setCollision(142);

    // layer.debug = true

    emitter1 = game.add.emitter(0, 0, 100);
    emitter1.makeParticles('bossExp');


    player = game.add.sprite(230, 455, 'Godzilla');
    boss1  = game.add.sprite(1000, 100, 'Boss1');
    boss2  = game.add.sprite(3600, 100, 'Boss2');

    boss1.scale.x = -1;
    boss2.scale.x = -1;

    game.physics.arcade.enable(player);
    game.physics.arcade.enable(boss1);
    game.physics.arcade.enable(boss2);

    // player.anchor.setTo(0.8, 0.9);
    // player.anchor.setTo(.5, 1);
    player.anchor.setTo(0.5, 0.5);

    player.body.bounce.y = 0.2;
    player.body.setSize(40,80);
    player.body.gravity.y = 300;

    boss1.body.bounce.y = 0.7;
    boss1.body.gravity.y = 30;
    boss1.body.setSize(40,80);
    boss1.anchor.setTo(0.8, 0.9);

    boss2.body.bounce.y = 0.5;
    boss2.body.gravity.y = 30;



    // player.body.x
    // player.body.y
    player.checkWorldBounds = true;
    boundsKill = player.body.collideWorldBounds;
    player.body.collideWorldBounds = true;
    game.camera.follow(player);

    player.animations.add('right', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 10, false);
    player.animations.add('left', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 10, false);
    boss1.animations.add('shoot', [14, 15, 00], 5, false);
    boss1.animations.add('hangHead', [79, 80], 2, false);
    // player.animations.add('zillaShoot', [157, 158], 5, false);
    // player.animations.add('Shooter', [3, 4], 5, false);
    // player.animations.add('stop', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);

    // spawnGiant();

    fireballs = game.add.group();
    game.physics.enable(fireballs, Phaser.Physics.ARCADE);

    bluerays = game.add.group();
    game.physics.enable(bluerays, Phaser.Physics.ARCADE);

  }


  function update(){
    //physics collisions declared here
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(boss1, layer);
    game.physics.arcade.collide(boss2, layer);
    game.physics.arcade.collide(fireballs, layer);
    game.physics.arcade.collide(fireballs, player, killPlayer, null, this);
    game.physics.arcade.collide(boss1, player, killPlayer, null, this);
    game.physics.arcade.collide(bluerays, boss1, deadBoss1, null, this);
    game.physics.arcade.collide(bluerays, emitter1, deadBoss1,null, this);
    // game.physics.arcade.overlap(player, layer, killPlayer, null, this);
    // game.physics.arcade.collide(lava, player, killPlayer, null, this);

    movePlayer();

    if(player.body.y > 600){
      killPlayer();
    }

    if (boss1.alive == true){
      bossShoots();
    }

    if(spaceKey.isDown){
      zillaShoots();
      // player.animations.play('Shooter');
    }


    // if (boss1HP,boss2HP <= 0 ) {
    //   boss1.kill();
    //   setTimeout(function() {
    //     game.state.start('menu');
    //   }, 3000);
    // }
  }

  function movePlayer(){
    //Reset the players velocity (movement)
    player.body.velocity.x = 0;

    if(cursors.left.isDown){
      player.body.velocity.x = -150;
      player.animations.play('left');
      player.facing = 'left';

      // player.anchor.setTo(.5, 1); //flips around players middle

      // player.scale.x = 1; //facing default direction
      player.scale.x = -1;
    }else if(cursors.right.isDown){
      player.body.velocity.x = 150;
      player.animations.play('right');
      player.facing = 'right';

      // player.anchor.setTo(.5, 1); //flips around players middle
      // player.scale.x = -1; //facing default direction
      player.scale.x = 1;
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

  var boss1HP = 200;
  var boss2HP = 300;

  var shotTimerGiant = 0;
  function bossShoots(){

    if (shotTimerGiant < game.time.now) {
      shotTimerGiant = game.time.now + 1000;
      var fireball;

      fireball = fireballs.create(boss1.body.x + boss1.body.width / 2 + 45, boss1.body.y + boss1.body.height / 2 + 5, 'fireball');

      fireBallSound.play();
      boss1.animations.play('shoot');
        // fireball = fireballs.create(giant.body.x + giant.body.width / 2 - 40, giant.body.y + giant.body.height / 2 + 5, 'fireball');

      game.physics.enable(fireball, Phaser.Physics.ARCADE);

      fireball.body.gravity.y = 100;
      fireball.body.bounce.y = 1;
      fireball.body.bounce.x = 1;
      fireball.outOfBoundsKill = true;
      // fireball.anchor.setTo(0.8, 0.9);
      fireball.anchor.setTo(0.5, 0.5);
      fireball.scale.setTo(0.2,0.1);
      fireball.body.setSize(300,450);
      // fireball.body.setSize(3,2);

      fireball.body.velocity.x = -400;

    }
  };

  function zillaShoots(){
    // spaceKey.onDown.add(start);
      // shotTimerGiant = game.time.now + 3000;
      var blueray;
      if (player.facing == 'right') {
        Zillablueray.play();
        blueray = bluerays.create(player.body.x + player.body.width / 2 + 45, player.body.y + 10, 'blueRay');
      } else {
        Zillablueray.play();
        // fireBallSound.play();
        blueray = bluerays.create(player.body.x + player.body.width / 2 - 40, player.body.y + 10, 'blueRay');
      }
      game.physics.enable(blueray, Phaser.Physics.ARCADE);
      blueray.body.setSize(130, 135);
      blueray.scale.setTo(0.1,0.05);
      // blueray.body.gravity.y = 40;
      // blueray.body.bounce.y = 1;
      blueray.outOfBoundsKill = true;
      blueray.anchor.setTo(0.5, 0.5);
      blueray.body.velocity.x = 0;

      blueray.outOfBoundsKill = true;

      if (player.facing == 'right'){
        Zillablueray.play();
        // fireBallSound.play();
        blueray.body.velocity.x = 400;
      } else {
        Zillablueray.play();
        // fireBallSound.play();
        blueray.body.velocity.x = -400;
      }
  }

  function killPlayer(){
    game.state.start('level');
    boss1HP = 200;
  }
  // function killBoss1(){
  //   boss1HP -= 210;
  //   boss1.kill();
  // }

  function deadBoss1(){
    boss1HP -= 1;
    boss1.body.velocity.x = -20;
    boss1.body.velocity.y = 90;
    if(boss1HP <= 0){
      boss1.kill();
      emitter1.x = boss1.body.x;
      emitter1.y = boss1.body.y;
      emitter1.start(true, 1000, null, 1);
      // boss1.animations.play('hangHead');
    }
    console.log('BOSS HEALTH====', boss1HP);
  }


  // function killBoss2(){
  //   boss1HP -= 25;
  //   boss2.kill();
  // }


  function render(){
    // player.debug = true;
    game.debug.body(player);
    //game.debug.body(boss1);

    // game.debug.spriteBounds(player);
    // game.debug.spriteCorners(player, true, true);
    for (var i = 0; i < fireballs.length; i++){
      game.debug.body(fireballs.children[i]);
    }

  for (var i = 0; i < bluerays.length; i++){
    game.debug.body(bluerays.children[i]);
  }
}

  return o;
})();
