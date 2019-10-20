<template>
    <div id="modal-grid">
        <div class="modal" @click="advance">
            <template v-if="text.length > 0">
                <p>{{ text.substring(0, shownChars) }}</p>
                <ul v-if="options.length > 0 && text.length <= shownChars">
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
        'text',
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
            if(this.text.length > this.shownChars) {
                this.shownChars = this.text.length;
            } else {
                this.goToNextPart();
                this.shownChars = 0;
            }
        },
        goToNextPart() {
            this.$emit('goToNextPart');
        },
        goToNode(title) {
            this.$emit('goToNode', title);
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