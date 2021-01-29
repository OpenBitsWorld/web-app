<template>
  <b-container class="mt-3">
    <b-card-group
      v-if="userOpenBits.length === 0"
      deck>
      <OpenBitCard
        :openbit="getCurrentOpenBit()"
      />
    </b-card-group>
    <h3 v-else>
      Error!
    </h3>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import OpenBitCard from '@/components/OpenBitCard.vue';
import utils from '@/mixins/utils';

export default {
  name: 'ExploreOpenBitShares',
  mixins: [utils],
  components: {
    OpenBitCard,
  },
  async mounted() {
    window.scroll(0, 0);
    this.openbit = this.getCurrentOpenBit();
    console.log(this.openbit);
  },
  computed: {
    ...mapGetters({
      getOpenBits: 'openbits/getOpenBits',
      defaultARWallet: 'user/getDefaultARWallet',
    }),
    userOpenBits() {
      const allOpenObits = this.getOpenBits.filter((ob) => (
        ob.ownedBy === this.defaultARWallet.address
      ));
      return allOpenObits;
    },
  },
};
</script>
