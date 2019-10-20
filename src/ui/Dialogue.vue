<template>
    <div id="modal-grid">
        <modal v-if="content" v-bind:content="content" @goToNode="goToNode"></modal>
    </div>
</template>

<script>
import game from '../game';
import yarn from '../util/yarn-parse';
import Modal from './Modal';

export default {
    props: [
        'props'
    ],
    components: {
        Modal
    },
    data() {
        return {
            content: null
        }
    },
    methods: {
        goToNode(title) {
            //Resets content and parses a new node from title.
            this.content = null;
            //Wait 1 cycle to allow previous Modal to be destroyed.
            setTimeout(() => {
                this.content = yarn.getNode(title)
                .then(node => {
                    if (this.props.monster) {
                        node.body = this.setNodeVariables(node, this.props.monster);
                    }
                    return yarn.getBodyParts(node);
                });
            }, 0);
        },
        setNodeVariables(node, monster) {
            node.body = node.body.replace(/\(\(.+?\)\)/g, (str) => {
                console.log(monster);
                const feature = str.match(/\(\((.+?)\)\)/)[1];
                return monster[feature];
            });
            return node.body;
        },
    },
    created() {
        this.goToNode(this.props.nodeTitle);
    }
}
</script>