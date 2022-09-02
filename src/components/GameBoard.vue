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
import CommonUtilsMixin from '../mixins/common-utils';
import GameBoardMixin from '../mixins/game-board';

@Options({
  name: 'GameBoard',
  mixins: [CommonUtilsMixin, GameBoardMixin],
  components: {
    BoardRow,
  },
  mounted() {
    this.initializeAllTiles(this.createTiles());
    this.handleAllMatches();
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
