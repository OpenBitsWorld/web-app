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
    <h3 v-else>
      You didn't published any OpenBit! Publish your first one
      <router-link to="publish-openbit">right now</router-link>
    </h3>
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
