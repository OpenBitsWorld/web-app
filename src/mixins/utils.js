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
    getAllVersionsOfCurrentOpenBit() {
      if (this.$route.name === 'ExploreOpenBit') {
        const {
          name,
        } = parse(this.$route.params.id);
        const openBits = this.openBitsList().get(name);
        return openBits || [];
      }
      return [];
    },
    getCurrentOpenBit() {
      if (this.$route.name === 'ExploreOpenBit') {
        const {
          version,
        } = parse(this.$route.params.id);
        const allVersions = this.getAllVersionsOfCurrentOpenBit();
        const filtered = allVersions.filter((o) => o.version === version);
        return filtered[0];
      }
      return [];
    },
    getCurrentOpenBitAddress() {
      if (this.$route.name === 'ExploreOpenBit') {
        const current = this.getCurrentOpenBit();
        return current.pstId;
      }
      return this.config.OPENBITS_CBVAC_STATUS;
    },
    openBitsList() {
      if (this.getOpenBits.length) {
        return this.groupBy(this.getOpenBits, (openbit) => openbit.name);
      }
      return new Map();
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
