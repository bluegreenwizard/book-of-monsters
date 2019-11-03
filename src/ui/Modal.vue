<template>
    <div id="modal-grid">
        <div class="modal" @click="advance">
            <template v-if="lines.length > 0">
                <p>{{ dialogue.substring(0, shownChars) }}</p>
                <ul v-if="options.length > 0 && dialogue.length <= shownChars">
                    <li v-for="(option, i) in options" 
                        :key="i">
                        <a @click="goToNode(option.destination)">{{ option.text }}</a>
                    </li>
                </ul>
            </template>
            <template v-else>
                ...
            </template>
        </div>
    </div>
</template>

<script>
export default {
    props: [
        'lines',
        'options'
    ],
    data() {
        return {
            shownChars: 0,
            locked: false
        }
    },
    methods: {
        advance() {
            if(this.dialogue.length > this.shownChars) {
                this.shownChars = this.dialogue.length;
            } else if (this.options.length === 0) {
                this.shownChars = 0;
                this.$emit('advanceDialogue');
            }
        },
        goToNode(destination) {
            this.$emit('goToNode', destination);
        }
    },
    computed: {
        dialogue() {
            return this.lines.join('\n');
        }
    },
    created() {
        //set timer for revealing letters
        setInterval(() => {
            this.shownChars += 1;
        }, 65);
    }
}
</script>