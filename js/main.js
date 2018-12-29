var Main = function(game) {

};

Main.prototype = {
  create: function(game) {
    this.game.stage.backgroundColor = '#DDDDDD';
    this.game.physics.startSystem(Phaser.Physics.P2JS); // eslint-disable-line
    this.game.physics.p2.gravity.y = 1000;
    this.game.physics.p2.setBoundsToWorld(true, false, false, true);
    this.createUI(game);
    this.createSprites(game);
  },
  update: function() {
    spriteLists[game.state.currentTheme].forEach( // eslint-disable-line
      (sprite) => {
        const bottomPosition = this[sprite].position.y + this[sprite].height;
        if (!this[sprite].physicsEnabled && bottomPosition > dropLineHeight) { // eslint-disable-line
          this[sprite].position.y = dropLineHeight - this[sprite].height; // eslint-disable-line
        }
      }
    );

    const clawComponents = ['claw-left', 'claw-right'];

    const leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT); // eslint-disable-line
    const rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT); // eslint-disable-line
    const upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP); // eslint-disable-line
    const downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN); // eslint-disable-line
    const spaceBarKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); // eslint-disable-line

    if (spaceBarKey.isDown && !(this['claw-left'].body.angle >= 46)) {
      this['claw-left'].body.angle += 2;
      this['claw-left'].angle += 2;
      this['claw-right'].body.angle += -2;
      this['claw-right'].angle += -2;
    } else if (this['claw-left'].body.angle <= 0) {
      this['claw-left'].body.angle = 0;
      this['claw-left'].angle = 0;
      this['claw-right'].body.angle = 0;
      this['claw-right'].angle = 0;
    } else {
      this['claw-left'].body.angle += -2;
      this['claw-left'].angle += -2;
      this['claw-right'].body.angle += 2;
      this['claw-right'].angle += 2;
    }

    if (leftKey.isDown) {
      clawComponents.forEach(c => this[c].body.velocity.x = -1000);
    } else if (rightKey.isDown) {
      clawComponents.forEach(c => this[c].body.velocity.x = 1000);
    } else if (rightKey.isDown) {
      clawComponents.forEach(c => this[c].body.velocity.y = 1000);
    } else if (rightKey.isDown) {
      clawComponents.forEach(c => this[c].body.velocity.y = 1000);
    }
    if (!leftKey.isDown && !rightKey.isDown && !upKey.isDown && !downKey.isDown) {
      clawComponents.forEach((c) => {
        this[c].body.velocity.x = 0;
        this[c].body.velocity.y = 0;
      });
    }
  },
  createUI: function() {
    const leftMenu = this.game.add.bitmapData(
      1000, this.game.world.height * 2 // Somehow needs to be double to work
    );
    leftMenu.ctx.rect(
      0, 0, 750, this.game.world.height - dropLineHeight); // eslint-disable-line
    leftMenu.ctx.fillStyle = '#BBBBBB';
    leftMenu.ctx.fill();
    this.leftMenu = this.game.add.sprite(0, dropLineHeight, leftMenu); // eslint-disable-line
    this.game.physics.p2.enable([this.leftMenu], false);
    this.leftMenu.body.static = true;
    this.leftMenu.anchor.setTo(0, 0);

    const dropLine = this.game.add.bitmapData(
      this.game.world.width, this.game.world.height
    );
    dropLine.ctx.rect(0, dropLineHeight, this.game.world.width, 10); // eslint-disable-line
    dropLine.ctx.fillStyle = '#777777';
    dropLine.ctx.fill();
    this.dropLine = this.game.add.sprite(0, 0, dropLine);

    ['claw-right', 'claw-left'].forEach((name) => {
      this[name] = this.game.add.sprite(2000, 150, name);
      this[name].anchor.x = 0.5;
      this[name].anchor.y = 0.5;

      this.game.physics.p2.enable(this[name], false);
      this[name].body.clearShapes();
      this[name].body.static = true;
      this[name].body.fixedRotation = true;
      this[name].body.loadPolygon('claw_physics', name);
    });
  },
  createSprites: function(game) {
    const initializeSprite = (name) => {
      this.update();
      this[name].input.enableDrag(true);
      this[name].physicsEnabled = false;

      !this[name].physicsEnabled && this.game.input.onUp.add(() => {
        this[name].inputEnabled = false;
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
