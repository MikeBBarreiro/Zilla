var menu = (function(){
  var o = {
    preload: preload,
    create: create,
    update: update
  };

  function preload(){
    game.load.spritesheet('button', '/assets/img/button_sprite_sheet.png', 193, 71);
    game.load.image('backdrop', '/assets/img/godzillaBackgroundMenu.jpg');
    game.load.audio('level1Music', '/assets/audio/Zilla.mp3');
    game.load.audio('awesomeness', '/assets/audio/Roar.mp3');
  }

  var button,
      MenuBackground,
      firstMenu = true;

  function create(){

    MenuBackground = game.add.sprite(0, 0, 'backdrop');
    MenuBackground.scale.setTo(0.42 , 0.5);
    // MenuBackground.anchor.setTo(0.5, 0.5);
    // MenuBackground.body.setSize(40,80);

    button = game.add.button(game.world.centerX - 95, 400, 'button', startClick, this, 2, 1, 0);

    level1Music = game.add.audio('level1Music', 1, true);
    Roar = game.add.audio('awesomeness', 0.5, false);

    Roar.play();
    level1Music.play();

  }

  function update(){
    if(firstMenu == false){
      button = game.add.button(game.world.centerX - 95, 400, 'button', startClick, this, 2, 1, 0);
      firstMenu = true;
    }
  }


  function startClick() {
    firstMenu = false;
    button.destroy();
    game.state.start('level');
  }

  return o;
})();
