/* global Phaser game colors typography */
var GameTitle = function(game){};

GameTitle.prototype = {
  preload: function() {
  },
  create: function() {
    game.stage.backgroundColor = colors.darkBackground;
    const titleText = game.add.text(
      game.world.centerX,
      game.world.centerY - 250,
      'STACK.'
    );
    titleText.anchor.setTo(0.5);
    titleText.font = 'Staatliches';
    titleText.fontSize = typography.h1;
    titleText.fill = '#FFFFFF';

    const ctaText = game.add.text(
      game.world.centerX,
      game.world.centerY + 250,
      'Press space to start.'
    );
    ctaText.anchor.setTo(0.5);
    ctaText.font = 'Staatliches';
    ctaText.fontSize = typography.h3;
    ctaText.fill = '#FFFFFF';

    const spaceBarKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    spaceBarKey.onDown.add(() => {
      this.startGame();
    });
  },
  update: function() {
  },
  startGame: function() {
    this.game.state.start('Main');
  }
};
