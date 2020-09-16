import { mapGetters } from 'vuex';

const utils = {
  methods: {
    isHomePage() {
      return this.$route.path === '/';
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
