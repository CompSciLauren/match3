<template>
  <div class="board-row">
    <BoardTile :xPos="rowPos" :yPos="0" />
    <BoardTile :xPos="rowPos" :yPos="1" />
    <BoardTile :xPos="rowPos" :yPos="2" />
    <BoardTile :xPos="rowPos" :yPos="3" />
    <BoardTile :xPos="rowPos" :yPos="4" />
    <BoardTile :xPos="rowPos" :yPos="5" />
    <BoardTile :xPos="rowPos" :yPos="6" />
    <BoardTile :xPos="rowPos" :yPos="7" />
  </div>
</template>

<script>
import BoardTile from './BoardTile.vue';

export default {
  name: 'BoardRow',
  components: {
    BoardTile,
  },
  props: {
    rowPos: {
      type: Number,
      default: null,
    },
  },
};
</script>

<style scoped>
.board-row {
  background-color: red;
  display: flex;
}
</style>
