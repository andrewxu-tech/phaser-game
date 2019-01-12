/* global Phaser colors typography game THEMES */
var MainMenu = function(game) {

};

MainMenu.prototype = {
  preload: function() {
    this.game.load.image('menu-image-aegean', 'assets/menu-graphics/1.png');
    this.game.load.image('menu-image-celestial', 'assets/menu-graphics/2.png');
    this.game.load.audio('music', 'assets/music/menu.mp3');
  },
  create: function() {
    const fx = game.add.audio('music');
    fx.allowMultiple = true;

    fx.addMarker('menu', 1, 60);
    fx.play('menu');

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
    for (let i = THEMES.length; i <= 3; i++) {
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

    this.gameMenuUi = this.game.add.sprite(0, 0, gameMenuUi);

    // Add the appropriate text of each theme
    const eachTheme = [];
    const menuItemImageSprites = [];
    THEMES.forEach((theme, i) => {
      const themeYPosition = this.game.world.height / 2 + ((i - 1) * 600);

      menuItemImageSprites.push(game.add.sprite(
        1900,
        themeYPosition,
        `menu-image-${theme.name}`
      ));
      menuItemImageSprites[i].anchor.setTo(0, 0.5);
      menuItemImageSprites[i].height = 400;
      menuItemImageSprites[i].width = 600;

      eachTheme.push(game.add.text(
        this.game.world.width / 2 - 800,
        themeYPosition,
        THEMES[i].displayName
      ));
      eachTheme[i].anchor.setTo(0, 0.5);
      eachTheme[i].textAlign = 'left';
      eachTheme[i].font = 'Staatliches';
      eachTheme[i].fontSize = typography.h3;
      eachTheme[i].fill = THEMES[i].colors.menuText;
    });

    // Which of the current themes is selected
    let currentThemeNumber = 1;

    // Draw in the white rectangle that indicates selection
    const createSelectionRectangle = () => {
      const selectionRectangle = this.game.add.bitmapData(
        this.game.world.width, this.game.world.height
      );

      selectionRectangle.ctx.strokeStyle = '#FFFFFF';
      selectionRectangle.ctx.lineWidth = 25;
      selectionRectangle.ctx.strokeRect(
        this.game.world.width / 2 - 900,
        this.game.world.height / 2 - 250 - (600 * ((3 - currentThemeNumber) - 1)),
        1800,
        500
      );

      this.selectionRectangle = this.game.add.sprite(0, 0, selectionRectangle);
    };
    createSelectionRectangle();

    // Adding the up and down controls for menu selection
    const upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
    const downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);

    upKey.onDown.add(() => {
      if (currentThemeNumber === 1) {
        return;
      }
      currentThemeNumber--;
      this.selectionRectangle.destroy();
      createSelectionRectangle();
    });

    downKey.onDown.add(() => {
      if (currentThemeNumber === 3) {
        return;
      }
      currentThemeNumber++;
      this.selectionRectangle.destroy();
      createSelectionRectangle();
    });

    const enterKey = this.input.keyboard.addKey(Phaser.Keyboard.ENTER);

    enterKey.onDown.add(() => {
      this.game.state.start('Main');
    });
  }
};
