window.Phaser = {};
window.PIXI = require('../node_modules/phaser/build/pixi');
window.p2 = require('../node_modules/phaser/build/p2');
const Phaser = require('phaser');
const Sounds = require('../lib/sounds').default;
const GameController = require('@code-dot-org/craft').GameController;

const level = {
  assetPacks: {
    beforeLoad: ['allAssetsMinusPlayer', 'playerAlex', 'playerAgent'],
    afterLoad: [],
  },
  gridDimensions: [10, 10],
  fluffPlane: ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
  playerName: 'Alex',
  playerStartPosition: [],
};

const gameController = new GameController({
  Phaser,
  containerId: 'game',
  assetRoot: 'assets/',
  audioPlayer: new Sounds(),
  debug: true,
  earlyLoadAssetPacks: level.assetPacks.beforeLoad,
  earlyLoadNiceToHaveAssetPacks: level.assetPacks.afterLoad,
  afterAssetsLoaded: () => {
    gameController.codeOrgAPI.startAttempt();
  },
});
