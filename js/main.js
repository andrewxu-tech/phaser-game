var Main = function(game) {

};

Main.prototype = {
  create: function(game) {
    this.game.stage.backgroundColor = '#DDDDDD';
    this.game.physics.startSystem(Phaser.Physics.P2JS); // eslint-disable-line
    this.game.physics.p2.gravity.y = 5000;
    this.game.physics.p2.setBoundsToWorld(true, false, false, true);
    this.createUI(game);
    this.createSprites(game);
  },
  update: function() {
    const clawComponents = ['claw-left', 'claw-right'];

    const leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT); // eslint-disable-line
    const rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT); // eslint-disable-line
    const spaceBarKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); // eslint-disable-line

    if (spaceBarKey.isDown && !(this['claw-left'].body.angle >= 25)) {
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
      this['claw-left'].body.angle += -1;
      this['claw-left'].angle += -1;
      this['claw-right'].body.angle += 1;
      this['claw-right'].angle += 1;
    }

    if (leftKey.isDown) {
      clawComponents.forEach(c => this[c].body.velocity.x = -1000);
    } else if (rightKey.isDown) {
      clawComponents.forEach(c => this[c].body.velocity.x = 1000);
    }

    if (!leftKey.isDown && !rightKey.isDown) {
      clawComponents.forEach((c) => {
        this[c].body.velocity.x = 0;
        this[c].body.velocity.y = 0;
      });
    }
  },
  createUI: function() {
    const worldUi = this.game.add.bitmapData(
      this.game.world.width, this.game.world.height
    );

    // Making the drop line
    worldUi.ctx.beginPath();
    worldUi.ctx.setLineDash([40, 30]);
    worldUi.ctx.moveTo(0, dropLineHeight); // eslint-disable-line
    worldUi.ctx.lineTo(this.game.world.width, dropLineHeight); // eslint-disable-line
    worldUi.ctx.lineWidth = 15;
    worldUi.ctx.strokeStyle = '#800000';
    worldUi.ctx.stroke();

    // Making the rope line
    worldUi.ctx.beginPath();
    worldUi.ctx.setLineDash([1, 0]);
    worldUi.ctx.moveTo(0, 130); // eslint-disable-line
    worldUi.ctx.lineTo(this.game.world.width, 130); // eslint-disable-line
    worldUi.ctx.lineWidth = 30;
    worldUi.ctx.strokeStyle = '#555555';
    worldUi.ctx.stroke();

    // Make the left menu rectangle
    worldUi.ctx.beginPath();
    worldUi.ctx.rect(
      0, 0, 735, this.game.world.height); // eslint-disable-line
    worldUi.ctx.fillStyle = '#BBBBBB';
    worldUi.ctx.fill();

    // Make the selection box rectangle
    worldUi.ctx.beginPath();
    worldUi.ctx.rect(
      0, 0, 735, 735);
    worldUi.ctx.fillStyle = '#555555';
    worldUi.ctx.fill();

    this.worldUi = this.game.add.sprite(0, 0, worldUi);

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
    game.state.currentSprite = spriteLists[game.state.currentTheme][0]; // eslint-disable-line

    const placeSpriteInClaw = (spriteName) => {
      this[spriteName] = this.game.add.sprite(
        this['claw-left'].position.x,
        this['claw-left'].position.y + 500,
        spriteName
      );
      this[spriteName].anchor.x = 0.5;
      this[spriteName].anchor.y = 0.5;

      this.game.physics.p2.enable([this[spriteName]], false);
      this[spriteName].body.clearShapes();
      this[spriteName].body.loadPolygon('building_physics', spriteName);
    };

    const placeSpriteInMenu = (spriteName, positionInMenu) => {
      this[`menu-${spriteName}`] = this.game.add.sprite(
        375, 375, spriteName
      );
      this[`menu-${spriteName}`].positionInMenu = positionInMenu;
      this[`menu-${spriteName}`].position.y = 375 + positionInMenu * 750;
      this[`menu-${spriteName}`].anchor.x = 0.5;
      this[`menu-${spriteName}`].anchor.y = 0.5;
    };

    const currentMenuState = [...spriteLists[game.state.currentTheme]]; // eslint-disable-line

    spriteLists[game.state.currentTheme].forEach( // eslint-disable-line
      (sprite, i) => {
        placeSpriteInMenu(sprite, i);

        if (game.state.currentSprite === sprite
          && !this[game.state.currentSprite]) {
          placeSpriteInClaw(sprite);
        }
      }
    );

    // Menu scrolling
    const upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP); // eslint-disable-line
    const downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN); // eslint-disable-line

    const updateMenu = () => {
      this[game.state.currentSprite].destroy();
      game.state.currentSprite = currentMenuState[0];

      currentMenuState.forEach(
        (sprite, i) => {
          this[`menu-${sprite}`].destroy();
          placeSpriteInMenu(sprite, i);

          if (game.state.currentSprite === sprite) {
            placeSpriteInClaw(sprite);
          }
        }
      );
    };

    upKey.onDown.add(() => {
      currentMenuState.push(currentMenuState[0]);
      currentMenuState.splice(0, 1);
      updateMenu();
    });

    downKey.onDown.add(() => {
      currentMenuState.push(currentMenuState[currentMenuState.length], 0);
      currentMenuState.splice(currentMenuState.length, 1);
      updateMenu();
    });
  }
};
