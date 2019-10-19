<template>
    <div id="menu">
        <div id="container">
            <p>Tell me about...</p>
            <ul>
                <li><a href="#" @click="test">Yourself</a></li>
                <li><a href="#" @click="test2">Marg</a></li>
                <li><a href="#">Henry</a></li>
                <li><a href="#">Poo</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
import game from '../game';

export default {
    methods: {
        test() {
            game.scene.start('GamePlay');
        },
        test2() {
            const scene = game.scene.getScene('GamePlay');
            scene.cameras.main.setBackgroundColor('#161616');
        }
    }    
}
</script>