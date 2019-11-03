<template>
    <div id="menu" @click="inputEvent">
        <div class="container">
            <modal 
                v-if="dialogueLines.length > 0"
                :lines="dialogueLines"
                :options="dialogueOptions"
                @advanceDialogue="advanceDialogue"
                @goToNode="goToNode">
            </modal>
        </div>
    </div>
</template>

<script>
import game from '../game';
import yarn from '../util/yarn-parse';
import yarnCommands from '../util/yarn-commands';

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
            dialogueLines: [],
            dialogueOptions: [],
            selectedMonster: 0,
            night: 1,
            node: null,
            step: 0
        }
    },
    methods: {
        inputEvent() {
            this.$emit('click');
        },
        advanceDialogue() {
            this.dialogueLines = [];
            this.$emit('advanceDialogue');
        },
        //Main Engine
        getNode(title, step = 0) {
            return yarn.parseNode(title);
        },
        goToNode(title, step = 0) {
            //Clear current node.
            this.node = null;
            this.dialogue = null;
            this.dialogueOptions = [];
            yarn.parseNode(title)
            .then(node => {
                this.node = node;
                this.step = step;
                this.$emit('nodeReady');
            });
        },
        runCommand(commandString) {
            const [ command, ...args ] = commandString.split(' ');
            return new Promise((resolve) => {
                resolve(yarnCommands[command].bind(this)(...args));
            });
        },
        nodeStep() {
            const debug = true;
            //Process current step based on type
            //Return a promise which resolves when the step is completed.
            const cur = this.node[this.step];
            if (debug) {
                console.log(cur.type, ': ', cur.content);
            }
            switch (cur.type) {
                case 'command':
                    return this.runCommand(cur.content)
                    .catch(e => {
                        console.log(`Error on command: ${cur.content}`);
                        throw e;
                    });
                case 'link':
                    //If link is an option
                    if (cur.content.match(/\|/)) {
                        const [ text, destination ] = cur.content.split('|');
                        this.dialogueOptions.push({
                            text,
                            destination
                        });
                    } else {
                    //Link is a goto
                        return new Promise((resolve) => {
                            this.getNode(cur.content)
                            .then(newNode => {
                                this.node.splice(this.step + 1, 0, ...newNode);
                                resolve();
                            });
                        });
                    }
                    return new Promise((resolve) => resolve());
                case 'dialogue':
                    this.dialogueLines.push(cur.content);
                default:
                    return new Promise((resolve) => resolve());
            }                            
        },
        processNode() {
            if (this.step < this.node.length) {
                this.nodeStep().then(res => {
                    this.step += 1;
                    this.processNode();
                });
            }
        }
    },
    created() {
        game.events.on('scene-create', () => {
            this.scene = game.scene.getScene('GamePlay');
            this.goToNode('TitleScreen');
        });
    },
    mounted() {
        this.$on('nodeReady', () => {
            this.processNode();
        });
    }
}
</script>