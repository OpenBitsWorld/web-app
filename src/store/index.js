import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import StoreUser from '@/store/user';
import StoreOpenBits from '@/store/openbits';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      paths: ['user'],
    }),
  ],
  modules: {
    user: StoreUser,
    openbits: StoreOpenBits,
  },
});
