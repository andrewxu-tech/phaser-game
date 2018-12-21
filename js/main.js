var Main = function(game) {

};

Main.prototype = {
  create: function(game) {
    this.game.stage.backgroundColor = '#DDDDDD';
    this.game.physics.startSystem(Phaser.Physics.P2JS); // eslint-disable-line
    this.game.physics.p2.gravity.y = 1000;
    this.game.physics.p2.setBoundsToWorld(true, false, false, true);
    console.log(this.game.physics.p2);
    this.createUI(game);
    this.createSprites(game);
  },
  // update: function() {
  // },
  createUI: function() {
    const leftMenu = this.game.add.bitmapData(
      1000, this.game.world.height * 2 // Somehow needs to be double to work
    );
    leftMenu.ctx.rect(0, 0, 500, this.game.world.height);
    leftMenu.ctx.fillStyle = '#BBBBBB';
    leftMenu.ctx.fill();
    this.leftMenu = this.game.add.sprite(0, 0, leftMenu);
    this.game.physics.p2.enable([this.leftMenu], false);
    this.leftMenu.body.static = true;
    this.leftMenu.anchor.setTo(0, 0);

    const dropLine = this.game.add.bitmapData(
      this.game.world.width, this.game.world.height
    );
    dropLine.ctx.rect(0, 500, this.game.world.width, 10);
    dropLine.ctx.fillStyle = '#777777';
    dropLine.ctx.fill();
    this.dropLine = this.game.add.sprite(0, 0, dropLine);
    this.dropLine.anchor.setTo(0, 0);
  },
  createSprites: function(game) {
    const initializeSprite = (name) => {
      this[name].input.enableDrag(true);
      this[name].physicsEnabled = false;

      !this[name].physicsEnabled && this.game.input.onUp.add(() => {
        this[name].physicsEnabled = true;
        this[name].position = {
          x: this[name].position.x + ( this[name].width / 2 ),
          y: this[name].position.y + ( this[name].height / 2 )
        };
        this.game.physics.p2.enable([this[name]], false);
        this[name].body.clearShapes();
        this[name].body.loadPolygon('sprite_physics2', name);
      });
    };

    spriteLists[game.state.currentTheme].forEach( // eslint-disable-line
      (sprite) => {
        this[sprite] = this.game.add.sprite(0, 0, sprite);
        this[sprite].inputEnabled = true;
        this[sprite].events.onInputDown.add(() => {
          initializeSprite(sprite, this);
        });
      }
    );
  }
};
