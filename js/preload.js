const Preload = function(game) {};

Preload.prototype = {
  preload: function(game) {
    spriteLists[game.state.currentTheme].forEach((sprite) => { //eslint-disable-line
      this.game.load.image(sprite, `assets/themes/${game.state.currentTheme}/${sprite}.png`);
    });
    this.game.load.image('claw-left', 'assets/ui/claw-left.png');
    this.game.load.image('claw-right', 'assets/ui/claw-right.png');
    this.game.load.physics('sprite_physics2', 'assets/sprite_physics2.json');
    this.game.load.physics('claw_physics', 'assets/ui/claw_physics.json');
    this.game.load.physics('building_physics', 'assets/themes/building/building_physics.json');
    this.game.load.physics('column_physics', 'assets/themes/column/column_physics.json');
  },
  create: function() {
    this.game.state.start('Main');
  }
};
