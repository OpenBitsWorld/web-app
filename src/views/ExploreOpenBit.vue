<template>
  <b-container
    fluid
    class="mt-3 px-2 px-sm-2 px-md-3 px-lg-5">
    <div v-if="getCurrentOpenBit()"
      class="readme-container"
      v-html="readme">
    </div>
    <div
      v-else>
      <h3 class="mt-5">
        We looked around the whole multiverse and we were
        not able to find the OpenBit you are looking for.
      </h3>
      <img
        src="../assets/openbit-not-found-animation.svg"
        class="why-image w-25 d-block mx-auto"/>
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
import pako from 'pako';
import untar from 'js-untar';
import showdown from 'showdown';
// import OpenBitCard from '@/components/OpenBitCard.vue';

export default {
  name: 'ExploreOpenBit',
  mixins: [utils],
  mounted() {
    fetch(`https://arweave.net/${this.getCurrentOpenBit().dataId}`)
      .then(async (d) => {
        try {
          const packBuffer = await d.arrayBuffer();
          const uintPackArray = new Uint8Array(packBuffer);
          const extracted = pako.inflate(uintPackArray);
          untar(extracted.buffer).then((files) => {
            const readme = files.filter((file) => file.name === 'package/README.md');
            if (readme) {
              const converter = new showdown.Converter();
              const html = converter.makeHtml(readme[0].readAsString('utf8'));
              this.readme = html;
            } else {
              this.readme = `
                <h1>${this.$route.params.id}</h1>
                <p>
                  We looked around the whole multiverse and we were not able to find a readme for this package
                </p>
              `;
            }
          });
        } catch (err) {
          this.readme = `
            <h1>${this.$route.params.id}</h1>
            <p>
              We looked around the whole multiverse and we were not able to find a readme for this package
            </p>
          `;
        }
      });
  },
  data() {
    return {
      readme: '',
    };
  },
  computed: {
  },
};
</script>

<style lang="scss" scoped>
  .explore-openbit-link {
  }
</style>
