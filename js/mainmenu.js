/* global colors typography game THEMES */
var MainMenu = function(game) {

};

MainMenu.prototype = {
  preload: function() {
    this.game.load.image('menu-image-aegean', 'assets/menu-graphics/1.png');
    this.game.load.image('menu-image-celestial', 'assets/menu-graphics/2.png');
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

    // Create the selection border
    drawBorder(
      this.game.world.width / 2 - 900,
      this.game.world.height / 2 - (250 + (600 * (3 - 2))),
      1800,
      500
    );

    function drawBorder(xPos, yPos, width, height, thickness = 25) {
      gameMenuUi.ctx.fillStyle='#FFFFFF';
      gameMenuUi.ctx.fillRect(
        xPos - (thickness),
        yPos - (thickness),
        width + (thickness * 2),
        height + (thickness * 2)
      );
    }

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

    this.gameMenuUi = this.game.add.sprite(0, 0, gameMenuUi);

    // Add the appropriate text of each theme
    const eachTheme = [];
    const menuItemImageSprites = [];
    THEMES.forEach((theme, i) => {
      const themeYPosition = this.game.world.height / 2 + ((i - 1) * 600);

      menuItemImageSprites.push(game.add.sprite(
        2250,
        themeYPosition,
        `menu-image-${theme.name}`
      ));
      menuItemImageSprites[i].anchor.setTo(0.5);
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

    // this.game.state.start('Main');
  }
};
