<template>
  <div id="app"
    class="h-100">
    <LayoutMain />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapActions } from 'vuex';
import { readContract } from 'smartweave';
import config from '@/mixins/configs';

import LayoutMain from '@/views/layout/Main.vue';

export default {
  name: 'App',
  mixins: [config],
  components: {
    LayoutMain,
  },
  async beforeMount() {
    // console.log(config);
    // load OpenBits
    // get openbits from the registry
    const rs = await readContract(Vue.$arweave.node, this.config.OPENBITS_REGISTRY);

    // get the openbits
    const { OpenBits } = rs;
    Object.values(OpenBits.nodePackages).forEach((v) => {
      if (v.name !== '@theronin/solarweave') {
        this.addOpenBit(v);
      }
    });
  },
  methods: {
    ...mapActions({
      addOpenBit: 'openbits/addOpenBit',
    }),
  },
};
</script>

<style lang="scss">
@import './assets/styles/custom-theme.scss';

html {
  height:100%;
  body {
    height:100%;
    a {
      color: $multiverse-color;
    }
  }
}
</style>
