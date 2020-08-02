<template>
  <b-container class="mt-3">
    <b-card-group
      v-if="getOpenBits && getOpenBits.length !== 0"
      deck>
      <OpenBitCard
        v-for="openbit in getOpenBits"
        :key="openbit.openbitAddress"
        :openbit="openbit"
      />
    </b-card-group>
    <h3 v-else>
      No one has published OpenBits yet! Be the first one
      <router-link to="publish-openbit">right now</router-link>
    </h3>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import OpenBitCard from '@/components/OpenBitCard.vue';

export default {
  name: 'ExploreOpenBits',
  components: {
    OpenBitCard,
  },
  computed: {
    ...mapGetters({
      getOpenBits: 'openbits/getOpenBits',
    }),
  },
};
</script>
