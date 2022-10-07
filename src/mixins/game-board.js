import { mapGetters, mapActions } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'allTiles',
      'timeToPerformSwap',
      'firstSelectedTile',
      'secondSelectedTile',
      'individualTile',
      'individualTileByPosId',
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

      // swap their pos IDs (two tiles should swap everything except the tile pos ID which relates to board position)
      allTiles[xPos][yPos].tilePosId = tileOneId;
      allTiles[xPos2][yPos2].tilePosId = tileTwoId;

      // initialize game board again
      this.initializeAllTiles(allTiles);
    },
    handleAllMatches() {
      const horizMatches = this.findAllHorizMatches();
      const vertMatches = this.findAllVertMatches();
      const allMatches = [...horizMatches, ...vertMatches];

      console.log('[LAUREN] NEW MATCHES FOUND?:', allMatches, '\nTOTAL:', allMatches.length);

      if (allMatches.length > 0) {
        setTimeout(() => {
          console.log('[LAUREN] ====GETTING READY TO REFRESH BOARD====');
          this.clearMatches(allMatches);
        }, 5000);
      }

      return allMatches;
    },
    clearMatches(matches) {
      console.log('[LAUREN] CLEAR matches:', matches);
      const { allTiles } = this;
      for (let i = 0; i < matches.length; i += 1) {
        const currentMatchSize = matches[i].length;
        for (let j = 0; j < currentMatchSize; j += 1) {
          const currentMatchedTile = this.individualTile(matches[i][j]);
          const currentXPos = currentMatchedTile[1];
          const currentYPos = currentMatchedTile[2];

          // clear out the tile
          allTiles[currentXPos][currentYPos].tileType = -1;
          allTiles[currentXPos][currentYPos].tileIcon = '';

          // initialize game board again
          this.initializeAllTiles(allTiles);
        }
      }

      const listOfBlankTilesDescOrder = [].concat(...matches).sort((a, b) => b - a);
      this.replaceMatchedTiles(listOfBlankTilesDescOrder);
    },
    findUpperTile(tileId) {
      // const { allTiles } = this;
      const tile = this.individualTile(tileId);
      const upperTilePos = tile[0].tilePosId - 8;
      if (upperTilePos >= 0) {
        return this.individualTileByPosId(upperTilePos);
      }
      return [];
    },
    moveTile(tileToMove, emptyTileToReplace) {
      const { allTiles } = this;

      // TODO: Figure out why this isn't returning what I expect (getting -1)
      const tileOneIndex = this.findIndexIn2DArray(allTiles, tileToMove);
      const tileTwoIndex = this.findIndexIn2DArray(allTiles, emptyTileToReplace);

      console.log('[LAUREN] tileOneIndex:', tileOneIndex, '\ntileTwoIndex:', tileTwoIndex);

      // coords of first tile
      const xPos = tileOneIndex[0];
      const yPos = tileOneIndex[1];

      // coords of second tile
      const xPos2 = tileTwoIndex[0];
      const yPos2 = tileTwoIndex[1];

      console.log('[LAUREN] SWAP params:', tileToMove, xPos, yPos, emptyTileToReplace, xPos2, yPos2);
      this.swapTwoTiles(tileToMove, xPos, yPos, emptyTileToReplace, xPos2, yPos2);
    },
    replaceTile(emptyTileId) {
      console.log('[LAUREN] REPLACE tile with ID:', emptyTileId);
      const emptyTile = this.individualTile(emptyTileId);
      const nextTileAboveEmptyTile = this.findUpperTile(emptyTileId);
      if (nextTileAboveEmptyTile.length > 0) {
        // a tile spot on the board was found
        if (nextTileAboveEmptyTile.tileType === -1) {
          // is an empty tile
          // TODO: loop again and find next upper tile
        } else {
          // is not an empty tile
          this.moveTile(nextTileAboveEmptyTile, emptyTile);
        }
      } else {
        // this must be a tile on the top row
      }
      console.log('[LAUREN] nextRealTileAboveEmptyTile:', nextTileAboveEmptyTile);
    },
    replaceMatchedTiles(matches) {
      console.log('[LAUREN] REPLACE matches', matches);
      const tilesToReplace = matches;

      // while (tilesToReplace.length > 0) {
      this.replaceTile(tilesToReplace[0]);
      // }

      // initialize game board again
      // this.initializeAllTiles(allTiles);

      // repeat the process of checking for and handling matches
      // this.handleAllMatches();
    },
    // replaceMatchedTiles(matches) {
    //   // TODO: appears to work up to the point of this replacing step.
    //   // TODO: this replacing step tho introduces the frequent replacing of tiles when it should not.
    //   console.log('[LAUREN] REPLACE matches', matches);
    //   const { allTiles } = this;
    //   for (let i = 0; i < matches.length; i += 1) {
    //     const currentMatchSize = matches[i].length;
    //     for (let j = 0; j < currentMatchSize; j += 1) {
    //       const currentMatchedTile = this.individualTile(matches[i][j]);
    //       const currentXPos = currentMatchedTile[1];
    //       const currentYPos = currentMatchedTile[2];

    //       // replace the tile
    //       const newTileType = this.getRandomTileType(1, 7);
    //       allTiles[currentXPos][currentYPos].tileType = newTileType;
    //       allTiles[currentXPos][currentYPos].tileIcon = this.getTileIcon(newTileType);

    //       // initialize game board again
    //       this.initializeAllTiles(allTiles);

    //       // repeat the process of checking for and handling matches
    //       this.handleAllMatches();
    //     }
    //   }
    // },
    isATileTypeMatch(tile1, tile2) {
      return tile1.tileType === tile2.tileType;
    },
    isEndOfRow(rowPos) {
      return rowPos + 1 === 8;
    },
    addToMainListIfFullMatch(currentList, mainList) {
      if (currentList.length >= 3) {
        mainList.push(currentList);
      }
    },
    findAllHorizMatches() {
      const allHorizMatches = [];
      let currentMatchSet = [];
      const { allTiles } = this;
      for (let i = 0; i < 8; i += 1) {
        // add match if exists
        this.addToMainListIfFullMatch(currentMatchSet, allHorizMatches);

        // reset the currentMatchSet
        currentMatchSet = [];
        let tileToMatch = allTiles[i][0];
        if (tileToMatch.tileIcon !== '') {
          currentMatchSet.push(tileToMatch.tileId);
        }

        for (let j = 1; j < 8; j += 1) {
          const tileToCheck = allTiles[i][j];
          const isAMatch = this.isATileTypeMatch(tileToCheck, tileToMatch);
          const isEndOfRow = this.isEndOfRow(j);

          if (isAMatch) {
            if (tileToMatch.tileIcon !== '') {
              currentMatchSet.push(tileToCheck.tileId);
            }
          } else if (!isAMatch && !isEndOfRow) {
            // tile types not a match and not end of row
            this.addToMainListIfFullMatch(currentMatchSet, allHorizMatches);
            currentMatchSet = [];
            if (tileToMatch.tileIcon !== '') {
              currentMatchSet.push(tileToCheck.tileId);
            }
            tileToMatch = tileToCheck;
          } else if (!isAMatch && isEndOfRow && currentMatchSet.length >= 3) {
            // tile types not a match and is end of row
            allHorizMatches.push(currentMatchSet);
            currentMatchSet = [];
          }
        }
      }

      // add match if exists
      this.addToMainListIfFullMatch(currentMatchSet, allHorizMatches);

      return allHorizMatches;
    },
    findAllVertMatches() {
      const allVertMatches = [];
      let currentMatchSet = [];
      const { allTiles } = this;
      for (let i = 0; i < 8; i += 1) {
        // add match if exists
        this.addToMainListIfFullMatch(currentMatchSet, allVertMatches);

        // reset the currentMatchSet
        currentMatchSet = [];
        let tileToMatch = allTiles[0][i];
        if (tileToMatch.tileIcon !== '') {
          currentMatchSet.push(tileToMatch.tileId);
        }

        for (let j = 1; j < 8; j += 1) {
          const tileToCheck = allTiles[j][i];
          const isAMatch = this.isATileTypeMatch(tileToCheck, tileToMatch);
          const isEndOfRow = this.isEndOfRow(j);

          if (isAMatch) {
            if (tileToMatch.tileIcon !== '') {
              currentMatchSet.push(tileToCheck.tileId);
            }
          } else if (!isAMatch && !isEndOfRow) {
            // tile types not a match and not end of row
            this.addToMainListIfFullMatch(currentMatchSet, allVertMatches);
            currentMatchSet = [];
            if (tileToMatch.tileIcon !== '') {
              currentMatchSet.push(tileToCheck.tileId);
            }
            tileToMatch = tileToCheck;
          } else if (!isAMatch && isEndOfRow && currentMatchSet.length >= 3) {
            // tile types not a match and is end of row
            allVertMatches.push(currentMatchSet);
            currentMatchSet = [];
          }
        }
      }

      // add match if exists
      this.addToMainListIfFullMatch(currentMatchSet, allVertMatches);

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
