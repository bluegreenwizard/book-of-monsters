<template>
    <div id="menu">
        <div class="container">
            <component 
                v-bind:props="sceneData"
                :is="ui" 
                v-on:changeUI="startDialogue('StoryInterlude1', monsters[0])"
            />
        </div>
    </div>
</template>

<script>
import game from '../game';
import generateMonster from '../util/monstermaker';

import TitleScreen from './TitleScreen';
import Dialogue from './Dialogue';

export default {
    components: {
        TitleScreen,
        Dialogue
    },
    data() {
        return {
            ui: 'TitleScreen',
            sceneData: null,
            monsters: []
        }
    },
    methods: {
        test2() {
            const scene = game.scene.getScene('GamePlay');
            scene.cameras.main.setBackgroundColor('#161616');
        },
        changeUI(ui) {
            this.ui = ui;
        },
        startDialogue(title, monster) {
            this.sceneData = {
                nodeTitle: title,
                monster: monster
            };
            this.changeUI('Dialogue');
        }
    },
    created() {
        generateMonster().then(monster => {
            console.log(monster);
            this.monsters.push(monster);
        });
    }
}
</script>