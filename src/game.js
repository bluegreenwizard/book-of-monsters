import GamePlay from './scenes/GamePlay';

const config = {
    type: Phaser.AUTO,
    pixelArt: true,
    parent: 'game',
    width: 192,
    height: 144,
    // scale: {
    //     mode: Phaser.Scale.ZOOM_4X,
    // },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }
        }
    }
};

const game = new Phaser.Game(config);
game.scene.add('GamePlay', GamePlay, true);
// game.events.once(Phaser.Scenes.Events.CREATE, scene => {
//     scene.cursors = scene.input.keyboard.createCursorKeys();
// });

export default game;