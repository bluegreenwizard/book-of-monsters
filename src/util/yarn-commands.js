import generateMonster from '../util/monstermaker';

export default {
    changeBg(bgKey) {
        if (this.bg) {
            this.bg.destroy();
        }
        this.bg = this.scene.add.image(0, 0, bgKey);
        this.bg.depth = 2;
        this.bg.setOrigin(0, 0);
    },
    testCommand() {
        console.log('tested successted!');
    },
    createNewMonster(level) {
        generateMonster(level).then(monster => {
            this.monsters.push(monster);
        });
    },
    selectRandomMonster() {
        this.selectedMonster = randInt(0, this.monsters.length);
    },
    selectMonster(index) {
        this.selectedMonster = index;
    },
    addNewMonster(level) {
        generateMonster(level).then((monster) => {
            this.monsters.push(monster);
        });
    },
    addMonsterToScene() {
        let monster = this.monsters[this.selectedMonster];
        if (monster.stage === 1) {
            this.monsterSprite = this.scene.add.image(80, 70, monster.bodyType + 'body');
            this.monsterSprite.depth = 1;
        } else if (monster.stage == 2) {
            this.monsterSprite = this.scene.add.image(69, 80, monster.bodyType + 'body');
            this.monsterSprite.depth = 3;
        } else { //monster stage 3
            this.monsterSprite = this.scene.add.image(69, 80, monster.bodyType + 'head');
            this.monsterSprite.depth = 3;
        }
        this.monsterSprite.setOrigin(0, 1);
    },
    incrementNightCounter() {
        this.night += 1;
    },
    showCurrentNight() {

    },
    waitFor(event) {
        return new Promise((resolve) => {
            this.$on(event, () => {
                resolve();
            });
        });
    },
    fadeTo(color, ms = 2000) {
        
    },
    fadeIn() {
        
    },
    setTextVariables() {
        let part = this.currentPart();
        part.text = part.text.replace(/\(\(.+?\)\)/g, (str) => {
            const feature = str.match(/\(\((.+?)\)\)/)[1];
            return this.monsters[selectedMonster][feature];
        });
    }
}