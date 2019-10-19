import GameScene from './GameScene';
import createController from '../util/controller';
import config from '../config';

export default class TitleScreen extends GameScene {
    constructor() {
        super({key: 'TitleScreen'});
    }

    init() {
    
    }

    preload() {
        this.load.bitmapFont(
            'munro', 
            'assets/fonts/munro.png', 
            'assets/fonts/munro.xml'
        );
    }

    create() {
        
        this.cameras.main.setBackgroundColor('#161616');
        let title = this.add.bitmapText(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - (this.cameras.main.height / 4), 
            'munro',
            'Game Title',
        );
        
        this.ctrl = createController(this, config.buttons);
        title.setOrigin(0.5);

        this.ctrl.on('confirm', () => {
            this.scene.start('GamePlay');
        });
    }

    update(time, delta) {
        
    }
}