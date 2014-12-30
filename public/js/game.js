var level = (function(){
  var o = {

    preload: preload,
    create: create,
    update: update,
    render: render
  };

  // var platforms, music;
  var map,
      Roar,
      boss1,
      boss3,
      layer,
      player,
      health0,
      health1,
      health2,
      GidDead,
      cursors,
      blueray,
      bluerays,
      emitter1,
      emitter2,
      fireball,
      playerHP,
      spaceKey,
      fireball1,
      fireball2,
      healthText,
      boundsKill,
      facingGiant,
      level1Music,
      Zillablueray,
      fireBallSound;

  function preload(){
    game.load.tilemap('Zilla',          '/assets/tilemaps/maps/ninja-tilemap.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.image('kenney',           '/assets/tilemaps/tiles/kenney.png');
    game.load.spritesheet('Godzilla',   '/assets/img/slice01_01_7x29.png', 141, 81);
    game.load.spritesheet('Boss1',      '/assets/img/slice01_01_8x10.png', 124, 135);
    game.load.spritesheet('Boss2',      '/assets/img/slice01_01_8x10.png', 124, 135);
    game.load.spritesheet('Boss3',      '/assets/img/slice01_01_8x10.png', 124, 135);
    game.load.spritesheet('Boss3left',  '/assets/img/slice01_01_8x10left.png', 124, 135);
    game.load.spritesheet('Shooter',    '/assets/img/other.png', 141, 81);
    game.load.image('backdrop',         '/assets/img/night.png');
    game.load.image('fireball',         '/assets/img/blueflame.png');
    game.load.image('blueRay',          '/assets/img/blueray.png');
    game.load.image('bossExp',          '/assets/particles/fire1.png');
    game.load.image('FireCollide',      '/assets/img/jets.png');
    game.load.image('health0',          '/assets/img/brick0.png');
    game.load.image('health1',          '/assets/img/brick0.png');
    game.load.image('health2',          '/assets/img/brick0.png');
    game.load.image('health3',          '/assets/img/brick0.png');
    game.load.image('health4',          '/assets/img/brick0.png');
    game.load.image('health5',          '/assets/img/brick0.png');

    //Audio

    game.load.audio('fireball', '/assets/audio/fireball.wav');
    game.load.audio('ZillaRay', '/assets/audio/theshooting2.mp3');
    game.load.audio('GidDead',  '/assets/audio/Explosion.wav');

  }

  function create(){

    game.physics.startSystem(Phaser.Physics.ARCADE);

    var backgroundGame = game.add.tileSprite(0, 0, game.world.width +4950, game.world.height +250, 'backdrop');
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
    GidDead       = game.add.audio('GidDead', 0.5);

    //Map Collision is activated here
    map.setCollisionBetween(37, 61);
    map.setCollisionBetween(98, 121);
    map.setCollision(142);


    emitter1 = game.add.emitter(0, 0, 100);
    emitter1.makeParticles('bossExp');
    emitter2 = game.add.emitter(0, 0, 100);
    emitter2.makeParticles('FireCollide');



    player  = game.add.sprite(230, 455, 'Godzilla');
    boss1   = game.add.sprite(1000, 100, 'Boss1');
    boss2   = game.add.sprite(3600, 100, 'Boss2');
    boss3   = game.add.sprite(5400, 100, 'Boss3');
    health0 = game.add.sprite(10, 40, 'health0');
    health1 = game.add.sprite(40, 40, 'health1');
    health2 = game.add.sprite(70, 40, 'health2');
    health3 = game.add.sprite(100, 40, 'health3');
    health4 = game.add.sprite(130, 40, 'health4');
    health5 = game.add.sprite(160, 40, 'health5');

    boss1.scale.x = -1;
    boss2.scale.x = -1;

    game.physics.arcade.enable(player);
    game.physics.arcade.enable(boss1);
    game.physics.arcade.enable(boss2);
    game.physics.arcade.enable(boss3);

    player.anchor.setTo(0.5, 0.5);
    player.body.bounce.y  = 0.2;
    player.body.setSize(40,80);
    player.body.gravity.y = 300;

    boss1.body.bounce.y  = 0.7;
    boss1.body.gravity.y = 30;
    boss1.body.setSize(40,80);
    boss1.anchor.setTo(0.8, 0.9);

    boss2.body.bounce.y  = 0.7;
    boss2.body.gravity.y = 30;
    boss2.body.setSize(40,80);
    boss2.anchor.setTo(0.8, 0.9);
    boss2.outOfBoundsKill = true;

    boss3.body.bounce.y  = 0.1;
    boss3.body.gravity.y = 30;
    boss3.body.setSize(40,80);
    boss3.anchor.setTo(0.8, 0.9);
    boss3.scale.setTo(3,2);


    healthText = game.add.text(10, 5, 'Health: 150', { fontSize: '22px', fill: '#4B6EEF' });
    healthText.fixedToCamera = true  ;

    health0.fixedToCamera = true ;
    health1.fixedToCamera = true ;
    health2.fixedToCamera = true ;
    health3.fixedToCamera = true ;
    health4.fixedToCamera = true ;
    health5.fixedToCamera = true ;

    player.checkWorldBounds = true;
    boundsKill = player.body.collideWorldBounds;
    player.body.collideWorldBounds = true;
    game.camera.follow(player);



    boss1.animations.add('shoot', [14, 15, 00], 5, false);
    boss2.animations.add('shoot1', [14, 15, 00], 5, false);
    boss3.animations.add('shoot2', [14, 15, 00], 5, false);
    boss3.animations.add('Boss3right', [0, 1, 2, 3, 4, 5, 6], 5, false);
    boss3.animations.add('Boss3left', [0, 1, 2, 3, 4, 5, 6], 5, false);
    player.animations.add('right', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 10, false);
    player.animations.add('left', [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], 10, false);
    // player.animations.add('stop', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], 10, false);
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
    game.physics.arcade.collide(boss3, layer);
    game.physics.arcade.collide(player, layer);
    game.physics.arcade.collide(bluerays, layer);
    game.physics.arcade.collide(fireballs, layer);
    game.physics.arcade.collide(fireballs, player, killPlayer, null, this);
    game.physics.arcade.collide(boss1, player, killPlayer, null, this);
    game.physics.arcade.collide(boss2, player, killPlayer, null, this);
    game.physics.arcade.overlap(bluerays, boss1, deadBoss1, null, this);
    game.physics.arcade.collide(bluerays, boss2, deadBoss2, null, this);
    game.physics.arcade.overlap(bluerays, boss3, deadBoss3, null, this);
    game.physics.arcade.collide(bluerays, emitter1, deadBoss1, null, this);
    game.physics.arcade.collide(bluerays, fireballs, fireCollide, null, this);

    movePlayer();

    //boss path
    pathCounter +=1;
    if (pathCounter >= 140){
      pathCounter = 0;
    }

    bossPath();

    if(player.body.y > 600){
      killPlayer();
    }

    if (boss1.alive == true){
      bossShoots();
    }

    if (boss2.alive == true){
      bossShoots1();
    }

    if (boss3.alive == true){
      bossShoots2();
    }

    if(spaceKey.isDown){
      zillaShoots();
      // player.animations.play('Shooter');
    }

    HealthBar();

    if(boss3HP <= 0){
      game.state.start('menu');
    }
    console.log('BOSS HEALTH 2', boss2HP);
    console.log('BOSS HEALTH 3', boss3HP);

    // if (boss1HP,boss2HP <= 0 ) {
    //   boss1.kill();
    //   setTimeout(function() {
    //     game.state.start('menu');
    //   }, 3000);
    // }
  }

  function movePlayer(){
    //Reset the players velocity (movement)
    player.body.velocity.x  = 0;


    if(cursors.left.isDown){
      player.body.velocity.x     = -150;
      player.animations.play('left');
      player.facing = 'left';

      // player.anchor.setTo(.5, 1); //flips around players middle
      // player.scale.x = 1; //facing default direction
      player.scale.x = -1;
    }else if(cursors.right.isDown){
      player.body.velocity.x     = 150;
      player.animations.play('right');
      player.facing = 'right';
      player.scale.x = 1;
    }else{
      //  Stand still
      player.animations.stop();
      player.frame = 4;
    }

    //  Allow the player to jump if they are touching the ground.
    if (cursors.up.isDown && player.body.onFloor()){
      player.body.velocity.y = -250;
    }
  }

  var boss1HP  = 200;
  var boss2HP  = 210;
  var boss3HP  = 600;
  playerHP = 150;

  var shotTimerGiant = 0;
  function bossShoots(){

    if (shotTimerGiant < game.time.now) {
      shotTimerGiant = game.time.now + 1000;
      fireball = fireballs.create(boss1.body.x + boss1.body.width / 2 + 45, boss1.body.y + boss1.body.height / 2 + 5, 'fireball');
      fireBallSound.play();
      game.physics.enable(fireball, Phaser.Physics.ARCADE);

      fireball.body.gravity.y = 100;
      fireball.body.bounce.y = 1;
      fireball.body.bounce.x = 1;
      fireball.outOfBoundsKill = true;
      fireball.anchor.setTo(0.5, 0.5);
      fireball.scale.setTo(0.2,0.1);
      fireball.body.setSize(300,450);
      fireball.body.velocity.x = -400;
    }
  };

  function bossShoots1(){

    if (shotTimerGiant < game.time.now) {
      shotTimerGiant = game.time.now + 3000;
      fireball1 = fireballs.create(boss2.body.x + boss2.body.width / 2 + 45, boss2.body.y + boss2.body.height / 2 + 5, 'fireball');
      fireBallSound.play();
      boss2.animations.play('shoot1');

      game.physics.enable(fireball1, Phaser.Physics.ARCADE);

      fireball1.body.gravity.y = 90;
      fireball1.body.bounce.y = 1.3;
      fireball1.body.bounce.x = 1.3;
      fireball1.outOfBoundsKill = true;
      fireball1.anchor.setTo(0.5, 0.5);
      fireball1.scale.setTo(0.2,0.1);
      fireball1.body.setSize(300,450);
      fireball1.body.velocity.x = -400;
    }
  };

  var pathCounter = 0;
  function bossPath(){
    if (pathCounter < 70) {
      boss3.animations.play('Boss3left')
      boss3.body.velocity.x = - 100;
      boss3.scale.x = -1;
      facingGiant = 'Boss3left';
    } else {
      boss3.animations.play('Boss3right');
      boss3.body.velocity.x = 100;
      boss3.scale.x = 1;
      facingGiant = 'Boss3right';
    }
  }
  var shotTimerGiant = 0;
  function bossShoots2(){

    if (shotTimerGiant < game.time.now) {
      shotTimerGiant = game.time.now + 2000;
      if (facingGiant === 'Boss3right') {
        fireBallSound.play();
        fireball2 = fireballs.create(boss3.body.x + boss3.body.width / 2 + 45, boss3.body.y + boss3.body.height / 2 + 5, 'fireball');
      } else {
        fireBallSound.play();
        fireball2 = fireballs.create(boss3.body.x + boss3.body.width / 2 - 40, boss3.body.y + boss3.body.height / 2 + 5, 'fireball');
      }
      game.physics.enable(fireball2, Phaser.Physics.ARCADE);

      boss3.animations.play('shoot2');
      fireball2.body.gravity.y = 90;
      fireball2.body.bounce.y = 1.3;
      fireball2.body.bounce.x = 1.3;
      fireball2.outOfBoundsKill = true;
      fireball2.anchor.setTo(0.5, 0.5);
      fireball2.scale.setTo(0.2,0.1);
      fireball2.body.setSize(300,450);
      fireball2.body.velocity.x = -400;

      if (facingGiant === 'Boss3right'){
        fireBallSound.play();
        fireball2.body.velocity.x = 200;
      } else {
        fireBallSound.play();
        fireball2.body.velocity.x = -200;
      }
    }
  }

  function zillaShoots(){
      if (player.facing == 'right') {
        Zillablueray.play();
        blueray = bluerays.create(player.body.x + player.body.width / 2 + 45, player.body.y + 10, 'blueRay');
      } else {
        Zillablueray.play();
        blueray = bluerays.create(player.body.x + player.body.width / 2 - 40, player.body.y + 10, 'blueRay');
      }
      game.physics.enable(blueray, Phaser.Physics.ARCADE);
      blueray.body.setSize(130, 135);
      blueray.scale.setTo(0.1,0.05);
      blueray.outOfBoundsKill = true;
      blueray.anchor.setTo(0.5, 0.5);



      if (player.facing == 'right'){
        Zillablueray.play();
        blueray.body.velocity.x = 400;
      } else {
        Zillablueray.play();
        blueray.body.velocity.x = -400;
      }
  }

  function killPlayer(){
    playerHP -= 25;
    healthText.text = 'Health: ' + playerHP;
    fireball.kill();
    if(playerHP <= 0){
      playerHP = 150;
      boss1HP = 200;
      game.state.start('level');
    };
  }

  function HealthBar(){
    if(playerHP == 125){
      health5.kill();
    }
    if(playerHP == 100){
      health4.kill();
    }
    if(playerHP == 75){
      health3.kill();
    }
    if(playerHP == 50){
      health2.kill();
    }
    if(playerHP == 25){
      health1.kill();
    }
    if(playerHP == 0){
      health0.kill();
    }
  }

  function deadBoss1(){
    boss1HP -= 1;
    boss1.body.velocity.x = -20;
    boss1.body.velocity.y = 90;
    if(boss1HP === 0){
      boss1.kill();
      emitter1.x = boss1.body.x;
      emitter1.y = boss1.body.y;
      emitter1.start(true, 2000, null, 10);
      GidDead.play();
    }
  }

  function deadBoss2(){
    boss2HP -= 1;
    boss2.body.velocity.x = -20;
    boss2.body.velocity.y = 90;
    if(boss2HP === 0){
      boss2.kill();
      emitter1.x = boss2.body.x;
      emitter1.y = boss2.body.y;
      emitter1.start(true, 2000, null, 10);
      GidDead.play();
    }
  }

  function deadBoss3(){
    boss3HP -= 1;
    boss3.body.velocity.x = -20;
    boss3.body.velocity.y = 90;
    if(boss3HP === 0){
      boss3.kill();
      emitter1.x = boss3.body.x;
      emitter1.y = boss3.body.y;
      emitter1.start(true, 2000, null, 10);
      GidDead.play();
    }
  }


  function fireCollide(){
    emitter2.x = fireball.body.x;
    emitter2.y = fireball.body.y;
    emitter2.start(true, 2000, null, 10);
    fireball.kill();
  }

  //Debugging function
  function render(){
  //   player.debug = true;
  //   game.debug.body(player);
    // game.debug.body(boss3);
    // game.debug.body(boss2);
  //
  //   game.debug.spriteBounds(player);
  //   game.debug.spriteCorners(player, true, true);
  //   for (var i = 0; i < fireballs.length; i++){
  //     game.debug.body(fireballs.children[i]);
  //   }
  //
  // for (var i = 0; i < bluerays.length; i++){
  //   game.debug.body(bluerays.children[i]);
  // }
}

  return o;
})();
