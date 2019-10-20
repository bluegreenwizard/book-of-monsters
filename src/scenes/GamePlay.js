import GameScene from './GameScene';
import Walker from '../entities/walker';

export default class GamePlay extends GameScene {
    constructor() {
        super({key: 'GamePlay'});
    }

    init() {
        
    }

    preload() {
        
    }

    create() {
        this.cameras.main.setBackgroundColor('#161616');
    }

    update(time, delta) {
        
    }
}