import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'allTiles',
      'timeToSwap',
      'selectedTile',
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
      let newRow;
      let nextId = 0;
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < 8; i++) {
        newRow = [];
        // eslint-disable-next-line no-plusplus
        for (let j = 0; j < 8; j++) {
          newRow.push(this.createOneTile(nextId));
          nextId += 1;
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
        // eslint-disable-next-line prefer-destructuring
        const allTiles = this.allTiles;
        const tileOne = this.selectedTile;
        // eslint-disable-next-line
        const tileTwo = this.secondSelectedTile;
        const theTileOneIndex = this.search2DArray(allTiles, tileOne);
        // eslint-disable-next-line
        console.log('[LAUREN] tileIndex:', theTileOneIndex);
        const theTileTwoIndex = this.search2DArray(allTiles, tileTwo);

        const arr = allTiles;
        const xPos = theTileOneIndex[0];
        const yPos = theTileOneIndex[1];
        const xPos2 = theTileTwoIndex[0];
        const yPos2 = theTileTwoIndex[1];

        arr[xPos][yPos] = tileTwo;
        arr[xPos2][yPos2] = tileOne;

        this.initializeAllTiles(arr);

        // unselect tiles
        this.resetAfterSwap();
      }
    },
    search2DArray(allTiles, aTile) {
      let indexOfATile;
      let currentArr;
      for (let i = 0; i < 8; i += 1) {
        currentArr = allTiles[i];
        indexOfATile = currentArr.findIndex((tile) => tile.tileId === aTile.tileId);
        if (indexOfATile !== -1) {
          return [i, indexOfATile];
        }
      }
      return -1;
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
