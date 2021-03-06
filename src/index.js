window.Phaser = {};
window.PIXI = require('../node_modules/phaser/build/pixi');
window.p2 = require('../node_modules/phaser/build/p2');
window.Phaser = require('phaser');
const Sounds = require('../lib/sounds').default;
const GameController = require('@code-dot-org/craft').GameController;

const level = {
  gridDimensions: [10, 10],
  fluffPlane: ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""],
  isAquaticLevel: true,
  playerName: "SteveAquatic",
  assetPacks: {
    beforeLoad: ['aquaticIslandAssets', 'playerSteveAquatic'],
    afterLoad: [],
  },
  groundPlane: ["water", "water", "water", "water", "water", "water", "water", "water", "water", "water", "water", "water", "sand", "sand", "water", "water", "water", "water", "water", "water", "water", "water", "sand", "sand", "sand", "water", "water", "water", "water", "water", "water", "sand", "sand", "sand", "sand", "planksOak", "planksOak", "water", "water", "water", "sand", "sand", "sand", "sand", "sand", "water", "water", "water", "water", "water", "sand", "sand", "sand", "sand", "sand", "sand", "water", "water", "water", "water", "sand", "sand", "sand", "sand", "sand", "sand", "water", "water", "water", "water", "water", "sand", "sand", "sand", "sand", "sand", "water", "water", "water", "water", "water", "water", "sand", "sand", "sand", "water", "water", "water", "water", "stone", "water", "water", "water", "water", "water", "water", "water", "stone", "water", "water"],
  groundDecorationPlane: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "tallGrass", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "tallGrass", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  actionPlane: ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "treeJungle", "", "boatChest", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""],
  playerStartPosition: [4, 7],
  playerStartDirection: 0,
  verificationFunction: verificationAPI => verificationAPI.isEntityAt("Player", [4, 5]),
};

window.gameController = new GameController({
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

gameController.loadLevel(level);

Blockly.Blocks.when_run = {
  init: function () {
    this.jsonInit({
      message0: 'when run',
      nextStatement: null,
      colour: '#fda400',
    });
  },
};

Blockly.Blocks.move_forward = {
  init: function () {
    this.jsonInit({
      message0: 'move forward',
      previousStatement: null,
      nextStatement: null,
      colour: '#00b0bd',
    });
  },
};

Blockly.Blocks.turn_left = {
  init: function () {
    this.jsonInit({
      message0: 'turn left',
      previousStatement: null,
      nextStatement: null,
      colour: '#00b0bd',
    });
  },
};

Blockly.JavaScript.when_run = function (block) {
  return '';
};

Blockly.JavaScript.move_forward = function (block) {
  return 'gameController.codeOrgAPI.moveForward();';
};

Blockly.JavaScript.turn_left = function (block) {
  return 'gameController.codeOrgAPI.turnLeft();'
}

const workspace = Blockly.inject('blockly', {
  toolbox: document.querySelector('#toolbox'),
  media: './node_modules/blockly/media/',
});

// Don't codegen for unattached blocks.
workspace.addChangeListener(Blockly.Events.disableOrphans);

document.querySelector('#run').addEventListener('click', () => {
  gameController.codeOrgAPI.resetAttempt();
  gameController.codeOrgAPI.startAttempt();
  eval(Blockly.JavaScript.workspaceToCode(Blockly.mainWorkspace));
});
