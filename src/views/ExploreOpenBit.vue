<template>
  <b-container
    fluid
    class="mt-3 px-2 px-sm-2 px-md-3 px-lg-5">
    <h1>
      {{$route.params.id}}
    </h1>
    <div v-if="getOpenBits && getOpenBits.length !== 0">
      <!-- <OpenBitCardMini
        v-for="openbit in openBitsList"
        :key="openbit.openbitAddress"
        :openbit="openbit"
      /> -->
    </div>
    <h3 v-else>
      No one has published OpenBits yet! Be the first one
      <router-link to="publish-openbit">right now</router-link>
    </h3>
  </b-container>
</template>

<script>
import utils from '@/mixins/utils';
// import OpenBitCard from '@/components/OpenBitCard.vue';

export default {
  name: 'ExploreOpenBit',
  mixins: [utils],
  mounted() {
  },
  computed: {
  },
};
</script>
