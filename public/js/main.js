var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'gameDiv');

game.state.add('menu', menu);
game.state.add('level', level);
game.state.add('win', win);
game.state.start('menu');
