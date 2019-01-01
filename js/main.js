/* global game spriteLists Phaser dropLineHeight */
var Main = function(game) {

};

Main.prototype = {
  create: function(game) {
    game.stage.backgroundColor = '#DDDDDD';
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 2500;
    game.physics.p2.setBoundsToWorld(true, false, false, true);
    game.physics.p2.restitution = 0;
    game.physics.p2.relaxation = 0;
    this.createUI(game);
    this.createSprites(game);
  },
  update: function() {
    const clawComponents = ['claw-left', 'claw-right'];

    const leftKey = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    const rightKey = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    const spaceBarKey = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

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
    } else if (!spaceBarKey.isDown) {
      this['claw-left'].body.angle += -0.5;
      this['claw-left'].angle += -0.5;
      this['claw-right'].body.angle += 0.5;
      this['claw-right'].angle += 0.5;
    }

    if (leftKey.isDown
    && this['claw-left'].body.velocity.x === 0) {
      console.log('moving left');
      clawComponents.forEach(c => this[c].body.velocity.x = -1000);
    } else if (rightKey.isDown
    && this['claw-right'].body.velocity.x === 0) {
      console.log('moving right');
      clawComponents.forEach(c => this[c].body.velocity.x = 1000);
      console.log('LOGGING AFTER FOREACH', this['claw-right'].body.velocity.x);
    }

    if ((this['claw-left'].position.x <=
      735 + this['claw-left'].width / 2
      && this['claw-left'].body.velocity.x < 0)
      || (this['claw-right'].position.x >=
      this.game.world.width - this['claw-right'].width / 2
      && this['claw-left'].body.velocity.x > 0)
    ) {
      clawComponents.forEach(c => this[c].body.velocity.x = 0);
    }

    if (!leftKey.isDown && !rightKey.isDown) {
      clawComponents.forEach((c) => {
        this[c].body.velocity.x = 0;
      });
    }

    // Destroy sprite in menu
    if (this[game.state.currentSprite].position.y > dropLineHeight - 500
      && game.state.currentMenuState.includes(game.state.currentSprite)
    ) {
      this[`menu-${game.state.currentSprite}`].destroy();
      game.state.currentMenuState.splice(0, 1);
    }

    // Win condition
    spriteLists[game.state.currentTheme].forEach((sprite) => {
      if (this[sprite]) {
        const topOfSprite = this[sprite].position.y - this[sprite].height / 2;
        if (topOfSprite > dropLineHeight - 300 && topOfSprite < dropLineHeight
          && Math.floor(
            this[sprite].previousPosition.y
          ) === Math.floor(
            this[sprite].position.y
          )) {
          console.log('WIN CONDITION MET');
        }
      }
    });
  },
  createUI: function() {
    const worldUi = this.game.add.bitmapData(
      this.game.world.width, this.game.world.height
    );

    // Making the drop line
    worldUi.ctx.beginPath();
    worldUi.ctx.setLineDash([40, 30]);
    worldUi.ctx.moveTo(0, dropLineHeight);
    worldUi.ctx.lineTo(this.game.world.width, dropLineHeight);
    worldUi.ctx.lineWidth = 15;
    worldUi.ctx.strokeStyle = '#800000';
    worldUi.ctx.stroke();

    // Making the rope line
    worldUi.ctx.beginPath();
    worldUi.ctx.setLineDash([1, 0]);
    worldUi.ctx.moveTo(0, 130);
    worldUi.ctx.lineTo(this.game.world.width, 130);
    worldUi.ctx.lineWidth = 30;
    worldUi.ctx.strokeStyle = '#555555';
    worldUi.ctx.stroke();

    // Make the left menu rectangle
    worldUi.ctx.beginPath();
    worldUi.ctx.rect(
      0, 0, 735, this.game.world.height);
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
    // Initial states at beginning of lev
    game.state.currentMenuState = [...spriteLists[game.state.currentTheme]];
    game.state.currentSprite = spriteLists[game.state.currentTheme][0];

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
      this[spriteName].body.restitution = 0;
      this[spriteName].body.damping = 0.9;
      this[spriteName].body.loadPolygon('temple_physics', spriteName);
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

    // Place the sprite in the menu and in the claw
    spriteLists[game.state.currentTheme].forEach(
      (sprite, i) => {
        placeSpriteInMenu(sprite, i);

        if (game.state.currentSprite === sprite
          && !this[game.state.currentSprite]) {
          placeSpriteInClaw(sprite);
        }
      }
    );

    // Menu scrolling
    const upKey = this.input.keyboard.addKey(Phaser.Keyboard.UP);
    const downKey = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);

    // Updating the menu on pressing the up or down keys
    const updateMenu = () => {
      if (this[game.state.currentSprite].position.y < dropLineHeight - 500) {
        this[game.state.currentSprite].destroy();
      }

      game.state.currentSprite = game.state.currentMenuState[0];

      game.state.currentMenuState.forEach(
        (sprite, i) => {
          this[`menu-${sprite}`].destroy();
          placeSpriteInMenu(sprite, i);

          if (game.state.currentSprite === sprite) {
            placeSpriteInClaw(sprite);
          }
        }
      );
    };

    // Reset the menu when the user presses R
    const resetMenu = () => {
      game.state.currentMenuState = [...spriteLists[game.state.currentTheme]];
      game.state.currentSprite = game.state.currentMenuState[0];

      game.state.currentMenuState.forEach((sprite, i) => {
        if (this[`menu-${sprite}`]) {
          this[`menu-${sprite}`].destroy();
        }
        placeSpriteInMenu(sprite, i);

        if (game.state.currentSprite === sprite) {
          placeSpriteInClaw(sprite);
        }
      });
    };

    game.state.currentMenuState.length && upKey.onDown.add(() => {
      if (game.state.currentMenuState.length) {
        game.state.currentMenuState.push(game.state.currentMenuState[0]);
        game.state.currentMenuState.splice(0, 1);
        updateMenu();
      }
    });

    game.state.currentMenuState.length && downKey.onDown.add(() => {
      if (game.state.currentMenuState.length) {
        game.state.currentMenuState.unshift(
          game.state.currentMenuState[game.state.currentMenuState.length - 1]
        );
        game.state.currentMenuState.pop();
        updateMenu();
      }
    });

    const rKey = this.input.keyboard.addKey(Phaser.Keyboard.R);

    // Pressing R to reset
    rKey.onDown.add(() => {
      // Destroy the currently active physics-enabled sprites
      spriteLists[game.state.currentTheme].forEach((sprite) => {
        this[sprite] ? this[sprite].destroy() : null;
      });

      // Restore the current menu state
      resetMenu();
    });
  }
};
