<template>
  <section id="how-section" class="pb-5">
    <b-container
      fluid
      class="px-3 px-sm-3 px-md-4 px-lg-5 how">
      <b-row>
        <b-col
          sm="12"
          md="12"
          lg="12">
            <h1
            class="section-title mb-4 text-multiverse-color">
            How OpenBits Works?</h1>
            <p class="list-intro to-be-animated"
              v-animate-onscroll="{down: 'animated fadeInDown'}">
inteintegra                OpenBits is built on <a href="https://www.arweave.org/"
                target="_blank"
                class="text-secondary-color">The Arweave</a>,
                a new type of decentralized storage using blockchain technology.
                Communities built on the Arweave, such as OpenBits, use
                <a href="https://coinmarketcap.com/currencies/arweave/"
                  target="_blank">AR</a> and
                <a
                  href="https://medium.com/@arweave/profit-sharing-tokens-a-new-incentivization-mechanism-for-an-open-web-1f2532411d6e"
                  target="_blank">Profit Sharing Tokens (PSTs)</a>
                as a way to compensate contributors. Now you can access
                revenue early from your contributions.
                As soon as developers reach the reward target they set out,
                their creations are automatically donated to the MULTIVERSE.
                All of this in just a few simple steps:
            </p>
        </b-col>
      </b-row>
      <b-tabs
        pills
        justified
        v-model="tabIndex"
        class="my-5"
        id="how-tabs">
        <b-tab class="pt-5" title="Publish" :title-link-class="linkClass(0)" active>
          <b-card-text>
            <b-row>
              <b-col cols="12" sm="12" md="3" lg="4">
                <img
                  src="../../assets/how-section-animate-1.svg"
                  class="why-image w-75 d-block mx-auto"/>
              </b-col>
              <b-col cols="12" sm="12" md="9" lg="8" align-self="center">
                <h3 class="tabs-inner-steps my-5">
                  <span class="tabs-inner-steps-number">1.</span>
                  Publish your package on OpenBits and choose your target amount of rewards.
                  A PST for your package
                  will be created and you will be awarded with 100 shares.Together,
                  these 100 shares make up the value of your rewards target.
                </h3>
              </b-col>
            </b-row>
          </b-card-text>
        </b-tab>
        <b-tab class="pt-5" title="Split" :title-link-class="linkClass(1)">
          <b-card-text>
            <b-row>
              <b-col cols="12" sm="12" md="3" lg="4">
                <img
                  src="../../assets/how-section-animate-2.svg"
                  class="why-image w-75 d-block mx-auto"/>
              </b-col>
              <b-col cols="12" sm="12" md="9" lg="8" align-self="center">
                <h3 class="tabs-inner-steps my-3">
                  <span class="tabs-inner-steps-number">2.</span>
                  You have the ability to split 4 packs of 5 shares (20 shares total)
                  to reserve for investors at a discounted price.
                  This will incentivize larger investments and simplify financing.
                </h3>
              </b-col>
            </b-row>
          </b-card-text>
        </b-tab>
        <b-tab class="pt-5" title="Share" :title-link-class="linkClass(2)">
          <b-card-text>
            <b-row>
              <b-col cols="12" sm="12" md="3" lg="4">
                <img
                  src="../../assets/how-section-animate-3.svg"
                  class="why-image w-75 d-block mx-auto"/>
              </b-col>
              <b-col cols="12" sm="12" md="9" lg="8" align-self="center">
                <h3 class="tabs-inner-steps my-3">
                  <span class="tabs-inner-steps-number">3.</span>
                  Whenever your package is installed, users pay a small fee of 0.02 AR. 0.01
                  Ar goes to OpenBits and 0.01 Ar goes to you.
                  When the revenue made from installations
                  is equal to 1 share, it will be taken from the developer or investor
                  and be given back to the community.
                  Once the target reward set by the developer is reached,
                  the creator will own 1 share and 99 will be donated to the MULTIVERSE.
                </h3>
              </b-col>
            </b-row>
          </b-card-text>
        </b-tab>
      </b-tabs>
      <b-row>
        <b-col
          cols="12"
          sm="12"
          md="8"
          lg="9">
            <h1
              class="section-title mb-4 text-multiverse-color">
              Spread the Wealth Among the MULTIVERSE!</h1>
            <p class="list-intro to-be-animated"
              v-animate-onscroll="{down: 'animated fadeInDown'}">
              With OpenBits, the users of your package will
              also be rewarded! Once you have reached your
              reward target and the 99 shares have been assigned to the MULTIVERSE,
              the process starts all over again. Everytime the rewards target
              is reached a subsequent time after the first,
              the developer and 99 random users will be rewarded the value of 1 share.
            </p>
        </b-col>
        <b-col
          cols="12"
          sm="12"
          md="4"
          lg="3"
          class="px-3">
          <img
            src="../../assets/how-section-animate-4.svg"
            class="why-image d-block mx-auto"/>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import config from '@/mixins/configs';

export default {
  name: 'LandPageHowSection',
  mixins: [config],
  data() {
    return {
      tabIndex: 0,
    };
  },
  methods: {
    linkClass(idx) {
      if (this.tabIndex === idx) {
        return ['bg-secondary-color', 'mx-2'];
      }
      return ['bg-main-color', 'text-white', 'mx-2'];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/custom-theme.scss';

#how-section {
  font-size: 1.4rem;
  text-align:justify;
  .how {
    a {
      border-bottom: 2px solid $secondary-color;
      color: $secondary-color;
      font-weight: 900;
      &:hover{
        color:$secondary-color!important;
        text-decoration: none!important;
      }
      &:visited{
        text-decoration: none;
      }
    }
    .section-title{
      width: 100%;
      text-align:center;
      font-weight: 900;
    }
    .to-be-animated {
      transition-duration: 800ms;
      &:not(.animated) {
        opacity: 0;
      }
    }
    .tabs-inner-steps {
      font-size: 1.7rem;
      text-align: justify;
      .tabs-inner-steps-number {
        font-weight: 900;
      }
    }
  }
}
</style>
