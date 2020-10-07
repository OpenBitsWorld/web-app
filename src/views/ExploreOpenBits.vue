<template>
  <b-container
    fluid
    class="mt-3 px-2 px-sm-2 px-md-3 px-lg-5">
    <!-- <b-card-group
      v-if="getOpenBits && getOpenBits.length !== 0"
      columns> -->
    <div v-if="getOpenBits && getOpenBits.length !== 0">
      <OpenBitCardMini
        v-for="openbit in openBitsList"
        :key="openbit.openbitAddress"
        :openbit="openbit"
      />
    </div>
    <!-- </b-card-group> -->
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
  /* mounted() {
    // get unique names
    const unique = [...new Set(this.getOpenBits.map((openBit) => openBit.name))];
    console.log(unique);
  }, */
  components: {
    OpenBitCardMini,
  },
  computed: {
    ...mapGetters({
      getOpenBits: 'openbits/getOpenBits',
    }),
    openBitsList() {
      if (this.getOpenBits) {
        const groupedOpenBits = this.groupBy(this.getOpenBits, (openbit) => openbit.name);
        const openBitsList = [];
        groupedOpenBits.forEach((o) => {
          openBitsList.push(o.pop());
        });
        return openBitsList;
      }
      return [];
    },
  },
};
</script>
