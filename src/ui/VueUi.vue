<template>
    <div id="menu">
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

import TitleScreen from './TitleScreen';
import Modal from './Modal';

export default {
    components: {
        TitleScreen,
        Modal
    },
    data() {
        return {
            ui: 'TitleScreen',
            sceneData: null,
            scene: null,
            monsters: [],
            dialogue: null,
            selectedMonster: 0,
            night: 0,
            node: null,
            parts: [],
            part: 0
        }
    },
    methods: {
        changeUI(ui) {
            this.ui = ui;
        },
        startDialogue(title, monster) {
            this.sceneData = {
                nodeTitle: title,
                monster: monster
            };
            this.changeUI('Dialogue');
        },
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

        //Main Engine
        
        goToNode(title, part = 0) {
            //Clear current node, reset part number.
            this.node = null;
            this.part = part;
            
            yarn.getNode(title)
            .then(node => {
                this.node = node;
                this.parts = yarn.getBodyParts(node);
                this.activateNode();
            });
        },
        goToNextPart() {
            this.goToNode(this.node.title, this.part + 1);
        },
        currentPart() {
            return this.parts[this.part];
        },
        //Triggers when node is loaded, and on each step
        activateNode() {
            //Run all commands in current part of node.
            const part = this.currentPart();
            part.commands.forEach(cmd => {
                try {
                    this.runCommand(cmd.command, cmd.arg);
                } catch {
                    throw `Invalid command (${cmd.command}) used in yarn node. Node: ${ this.node.title }, Part #: ${this.part + 1}`
                }
            });

            //Still in node? Create Dialogue Window with node contents.
            this.dialogue = part;
        },
        advance(){
            this.part += 1;
            this.activateNode();
        },

        //Yarn Commands
        runCommand(cmd, arg) {
            this[cmd](arg);
        },
        changebg(bg) {
            console.log(`Changing bg to ${bg}`);
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
        // this.scene = game.scene.getScene('GamePlay');
        // this.scene.cameras.main.setBackgroundColor('#161616');
        this.goToNode('PreStory');
    }
}
</script>