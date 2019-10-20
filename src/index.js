import './styles.sass';
import Phaser from 'phaser';
import Vue from 'vue';
import VueUi from './ui/VueUi';
import game from './game';
import './util/monstermaker';

import './util/yarn-parse';

const app = new Vue({
    el: '#ui',
    components: {
        'vue-ui': VueUi
    },
    template: '<vue-ui game="game"></vue-ui>',
    data: {
        game
    }
});