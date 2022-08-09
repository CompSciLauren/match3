<template>
  <div class="board-tile" :style="{ backgroundColor: tile.tileColor }" @click="setSelectedTile">
    <p>{{tile.tileType}}</p>
  </div>
</template>

<script>
import BoardTileMixin from '../mixins/board-tile';

export default {
  name: 'BoardTile',
  mixins: [BoardTileMixin],
  props: {
    xPos: {
      type: Number,
      default: null,
    },
    yPos: {
      type: Number,
      default: null,
    },
  },
  data() {
    return {
      tile: {
        tileType: this.getRandomTileType(1, 7),
        tileColor: 'gray',
        xPos: this.xPos,
        yPos: this.yPos,
      },
    };
  },
  mounted() {
    this.tile.tileColor = this.getTileColor(this.tile.tileType);
  },
};
</script>

<style scoped>
.board-tile {
  width: 75px;
  height: 75px;
  background-color: darkgray;
  border: 1px solid black;
}

.vue-symbol {
  width: 50%;
  margin: auto;
}
</style>
