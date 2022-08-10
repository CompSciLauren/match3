<template>
  <div class="game-board">
    <BoardRow :rowPos="0" />
    <BoardRow :rowPos="1" />
    <BoardRow :rowPos="2" />
    <BoardRow :rowPos="3" />
    <BoardRow :rowPos="4" />
    <BoardRow :rowPos="5" />
    <BoardRow :rowPos="6" />
    <BoardRow :rowPos="7" />
  </div>
</template>

<script>
import { Options, Vue } from 'vue-class-component';
import BoardRow from './BoardRow.vue';
import GameBoardMixin from '../mixins/game-board';

@Options({
  name: 'GameBoard',
  mixins: [GameBoardMixin],
  components: {
    BoardRow,
  },
  mounted() {
    this.initializeAllTiles(this.createTiles());
    //  eslint-disable-next-line
    console.log('[LAUREN] tiles init to:', this.allTiles);
  },
})
export default class HelloWorld extends Vue {}
</script>

<style scoped>
.game-board {
  width: 600px;
  height: 600px;
  background-color: lightsteelblue;
  margin: auto;
}
</style>
