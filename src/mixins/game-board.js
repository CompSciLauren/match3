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
      let src = '';

      switch (tileType) {
        case 1:
          color = 'red';
          src = '../assets/jewels/axolotl.jpeg';
          break;
        case 2:
          color = 'orange';
          src = '../assets/jewels/bee.png';
          break;
        case 3:
          color = 'yellow';
          src = '../assets/jewels/bunny.jpeg';
          break;
        case 4:
          color = 'lightgreen';
          src = '../assets/jewels/butterfly.png';
          break;
        case 5:
          color = 'lightblue';
          src = '../assets/jewels/fish.png';
          break;
        case 6:
          color = 'violet';
          src = '../assets/jewels/frog.jpeg';
          break;
        default:
          color = 'cyan';
          src = '../assets/jewels/snake.webp';
      }

      console.log('[LAUREN] 1:', src, color);
      return src;
      // return color;
    },
    performSwap() {
      const { allTiles } = this;
      const tileOne = this.firstSelectedTile;
      const tileTwo = this.secondSelectedTile;
      const tileOneIndex = this.findIndexIn2DArray(allTiles, tileOne);
      const tileTwoIndex = this.findIndexIn2DArray(allTiles, tileTwo);

      // coords of first tile
      const xPos = tileOneIndex[0];
      const yPos = tileOneIndex[1];

      // coords of second tile
      const xPos2 = tileTwoIndex[0];
      const yPos2 = tileTwoIndex[1];

      if (this.isValidSwap(xPos, yPos, xPos2, yPos2)) {
        this.swapTwoTiles(tileOne, xPos, yPos, tileTwo, xPos2, yPos2);
      }

      // unselect tiles
      this.resetAfterSwap();
    },
    isValidSwap(xPos, yPos, xPos2, yPos2) {
      const invalidSameTile = xPos === xPos2 && yPos === yPos2;
      const invalidTooFarAway = Math.abs(xPos - xPos2) > 1 || Math.abs(yPos - yPos2) > 1;
      const invalidTwoXAndTwoYNotSame = xPos !== xPos2 && yPos !== yPos2;

      const invalid = invalidSameTile || invalidTooFarAway || invalidTwoXAndTwoYNotSame;

      if (invalid) {
        return false;
      }

      return true;
    },
    swapTwoTiles(tileOne, xPos, yPos, tileTwo, xPos2, yPos2) {
      const { allTiles } = this;

      // swap the two tiles
      allTiles[xPos][yPos] = tileTwo;
      allTiles[xPos2][yPos2] = tileOne;

      // initialize game board again
      this.initializeAllTiles(allTiles);
    },
  },
  watch: {
    timeToSwap(swap) {
      if (swap === true) {
        this.performSwap();
      }
    },
  },
};
