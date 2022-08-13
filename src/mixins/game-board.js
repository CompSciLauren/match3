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
      let src = '';

      switch (tileType) {
        case 1:
          src = '../assets/jewels/axolotl.jpeg';
          break;
        case 2:
          src = '../assets/jewels/bee.png';
          break;
        case 3:
          src = '../assets/jewels/bunny.jpeg';
          break;
        case 4:
          src = '../assets/jewels/butterfly.png';
          break;
        case 5:
          src = '../assets/jewels/fish.png';
          break;
        case 6:
          src = '../assets/jewels/frog.jpeg';
          break;
        default:
          src = '../assets/jewels/snake.webp';
      }

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
      const tilePositionsGood = this.tilesAreNextToEachOtherHorizOrVert(xPos, yPos, xPos2, yPos2);
      // const swapResultsInMatch3OrMore = this.tileSwapResultsInAMatch(xPos, yPos, xPos2, yPos2);

      return tilePositionsGood;
    },
    tilesAreNextToEachOtherHorizOrVert(xPos, yPos, xPos2, yPos2) {
      const invalidSameTile = xPos === xPos2 && yPos === yPos2;
      const invalidTooFarAway = Math.abs(xPos - xPos2) > 1 || Math.abs(yPos - yPos2) > 1;
      const invalidTwoXAndTwoYNotSame = xPos !== xPos2 && yPos !== yPos2;

      const invalid = invalidSameTile || invalidTooFarAway || invalidTwoXAndTwoYNotSame;

      if (invalid) {
        return false;
      }

      return true;
    },
    tileSwapResultsInAMatch(allTiles) {
      console.log('[LAUREN] 1:');
      return this.findHorizontalMatch(allTiles) || this.findVerticalMatch();
    },
    findHorizontalMatch(allTiles) {
      console.log('[LAUREN] 1.5:');
      let tileTypeToMatch;
      let currentMatchCount;
      for (let i = 0; i < 8; i += 1) {
        currentMatchCount = 0;
        for (let j = 0; j < 8; j += 1) {
          if (currentMatchCount === 0) {
            tileTypeToMatch = allTiles[i][j].tileType;
            currentMatchCount += 1;
            console.log('[LAUREN] NEW TO MATCH tileTypeToMatch:', tileTypeToMatch, 'with:', allTiles[i][j].tileType, 'at:', i, j);
          } else if (currentMatchCount >= 3) {
            console.log('[LAUREN] 3 IN A ROW match count is:', currentMatchCount);
            return true;
          } else if (allTiles[i][j].tileType === tileTypeToMatch) {
            console.log('[LAUREN] MATCH tileTypeToMatch:', tileTypeToMatch, 'with:', allTiles[i][j].tileType, 'at:', i, j);
            currentMatchCount += 1;
          } else {
            console.log('[LAUREN] NOT A MATCH tileTypeToMatch:', tileTypeToMatch, 'with:', allTiles[i][j].tileType, 'at:', i, j);
            tileTypeToMatch = allTiles[i][j].tileType;
            currentMatchCount = 1;
          }
        }
      }
      console.log('[LAUREN] returning false:');
      return false;
    },
    findVerticalMatch() {
      // let tileTypeToMatch;
      // let currentMatchCount;
      // for (let i = 0; i < 8; i += 1) {
      //   currentMatchCount = 0;
      //   for (let j = 0; j < 8; j += 2) {
      //     if (currentMatchCount === 0) {
      //       tileTypeToMatch = allTiles[i][j].tileType;
      //     } else if (currentMatchCount >= 3) {
      //       return true;
      //     } else if (allTiles[i][j].tileType === tileTypeToMatch) {
      //       currentMatchCount += 1;
      //     } else {
      //       currentMatchCount = 0;
      //     }
      //   }
      // }
      return false;
    },
    swapTwoTiles(tileOne, xPos, yPos, tileTwo, xPos2, yPos2) {
      const { allTiles } = this;
      const allTilesWithPendingSwap = [...allTiles];
      allTiles[xPos][yPos] = tileTwo;
      allTiles[xPos2][yPos2] = tileOne;

      if (!this.tileSwapResultsInAMatch(allTilesWithPendingSwap)) {
        console.log('[LAUREN] 2:');
        // unswap the two tiles
        allTiles[xPos][yPos] = tileOne;
        allTiles[xPos2][yPos2] = tileTwo;
      }
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
