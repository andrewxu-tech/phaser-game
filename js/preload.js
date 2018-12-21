const Preload = function(game) {};

Preload.prototype = {

  preload: function(game) {
    spriteLists[game.state.currentTheme].forEach((sprite) => { //eslint-disable-line
      this.game.load.image(sprite, `assets/${sprite}.png`);
    });
    this.game.load.physics('sprite_physics2', 'assets/sprite_physics2.json');
  },

  create: function() {
    this.game.state.start('Main');
  }
};
