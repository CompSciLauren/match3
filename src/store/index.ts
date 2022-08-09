import { createStore } from 'vuex';

export default createStore({
  state: {
    selectedTile: null,
  },
  getters: {
    selectedTile: (state) => state.selectedTile,
  },
  mutations: {
    UPDATE_SELECTED_TILE(state, payload) {
      // eslint-disable-next-line no-param-reassign
      state.selectedTile = payload;
    },
  },
  actions: {
    updateSelectedTile({ commit }, tile) {
      commit('UPDATE_SELECTED_TILE', tile);
    },
  },
  modules: {
  },
});
