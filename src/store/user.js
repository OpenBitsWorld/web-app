const StoreUser = {
  namespaced: true,
  state: () => ({
    defaultARWallet: null,
    arBalance: 0,
    name: null,
    surname: null,
    email: null,
    packages: [],
  }),
  mutations: {
    SET_DEFAULT_AR_WALLET(state, payload) {
      state.defaultARWallet = payload.wallet;
    },
    ADD_USER_PACKAGE(state, payload) {
      state.packages.push(payload.packageInfo);
    },
  },
  actions: {
    setARDefaultWallet({ commit }, wallet) {
      commit('SET_DEFAULT_AR_WALLET', { wallet });
    },
    addUserPackage({ commit }, packageInfo) {
      commit('ADD_USER_PACKAGE', { packageInfo });
    },
  },
  getters: {
    getDefaultARWallet: (state) => state.defaultARWallet,
    getUserPackages: (state) => state.packages,
  },
};

export default StoreUser;
