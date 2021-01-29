<template>
  <b-container
    class="mt-3 px-3">
    <h5>{{$route.params.id}}</h5>
    <div v-if="getCurrentOpenBit()"
      class="readme-container">
      <div>
        <b-button v-b-toggle.collapse-1 class="mt-2" variant="main-color">
          Shares info & invest ☰
        </b-button>
        <b-collapse id="collapse-1" class="mt-2">
          <OpenBitCard
            :openbit="getCurrentOpenBit()"
          />
        </b-collapse>
      </div>
      <div
        v-if="readme"
        v-html="readme">
      </div>
      <div v-else>
        <h3 class="mt-5">
          Diving the multiverse to find the readme of this OpenBit ...
        </h3>
        <img
          src="../assets/openbit-not-found-animation.svg"
          class="openbit-not-found-animation d-block mx-auto"/>
      </div>
    </div>
    <div
      class="readme-not-found-container"
      v-else>
      <h3 class="mt-5">
        We searched around the whole multiverse and we were
        not able to find the OpenBit you are looking for.
      </h3>
      <img
        src="../assets/openbit-not-found-animation.svg"
        class="openbit-not-found-animation d-block mx-auto"/>
      <p>
        Search something else that can serve your scope in the
        <router-link
          class="explore-openbit-link"
          :to="{name: 'ExploreOpenBits'}">list of published OpenBits.</router-link>
      </p>
    </div>
  </b-container>
</template>

<script>
import { mapGetters } from 'vuex';
import utils from '@/mixins/utils';
import OpenBitCard from '@/components/OpenBitCard.vue';

export default {
  name: 'ExploreOpenBit',
  mixins: [utils],
  components: {
    OpenBitCard,
  },
  watch: {
    async $route(to) {
      if (!to.hash) {
        this.readme = null;
        this.readme = await this.retrieveCurrentOpenBitReadme();
      }
    },
    async getOpenBits() {
      this.readme = null;
      this.readme = await this.retrieveCurrentOpenBitReadme();
    },
  },
  async mounted() {
    window.scroll(0, 0);
    this.readme = null;
    this.readme = await this.retrieveCurrentOpenBitReadme();
  },
  data() {
    return {
      readme: null,
    };
  },
  computed: {
    ...mapGetters({
      getOpenBits: 'openbits/getOpenBits',
    }),
  },
};
</script>

<style lang="scss">
  @import '../assets/styles/custom-theme.scss';
  .openbit-not-found-animation{
    width: 30%;
  }
  .readme-container {
    pre {
      padding:1%;
      width:90%;
      margin-left: 1%;
      background-color:$secondary-color;
      border:1px solid $multiverse-color;
    }

  }
</style>
