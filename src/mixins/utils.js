import { mapGetters } from 'vuex';

const utils = {
  methods: {
    isHomePage() {
      return this.$route.path === '/';
    },
    groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      return map;
    },
  },
  computed: {
    ...mapGetters({
      defaultARWallet: 'user/getDefaultARWallet',
    }),
    isLogged() {
      return this.defaultARWallet;
    },
  },
};

export default utils;
