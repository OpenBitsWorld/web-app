<template>
  <b-container class="mt-3">
    <b-card-group
      v-if="userOpenBits.length !== 0"
      deck>
      <OpenBitCard
        v-for="openbit in userOpenBits"
        :key="openbit.openbitAddress"
        :openbit="openbit"
      />
    </b-card-group>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import OpenBitCard from '@/components/OpenBitCard.vue';

export default {
  name: 'UserOpenBits',
  components: {
    OpenBitCard,
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
