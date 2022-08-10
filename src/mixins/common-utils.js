export default {
  methods: {
    findIndexIn2DArray(allTiles, tileToFind) {
      let indexOfTileToFind;
      let currentArr;
      for (let i = 0; i < 8; i += 1) {
        currentArr = allTiles[i];
        indexOfTileToFind = currentArr.findIndex((tile) => tile.tileId === tileToFind.tileId);
        if (indexOfTileToFind !== -1) {
          return [i, indexOfTileToFind];
        }
      }
      return -1;
    },
  },
};
