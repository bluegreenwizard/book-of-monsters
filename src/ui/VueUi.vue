<template>
    <div id="menu">
        <div class="container">
            <component 
                v-bind:props="sceneData"
                :is="ui" 
                v-on:changeUI="startDialogue('Story')" 
            />
        </div>
    </div>
</template>

<script>
import game from '../game';
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
            sceneData: null
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
        startDialogue(title) {
            this.sceneData = {
                nodeTitle: title
            };
            this.changeUI('Dialogue');
        }
    }    
}
</script>