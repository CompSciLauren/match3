<template>
  <div class="home">
    <div>
      <h1>Lauren's Match3</h1>
    </div>
    <div>
      <GameBoard />
    </div>
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

<style scoped>
.home {
  background-color: lightblue;
  height: 720px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding-top: 100px;
}
</style>
