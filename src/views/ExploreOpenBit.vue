<template>
  <b-container
    fluid
    class="mt-3 px-0 px-sm-0 px-md-1 px-lg-1">
    <h5>{{$route.params.id}}</h5>
    <div v-if="getCurrentOpenBit()"
      class="readme-container">
      <div
        v-if="readme"
        v-html="readme">
      </div>
      <div v-else>
        <b-card
          border-variant="white">
          <b-skeleton
            v-for="n in 25"
            :key="`skeleton-template-${n}`"
            animation="wave"
            width="100%"
            class="mt-3"
            variant="multiverse-color">
          </b-skeleton>
        </b-card>
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
import utils from '@/mixins/utils';

export default {
  name: 'ExploreOpenBit',
  mixins: [utils],
  watch: {
    async $route(to) {
      if (!to.hash) {
        this.readme = null;
        this.readme = await this.retrieveCurrentOpenBitReadme();
      }
    },
  },
  async mounted() {
    this.readme = null;
    this.readme = await this.retrieveCurrentOpenBitReadme();
  },
  data() {
    return {
      readme: null,
    };
  },
  computed: {
  },
};
</script>

<style lang="scss">
  @import '../assets/styles/custom-theme.scss';
  .readme-not-found-container {
    width:90%;
    margin-left: auto;
    margin-right: auto;
    .openbit-not-found-animation{
      width: 30%;
    }
  }
  .readme-container {
    width:90%;
    margin-left: auto;
    margin-right: auto;
    pre {
      padding:1%;
      width:90%;
      margin-left: 1%;
      background-color:$secondary-color;
      border:1px solid $multiverse-color;
    }

  }
</style>
