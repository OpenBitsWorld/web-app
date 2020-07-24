const StoreOpenBits = {
  namespaced: true,
  state: () => ({
    openbits: [],
  }),
  mutations: {
    ADD_OPENBIT(state, payload) {
      state.openbits.push(payload.packageInfo);
    },
  },
  actions: {
    addOpenBit({ commit }, packageInfo) {
      commit('ADD_OPENBIT', { packageInfo });
    },
  },
  getters: {
    getOpenBits: (state) => state.openbits,
  },
};

export default StoreOpenBits;
