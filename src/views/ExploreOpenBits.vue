<template>
  <b-container class="mt-3 px-3">
    <div v-if="openBitsToSearch && openBitsToSearch.length !== 0">
      <model-list-select
        :list="openBitsToSearch"
        v-model="searchedItem"
        option-value="name"
        :custom-text="searchDescription"
        placeholder="search package"
      >
      </model-list-select>
    </div>
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
import { ModelListSelect } from 'vue-search-select';

export default {
  name: 'ExploreOpenBits',
  mixins: [utils],
  mounted() {
    window.scroll(0, 0);
  },
  data() {
    return {
      searchedItem: '',
    };
  },
  components: {
    OpenBitCardMini,
    ModelListSelect,
  },
  computed: {
    ...mapGetters({
      getOpenBits: 'openbits/getOpenBits',
    }),
    openBitsToSearch() {
      const list = [];
      this.openBitsList().forEach((element) => {
        if (element[element.length - 1].name) list.push(element[element.length - 1]);
      });
      return list;
    },
  },
  watch: {
    searchedItem(actual) {
      console.log(actual);
      this.$router.push(`explore-openbit/${encodeURIComponent(`${actual}`)}`);
    },
  },
  methods: {
    searchDescription(item) {
      return `${item.name} - ${item.version} - ${item.type}`;
    },
  },
};
</script>
