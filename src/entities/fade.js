import Phaser from 'phaser';

export default class Fade extends Phaser.GameObjects.Graphics {
    constructor(scene) {
        super(scene, {
            x: 0,
            y: 0,
            fillStyle: {
                color: 0x000000,
                alpha: 1
            },
        });

        scene.add.existing(this);
        
        this.fillRectShape({
            x: this.x,
            y: this.y,
            width: scene.cameras.main.width,
            height: scene.cameras.main.height
        });
        this.depth = 10;
        this.alpha = 0;
    }

    fadeOut(resolve, ms) {
        const tween = this.scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: ms,
            ease: 'Linear',
            repeat: 0,
            onComplete: () => {
                tween.remove();
                resolve();
            }
        });
        tween.play();
    }
    
    fadeIn(resolve, ms) {
        const tween = this.scene.tweens.add({
            targets: this,
            alpha: 0,
            duration: ms,
            ease: 'Linear',
            repeat: 0,
            onComplete: () => {
                tween.remove();
                resolve();
            }
        });
        tween.play();
    }
}