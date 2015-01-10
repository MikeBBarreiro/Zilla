var win = (function(){
  var o = {
    preload: preload,
    create: create,
    update: update
  };

  function preload(){
    // game.load.image('restart', '/assets/img/restart.jpeg');
    game.load.image('backdrop', '/assets/img/night.png');
    game.load.audio('level1Music', '/assets/audio/Zilla.mp3');
    game.load.audio('awesomeness', '/assets/audio/Roar.mp3');
  }

  var button2,
      backdrop,
      winner;

  function create(){

    // backdrop = game.add.sprite(0, 0, 'backdrop');
    backdrop = game.add.tileSprite(0, 0, game.world.width +800, game.world.height +250, 'backdrop');

    backdrop.autoScroll(-20, 0);

    // button2 = game.add.button(game.world.centerX - 95, 400, 'restart', restartLevel, this);

    level1Music = game.add.audio('level1Music', 1, true);
    Roar = game.add.audio('awesomeness', 0.5, false);

    winner = game.add.text(275, 300, 'You Win! try again?', { fontSize: '32px', fill: '#4B6EEF' });
    winner = game.add.text(255, 400, 'restart the page to play', { fontSize: '32px', fill: '#4B6EEF' });

    Roar.play();
    // level1Music.play();

  }

  function update(){
    // game.add.button(game.world.centerX - 95, 400, 'button1', startGame, this, 2, 1, 0);

  }


  function restartLevel(){
    game.state.start('menu');
  }

  return o;
})();
