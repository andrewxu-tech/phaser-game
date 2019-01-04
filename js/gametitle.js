/* global Phaser game colors typography */
var GameTitle = function(game){};

GameTitle.prototype = {
  preload: function() {
  },
  create: function() {
    const gameTitleUi = this.game.add.bitmapData(
      this.game.world.width, this.game.world.height
    );

    // Create the background rectangle for the title
    gameTitleUi.ctx.beginPath();
    gameTitleUi.ctx.rect(
      this.game.world.width / 2 - 1000,
      this.game.world.height / 2 - 1000,
      2000,
      2000
    );
    gameTitleUi.ctx.fillStyle = colors.darkBackground;
    gameTitleUi.ctx.fill();

    this.gameTitleUi = this.game.add.sprite(0, 0, gameTitleUi);

    for (let i = 0; i < 4; i++) {
      this[`screw-${i}`] = this.game.add.sprite(
        this.game.world.width / 2,
        this.game.world.height / 2,
        'claw-screw'
      );
      this[`screw-${i}`].anchor.x = 0.5;
      this[`screw-${i}`].anchor.y = 0.5;
    }

    this['screw-0'].position.x = this.game.world.width / 2 + 800;
    this['screw-0'].position.y = this.game.world.height / 2 + 800;
    this['screw-1'].position.x = this.game.world.width / 2 + 800;
    this['screw-1'].position.y = this.game.world.height / 2 - 800;
    this['screw-2'].position.x = this.game.world.width / 2 - 800;
    this['screw-2'].position.y = this.game.world.height / 2 + 800;
    this['screw-3'].position.x = this.game.world.width / 2 - 800;
    this['screw-3'].position.y = this.game.world.height / 2 - 800;

    game.stage.backgroundColor = colors.lightBackground;
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
      'Press space to start'
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
    this.game.state.start('MainMenu');
  }
};
