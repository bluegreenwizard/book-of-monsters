<template>
  <div id="title-menu">
    <button @click="start">Start Game</button>
  </div>
</template>

<script>
import game from '../game';

export default {
    methods: {
        start() {
            game.scene.start('GamePlay');
            this.$emit('changeUI', 'Dialogue');
        }
    }
}
</script>