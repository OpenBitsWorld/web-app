import parse from 'parse-package-name';
import { mapGetters } from 'vuex';
import config from '@/mixins/configs';

const utils = {
  mixins: [
    config,
  ],
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
    isActivePage(page) {
      return this.$route.path === page;
    },
    getCurrentPage() {
      return this.$route.path;
    },
    getCurrentOpenBit() {
      if (this.$route.name === 'ExploreOpenBit') {
        const {
          name,
          version,
        } = parse(this.$route.params.id);
        const openBit = this.openBitsList().get(name).filter((o) => o.version === version);
        return openBit[0];
      }
      return [];
    },
    getCurrentOpenBitAddress() {
      if (this.$route.name === 'ExploreOpenBit') {
        return this.getCurrentOpenBit().pstId;
      }
      return this.config.OPENBITS_CBVAC_STATUS;
    },
    openBitsList() {
      if (this.getOpenBits) {
        return this.groupBy(this.getOpenBits, (openbit) => openbit.name);
      }
      return [];
    },
  },

  computed: {
    ...mapGetters({
      defaultARWallet: 'user/getDefaultARWallet',
      getOpenBits: 'openbits/getOpenBits',
    }),
    isLogged() {
      return this.defaultARWallet;
    },
  },
};

export default utils;
