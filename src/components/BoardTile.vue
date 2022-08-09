<template>
  <div class="board-tile" :style="{ backgroundColor: tileColor }" @click="printTile">
    <p>{{tileType}}</p>
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
      tileType: this.getRandomTileType(1, 7),
      tileColor: 'gray',
    };
  },
  mounted() {
    this.tileColor = this.getTileColor(this.tileType);
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
