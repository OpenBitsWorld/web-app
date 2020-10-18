<template>
  <b-container
    fluid
    class="mt-3 px-2 px-sm-2 px-md-3 px-lg-5">
    <div v-if="getOpenBits && getOpenBits.length !== 0">
      <OpenBitCardMini
        v-for="openbit in openBitsList()"
        :key="openbit[0]"
        :openbits="openbit[1]"
      />
    </div>
    <h3 v-else>
      No one has published OpenBits yet! Be the first one
      <router-link to="publish-openbit">right now</router-link>
    </h3>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import utils from '@/mixins/utils';
import OpenBitCardMini from '@/components/OpenBitCardMini.vue';

export default {
  name: 'ExploreOpenBits',
  mixins: [utils],
  components: {
    OpenBitCardMini,
  },
  computed: {
    ...mapGetters({
      getOpenBits: 'openbits/getOpenBits',
    }),
  },
};
</script>
