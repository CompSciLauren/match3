<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <h1>Lauren's Match3</h1>
    <GameBoard />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import GameBoard from '../components/GameBoard.vue';

@Options({
  components: {
    GameBoard,
  },
})
export default class HomeView extends Vue {}
</script>
