<template>
  <div class="board-tile" @click="setSelectedTile">
    <img alt="Jewel" :src="tile.tileIcon" width="50" height="50">
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
  computed: {
    tile() {
      const tile = {};
      if (this.allTiles.length > 0) {
        const tiles = this.allTiles;
        const myTile = tiles[this.xPos][this.yPos];
        tile.tileId = myTile.tileId;
        tile.tileType = myTile.tileType;
        tile.tileIcon = myTile.tileIcon;
        tile.xPos = this.xPos;
        tile.yPos = this.yPos;
      }
      return tile;
    },
  },
};
</script>

<style scoped>
.board-tile {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 75px;
  height: 75px;
  background-color: white;
  border: 1px solid black;
}

.vue-symbol {
  width: 50%;
  margin: auto;
}
</style>
