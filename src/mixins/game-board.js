import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'allTiles',
      'timeToPerformSwap',
      'firstSelectedTile',
      'secondSelectedTile',
      'individualTile',
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
      newTile.tileIcon = this.getTileIcon(newTile.tileType);
      newTile.tileId = id;
      newTile.tilePosId = id;

      return newTile;
    },
    getRandomTileType(i1, i2) {
      const min = i1;
      const max = i2 + 1;
      return Math.floor(Math.random(min, max) * (max - min) + min);
    },
    getTileIcon(tileType) {
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
        case 7:
          src = '../assets/jewels/snake.webp';
          break;
        default:
          src = ''; // empty tile - temporary state
      }

      return src;
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

      if (this.isValidSwap(tileOne, xPos, yPos, tileTwo, xPos2, yPos2)) {
        this.swapTwoTiles(tileOne, xPos, yPos, tileTwo, xPos2, yPos2);
      }

      // unselect tiles
      this.resetAfterSwap();
    },
    isValidSwap(tileOne, xPos, yPos, tileTwo, xPos2, yPos2) {
      // eslint-disable-next-line max-len
      return this.isValidSwapBasedOnDistance(xPos, yPos, xPos2, yPos2) && this.isValidSwapBasedOnMakingAMatch(tileOne, xPos, yPos, tileTwo, xPos2, yPos2);
    },
    isValidSwapBasedOnDistance(xPos, yPos, xPos2, yPos2) {
      const invalidSameTile = xPos === xPos2 && yPos === yPos2;
      const invalidTooFarAway = Math.abs(xPos - xPos2) > 1 || Math.abs(yPos - yPos2) > 1;
      const invalidTwoXAndTwoYNotSame = xPos !== xPos2 && yPos !== yPos2;

      const invalid = invalidSameTile || invalidTooFarAway || invalidTwoXAndTwoYNotSame;

      return !invalid;
    },
    isValidSwapBasedOnMakingAMatch(tileOne, xPos, yPos, tileTwo, xPos2, yPos2) {
      const totalCurrentMatches = this.handleAllMatches().length;
      console.log('[LAUREN] totalCurrentMatches:', totalCurrentMatches);

      // test swap to find if it increases the match count

      const { allTiles } = this;

      // swap the two tiles
      allTiles[xPos][yPos] = tileTwo;
      allTiles[xPos2][yPos2] = tileOne;

      // initialize game board again
      this.initializeAllTiles(allTiles);

      // check count now
      const totalCurrentMatches2 = this.handleAllMatches().length;
      console.log('[LAUREN] totalCurrentMatches2:', totalCurrentMatches2);

      // revert change once done testing (terrible, rewrite this later)

      // swap the two tiles
      allTiles[xPos][yPos] = tileOne;
      allTiles[xPos2][yPos2] = tileTwo;

      // initialize game board again
      this.initializeAllTiles(allTiles);

      return totalCurrentMatches2 > totalCurrentMatches;
    },
    swapTwoTiles(tileOne, xPos, yPos, tileTwo, xPos2, yPos2) {
      const { allTiles } = this;

      const tileOneId = tileOne.tileId;
      const tileTwoId = tileTwo.tileId;

      // swap the two tiles
      allTiles[xPos][yPos] = tileTwo;
      allTiles[xPos2][yPos2] = tileOne;

      // swap their IDs (two tiles should swap everything except the tile ID which relates to board position)
      allTiles[xPos][yPos].tilePosId = tileOneId;
      allTiles[xPos2][yPos2].tilePosId = tileTwoId;

      // initialize game board again
      this.initializeAllTiles(allTiles);
    },
    handleAllMatches() {
      const horizMatches = this.findAllHorizMatches();
      const vertMatches = this.findVertMatches();
      const allMatches = [...horizMatches, ...vertMatches];

      console.log('[LAUREN] NEW MATCHES FOUND:', allMatches, '\nTOTAL:', allMatches.length);

      if (allMatches.length > 0) {
        console.log('[LAUREN] ====GETTING READY TO REFRESH BOARD====');
        setTimeout(() => { this.clearMatches(allMatches); }, 5000);
        setTimeout(() => { this.replaceMatchedTiles(allMatches); }, 5000);
      }

      return allMatches;
    },
    clearMatches(matches) {
      console.log('[LAUREN] will CLEAR these matches', matches);
      const { allTiles } = this;
      for (let i = 0; i < matches.length; i += 1) {
        for (let j = 0; j < 3; j += 1) {
          const currentMatchedTile = this.individualTile(matches[i][j]);
          const currentXPos = currentMatchedTile[1];
          const currentYPos = currentMatchedTile[2];
          console.log('[LAUREN] a matched tile: ', currentMatchedTile);

          // clear out the tile
          allTiles[currentXPos][currentYPos].tileType = -1;
          allTiles[currentXPos][currentYPos].tileIcon = '';

          console.log('[LAUREN] cleared tiles');

          // initialize game board again
          this.initializeAllTiles(allTiles);
        }
      }
    },
    replaceMatchedTiles(matches) {
      console.log('[LAUREN] will REPLACE these matches', matches);
      const { allTiles } = this;
      for (let i = 0; i < matches.length; i += 1) {
        for (let j = 0; j < 3; j += 1) {
          const currentMatchedTile = this.individualTile(matches[i][j]);
          const currentXPos = currentMatchedTile[1];
          const currentYPos = currentMatchedTile[2];
          console.log('[LAUREN] a matched tile: ', currentMatchedTile);

          // replace the tile
          const newTileType = this.getRandomTileType(1, 7);
          allTiles[currentXPos][currentYPos].tileType = newTileType;
          allTiles[currentXPos][currentYPos].tileIcon = this.getTileIcon(newTileType);

          // initialize game board again
          this.initializeAllTiles(allTiles);

          // repeat the process of checking for and handling matches
          this.handleAllMatches();
        }
      }
    },
    findAllHorizMatches() {
      const allHorizMatches = [];
      let currentMatchSet = [];
      const { allTiles } = this;
      let tileTypeToMatch;
      for (let i = 0; i < 8; i += 1) {
        currentMatchSet = [];
        tileTypeToMatch = allTiles[i][0].tileType;
        currentMatchSet.push(allTiles[i][0].tileId);
        for (let j = 1; j < 8; j += 1) {
          if (allTiles[i][j].tileType === tileTypeToMatch) {
            currentMatchSet.push(allTiles[i][j].tileId);
          } else {
            if (currentMatchSet.length >= 3) {
              allHorizMatches.push(currentMatchSet);
            }
            currentMatchSet = [];
            currentMatchSet.push(allTiles[i][j].tileId);
            tileTypeToMatch = allTiles[i][j].tileType;
          }
        }
      }

      return allHorizMatches;
    },
    findVertMatches() {
      const allVertMatches = [];
      let currentMatchSet = [];
      const { allTiles } = this;
      let tileTypeToMatch;
      for (let i = 0; i < 8; i += 1) {
        currentMatchSet = [];
        tileTypeToMatch = allTiles[0][i].tileType;
        currentMatchSet.push(allTiles[0][i].tileId);
        for (let j = 1; j < 8; j += 1) {
          if (allTiles[j][i].tileType === tileTypeToMatch) {
            currentMatchSet.push(allTiles[j][i].tileId);
          } else {
            if (currentMatchSet.length >= 3) {
              allVertMatches.push(currentMatchSet);
            }
            currentMatchSet = [];
            currentMatchSet.push(allTiles[j][i].tileId);
            tileTypeToMatch = allTiles[j][i].tileType;
          }
        }
      }

      return allVertMatches;
    },
  },
  watch: {
    timeToPerformSwap(swap) {
      if (swap === true) {
        this.performSwap();
      }
    },
  },
};
