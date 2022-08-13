import { createStore } from 'vuex';

export default createStore({
  state: {
    allTiles: [],
    firstSelectedTile: null,
    secondSelectedTile: null,
    timeToPerformSwap: false,
  },
  getters: {
    allTiles: (state) => state.allTiles,
    firstSelectedTile: (state) => state.firstSelectedTile,
    secondSelectedTile: (state) => state.secondSelectedTile,
    timeToPerformSwap: (state) => state.timeToPerformSwap,
    individualTile: (state) => (xPos: number) => (yPos: number) => state.allTiles[xPos][yPos],
  },
  mutations: {
    INIT_ALL_TILES(state, tiles) {
      state.allTiles = tiles;
    },
    RESET_TILES(state) {
      state.firstSelectedTile = null;
      state.timeToPerformSwap = false;
    },
    UPDATE_SELECTED_TILE(state, tile) {
      // one tile already selected, so prepare to swap the tiles
      if (state.firstSelectedTile) {
        state.secondSelectedTile = tile;
        state.timeToPerformSwap = true;
      } else {
        state.firstSelectedTile = tile;
      }
    },
  },
  actions: {
    initializeAllTiles({ commit }, tiles) {
      commit('INIT_ALL_TILES', tiles);
    },
    resetAfterSwap({ commit }) {
      commit('RESET_TILES');
    },
    updateSelectedTile({ commit }, tile) {
      commit('UPDATE_SELECTED_TILE', tile);
    },
  },
  modules: {
  },
});
