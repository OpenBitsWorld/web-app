const StoreOpenBits = {
  namespaced: true,
  state: () => ({
    openbits: [],
  }),
  mutations: {
    ADD_OPENBIT(state, payload) {
      state.openbits.push(payload.packageInfo);
    },
    EMPTY_OPENBITS(state) {
      state.openbits = [];
    },
  },
  actions: {
    addOpenBit({ commit }, packageInfo) {
      commit('ADD_OPENBIT', { packageInfo });
    },
    emptyOpenBits({ commit }) {
      commit('EMPTY_OPENBITS');
    },
  },
  getters: {
    getOpenBits: (state) => state.openbits,
  },
};

export default StoreOpenBits;
