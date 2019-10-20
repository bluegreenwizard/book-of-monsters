<template>
    <div class="modal" @click="advance">
        <template v-if="parts.length > 0">
            <p>{{ parts[current].text.substring(0, shownChars) }}</p>
            <ul v-if="parts[current].options.length > 0">
                <li v-for="(option, i) in parts[current].options" 
                    :key="i">
                    <a @click="goToNode(option.destination)">
                        {{ option.text }}
                    </a>
                </li>
            </ul>
        </template>
        <template v-else>
            ...
        </template>
    </div>
</template>

<script>
export default {
    props: ['content'],
    data() {
        return {
            parts: [],
            current: 0,
            shownChars: 0,
            locked: false
        }
    },
    methods: {
        advance() {
            if(this.parts[this.current].text.length > this.shownChars) {
                this.shownChars = this.parts[this.current].text.length;
            } else {
                this.goToNextPart();
            }
        },
        goToNextPart() {
            this.current = Math.min(this.current + 1, this.parts.length - 1);
            if (!this.locked) {
                this.shownChars = 0;
            }
            
            if (this.current === this.parts.length - 1) {
                this.locked = true;
            }
        },
        goToNode(title) {
            this.$emit('goToNode', title);
        }
    },
    created() {
        //async load modal content
        this.content.then(parts => {
            this.parts = parts;
        });

        //set timer for revealing letters
        setInterval(() => {
            this.shownChars += 1;
        }, 65);
    }
}
</script>