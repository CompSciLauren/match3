import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'allTiles',
      'timeToSwap',
      'firstSelectedTile',
      'secondSelectedTile',
    ]),
  },
  methods: {
    ...mapActions([
      'initializeAllTiles',
      'updateSelectedTile',
      'resetAfterSwap',
    ]),
    createTiles() {
      const allTiles = [];
      const boardLength = 8;
      let newRow;
      let nextTileId = 0;
      for (let i = 0; i < boardLength; i += 1) {
        newRow = [];
        for (let j = 0; j < boardLength; j += 1) {
          newRow.push(this.createOneTile(nextTileId));
          nextTileId += 1;
        }
        allTiles.push(newRow);
      }
      return allTiles;
    },
    createOneTile(id) {
      const newTile = {};
      newTile.tileType = this.getRandomTileType(1, 7);
      newTile.tileColor = this.getTileColor(newTile.tileType);
      newTile.tileId = id;

      return newTile;
    },
    getRandomTileType(i1, i2) {
      const min = i1;
      const max = i2 + 1;
      return Math.floor(Math.random(min, max) * (max - min) + min);
    },
    getTileColor(tileType) {
      let color = null;

      switch (tileType) {
        case 1:
          color = 'red';
          break;
        case 2:
          color = 'orange';
          break;
        case 3:
          color = 'yellow';
          break;
        case 4:
          color = 'lightgreen';
          break;
        case 5:
          color = 'lightblue';
          break;
        case 6:
          color = 'violet';
          break;
        case 7:
          color = 'cyan';
          break;
        default:
          color = 'brown';
      }

      return color;
    },
    swapTwoTiles() {
      if (this.timeToSwap) {
        const { allTiles } = this;
        const tileOne = this.firstSelectedTile;
        const tileTwo = this.secondSelectedTile;
        const tileOneIndex = this.findIndexIn2DArray(allTiles, tileOne);
        const tileTwoIndex = this.findIndexIn2DArray(allTiles, tileTwo);

        const xPos = tileOneIndex[0];
        const yPos = tileOneIndex[1];
        const xPos2 = tileTwoIndex[0];
        const yPos2 = tileTwoIndex[1];

        allTiles[xPos][yPos] = tileTwo;
        allTiles[xPos2][yPos2] = tileOne;

        this.initializeAllTiles(allTiles);

        // unselect tiles
        this.resetAfterSwap();
      }
    },
  },
  watch: {
    timeToSwap(val) {
      if (val === true) {
        this.swapTwoTiles();
      }
    },
  },
};
