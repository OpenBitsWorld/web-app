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
import configs from '@/configs/configs';

import LayoutMain from '@/views/layout/Main.vue';

export default {
  name: 'App',
  components: {
    LayoutMain,
  },
  async mounted() {
    // load OpenBits
    // get openbits from the registry
    const rs = await readContract(Vue.$arweave.node, configs().OPENBITS_REGISTRY);

    // get node packages
    const { OpenBits } = rs;
    Object.values(OpenBits.nodePackages).forEach((v) => {
      this.addOpenBit(v);
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
html {
  height:100%;
  body {
    height:100%;
  }
}
</style>
