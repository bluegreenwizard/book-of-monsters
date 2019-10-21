import GameScene from './GameScene';
import Walker from '../entities/walker';

export default class GamePlay extends GameScene {
    constructor() {
        super({key: 'GamePlay'});
    }

    init() {
        
    }

    preload() {
        this.load.image('title', './assets/title.png');
        this.load.image('story', './assets/story.png');
        this.load.image('night', './assets/bedroom.png');

        this.load.image('roundbody', './assets/round.png');
        this.load.image('roundhead', './assets/roundhead.png');
    }

    create() {
        this.game.events.emit('scene-create');
        this.cameras.main.setBackgroundColor('#000000');
    }

    update(time, delta) {
        
    }
}