var menu = (function(){
  var o = {
    preload: preload,
    create: create,
    update: update
  };

  function preload(){
    game.load.spritesheet('button', '/assets/img/button_sprite_sheet.png', 193, 71);
    game.load.image('backdrop', '/assets/img/menu.jpg');
  }

  var button;

  function create(){
    game.add.sprite(0, 0, 'backdrop');
    button = game.add.button(game.world.centerX - 95, 400, 'button', startClick, this, 2, 1, 0);

  }

  function update(){

  }


  function startClick() {
    this.game.state.start('level');
  }

  return o;
})();
