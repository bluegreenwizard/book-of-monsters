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
            this.content = null;
            //Wait 1 cycle to allow previous Modal to be destroyed.
            setTimeout(() => {
                console.log('Going to:', title)
                this.content = yarn.getNode(title)
                .then(node => {
                    return yarn.getBodyParts(node);
                });
            }, 0);
        }
    },
    created() {
        this.goToNode(this.props.nodeTitle);
    }
}
</script>