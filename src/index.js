import './styles.sass';
import Vue from 'vue';
import game from './game';
import VueUi from './ui/VueUi';
import './util/monstermaker';

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