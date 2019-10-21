<template>
    <div id="menu" @click="inputEvent">
        <div class="container">
            <modal 
                v-if="dialogue"
                :text="dialogue.text"
                :options="dialogue.options"
                @goToNode="(title) => goToNode(title)"
                @goToNextPart="goToNextPart">
            </modal>
        </div>
    </div>
</template>

<script>
import game from '../game';
import generateMonster from '../util/monstermaker';
import { sample, random as randInt } from 'lodash';
import yarn from '../util/yarn-parse';

import Modal from './Modal';

export default {
    components: {
        Modal
    },
    data() {
        return {
            sceneData: null,
            scene: null,
            bg: null,
            monsters: [],
            monsterSprite: null,
            dialogue: null,
            selectedMonster: 0,
            night: 1,
            node: null,
            parts: [],
            part: 0
        }
    },
    methods: {
        getRandomMonsterIndex() {
            return randInt(0, this.monsters.length);
        },
        selectMonster(index) {
            this.selectedMonster = index;
        },
        addNewMonster(level) {
            generateMonster(level).then((monster) => {
                this.monsters.push(monster);
            });
        },
        inputEvent() {
            this.$emit('inputEvent');
        },

        //Main Engine
        
        goToNode(title, part = 0) {
            //Clear current node, reset part number.
            this.node = null;
            this.part = part;
            
            yarn.getNode(title)
            .then(node => {
                this.node = node;
                this.parts = yarn.getBodyParts(node);
                this.runCommands();
            });
        },
        goToNextPart() {
            this.goToNode(this.node.title, this.part + 1);
        },
        currentPart() {
            return this.parts[this.part];
        },
        //Triggers when node is loaded, and on each step
        runCommands(current = 0) {
            const part = this.currentPart();
            let done = null;

            const { command, arg } = part.commands[current];
            done = new Promise((resolve, reject) => {
                resolve(this[command](arg));
            });

            done.then(() => {
                if (current + 1 < part.commands.length) {
                    this.runCommands(current + 1);
                } else {
                    this.dialogue = part;
                }
            }).catch((error) => {
                console.log(error);
                throw `Invalid command (${command}) used in yarn node. Node: ${ this.node.title }, Part #: ${this.part + 1}`;
            });
        },
        advance(){
            this.part += 1;
            this.activateNode();
        },

        //Yarn Commands
        changebg(bgKey) {
            if (this.bg) {
                this.bg.destroy();
            }
            this.bg = this.scene.add.image(0, 0, bgKey);
            this.bg.depth = 2;
            this.bg.setOrigin(0, 0);
        },
        createNewMonster(level) {
            generateMonster(level).then(monster => {
                this.monsters.push(monster);
            });
        },
        selectRandomMonster() {
            this.selectedMonster = randInt(0, this.monsters.length);
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
        waitForInput() {
            return new Promise((resolve) => {
                this.$on('inputEvent', () => {
                    resolve();
                });
            });
        },
        fadeToBlack(ms = 2000) {
            setTimeout(() => {
                
            }, 2000);
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
    },
    created() {
        game.events.on('scene-create', () => {
            this.scene = game.scene.getScene('GamePlay');
            this.goToNode('TitleScreen');
        });
    }
}
</script>