<template>
  <b-container class="mt-3">
    <b-card-group
      deck>
      <OpenBitCard
        v-for="openbit in getOpenBits"
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
