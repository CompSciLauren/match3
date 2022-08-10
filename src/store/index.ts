import { createStore } from 'vuex';

export default createStore({
  state: {
    selectedTile: null,
    secondSelectedTile: null,
    timeToSwap: false,
    allTiles: [],
  },
  getters: {
    allTiles: (state) => state.allTiles,
    timeToSwap: (state) => state.timeToSwap,
    selectedTile: (state) => state.selectedTile,
    secondSelectedTile: (state) => state.secondSelectedTile,
    individualTile: (state) => (xPos: number) => (yPos: number) => state.allTiles[xPos][yPos],
  },
  mutations: {
    INIT_ALL_TILES(state, tiles) {
      // eslint-disable-next-line no-param-reassign
      state.allTiles = tiles;
    },
    RESET_TILES(state) {
      // eslint-disable-next-line no-param-reassign
      state.selectedTile = null;
      // eslint-disable-next-line no-param-reassign
      state.timeToSwap = false;
    },
    UPDATE_SELECTED_TILE(state, tile) {
      // one tile already selected, so prepare to swap the tiles
      if (state.selectedTile) {
        // eslint-disable-next-line no-param-reassign
        state.secondSelectedTile = tile;
        // eslint-disable-next-line no-param-reassign
        state.timeToSwap = true;
      } else {
        // eslint-disable-next-line no-param-reassign
        state.selectedTile = tile;
      }
    },
    SWAP_SELECTED_TILES(state) {
      // do stuff
      // eslint-disable-next-line no-param-reassign
      state.selectedTile = null;
      // eslint-disable-next-line no-param-reassign
      state.timeToSwap = false;
    },
  },
  actions: {
    resetAfterSwap({ commit }) {
      commit('RESET_TILES');
    },
    updateSelectedTile({ commit }, tile) {
      commit('UPDATE_SELECTED_TILE', tile);
    },
    swapSelectedTiles({ commit }, tiles) {
      commit('SWAP_SELECTED_TILES', tiles);
    },
    initializeAllTiles({ commit }, tiles) {
      commit('INIT_ALL_TILES', tiles);
    },
  },
  modules: {
  },
});
