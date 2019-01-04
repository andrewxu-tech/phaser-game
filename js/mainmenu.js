/* global Phaser colors typography game */
var MainMenu = function(game) {

};

MainMenu.prototype = {
  preload: function() {
    console.log('inside the MainMenu');
  },
  create: function() {
    const gameMenuUi = this.game.add.bitmapData(
      this.game.world.width, this.game.world.height
    );

    // Create the background rectangle for the title
    gameMenuUi.ctx.beginPath();
    gameMenuUi.ctx.rect(
      this.game.world.width / 2 - 1000,
      this.game.world.height / 2 - 1000,
      2000,
      2000
    );
    gameMenuUi.ctx.fillStyle = colors.darkBackground;
    gameMenuUi.ctx.fill();

    // Create the background rectangle for the three menu options
    for (let i = 1; i <= 3; i++) {
      gameMenuUi.ctx.beginPath();
      gameMenuUi.ctx.rect(
        this.game.world.width / 2 - 900,
        this.game.world.height / 2 - (250 + (600 * (i - 2))),
        1800,
        500
      );
      gameMenuUi.ctx.fillStyle = colors.trueBlack;
      gameMenuUi.ctx.fill();
    }

    gameMenuUi.ctx.font = '30px Staatliches';
    gameMenuUi.ctx.fillStyle = "red";
    gameMenuUi.ctx.textAlign = "center";
    gameMenuUi.ctx.fillText('Hello World', this.game.world.width / 2, this.game.world.height / 2);

    this.gameMenuUi = this.game.add.sprite(0, 0, gameMenuUi);

    const topLevelText = game.add.text(
      this.game.world.width / 2,
      this.game.world.height / 2 - 600,
      '1. The Aegean\narchipelago'
    );
    topLevelText.anchor.setTo(0.5);
    topLevelText.textAlign = 'center';
    topLevelText.font = 'Staatliches';
    topLevelText.fontSize = typography.h3;
    topLevelText.fill = '#99ccff';

    const middleLevelText = game.add.text(
      this.game.world.width / 2,
      this.game.world.height / 2,
      '2. The Celestial\nEmpire'
    );
    middleLevelText.anchor.setTo(0.5);
    middleLevelText.textAlign = 'center';
    middleLevelText.font = 'Staatliches';
    middleLevelText.fontSize = typography.h3;
    middleLevelText.fill = '#ff9999';

    const bottomLevelText = game.add.text(
      this.game.world.width / 2,
      this.game.world.height / 2 + 600,
      '3. Cheese'
    );
    bottomLevelText.anchor.setTo(0.5);
    bottomLevelText.textAlign = 'center';
    bottomLevelText.font = 'Staatliches';
    bottomLevelText.fontSize = typography.h3;
    bottomLevelText.fill = '#ffcc99';

    // this.game.state.start('Main');
  }
};
