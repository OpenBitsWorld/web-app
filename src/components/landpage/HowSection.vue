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
              OpenBits relies on the <a href="https://www.arweave.org/"
                target="_blank"
                class="text-secondary-color">Arweave Blockchain</a> and it uses
                its
              <a
                href="https://medium.com/@arweave/profit-sharing-tokens-a-new-incentivization-mechanism-for-an-open-web-1f2532411d6e"
                target="_blank">SmartWeave Profit Sharing Tokens</a>.
              By combining these two technologies, OpenBits allows developers to
              be rewarded when other developers install their packages, and it allows developers
              <b class="text-main-color">to split their rewards</b> with other people.
              And then, as soon as developers reach their rewards target,
              <b class="text-main-color">
                their creations are automatically donated to the MULTIVERSE
              </b>.
              All of this in
              <b class="text-main-color">just a few simple steps:</b>
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
                <h3 class="tabs-inner-steps my-3">
                  <span class="tabs-inner-steps-number">1.</span>
                  Publish your package on OpenBits and choose your target amount of rewards;
                </h3>
                <h3 class="tabs-inner-steps my-3">
                  <span class="tabs-inner-steps-number">2.</span>
                  A Profit Sharing Token for your package will be created automatically;
                </h3>
                <h3 class="tabs-inner-steps my-3">
                  <span class="tabs-inner-steps-number">3.</span>
                  You will have 100 shares of your package, each one with a value of:
                  <b>
                    (your rewards target / 100).
                  </b>
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
                  <span class="tabs-inner-steps-number">1.</span>
                  Choose if you want to split 20 shares in 4 stocks
                  containing 5 shares each;
                </h3>
                <h3 class="tabs-inner-steps my-3">
                  <span class="tabs-inner-steps-number">2.</span>
                  If you do so, people will be able to give you
                  a convenient amount of AR for those 4 stocks of shares;
                </h3>
                <h3 class="tabs-inner-steps my-3">
                  <span class="tabs-inner-steps-number">3.</span>
                  People that get stocks of shares of your package, could
                  be rewarded with a known amount of AR as long as your
                  package got installed.
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
                  <span class="tabs-inner-steps-number">1.</span>
                  Make sure that developers know that your
                  package is published on OpenBits;
                </h3>
                <h3 class="tabs-inner-steps my-3">
                  <span class="tabs-inner-steps-number">2.</span>
                  When developers install the package by means of
                  OpenBits, <b>they pay a small fee of 0.02 AR</b>.
                  0.01 AR goes to OpenBits, and <b>0.01 AR goes to you</b>;
                </h3>
                <h3 class="tabs-inner-steps my-3">
                  <span class="tabs-inner-steps-number">3.</span>
                  Every time the package got installed a number of time equal to
                  <b>
                    your rewards target,
                  </b> 1 of your shares will be given to the MULTIVERSE, until you will
                  own just 1 share. When (and if) that happens, shares in the 4 stocks
                  will be given to the MULTIVERSE with the same mechanism.
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
              And Then? The more your package is installed,
              the more shares of it are donated to the MULTIVERSE!</h1>
            <p class="list-intro to-be-animated"
              v-animate-onscroll="{down: 'animated fadeInDown'}">
              When, and if, <b>99 shares of your package will be assigned to the MULTIVERSE</b>,
              you will have reached your rewards target, and people that acquired the 4 stocks of 5
              shares will have had a return on the AR
              they invested in rewarding your packages early,
              and so in acquiring shares' stocks. So, <b>then and forever</b>,
              you'll still have <b>1 share of your package</b> and the
              <b>MULTIVERSE will have 99 shares of your package</b>.
            </p>
            <h5 class="text-multiverse-color">AND THEN IT IS THE MULTIVERSE TURN!</h5>
            <p>
              The MULTIVERSE is a <b>placeholder user that in a specific moment
              represents one user of your package</b>. When and if your package will be
              installed again a number of times equal to <b>your rewards target,</b> the
              users represented by the multivers will get a reward of AR equal to the price
              of a share, and a new user will be raflled of to be represented by the MULTIVERSE.
              After 99 different users will be raffled, it is again your turn to be
              rewarded for installations of your packages. And so on, <b>until all the users of
              your package will have earn something</b>. And then the game restarts!
              <a target="_blank" href="https://gitlab.com/cervoneluca/openbits">Read more
              on the OpenBits green paper here</a>.
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
  font-size: 1.2rem;
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
      font-size: 1.3rem;
      .tabs-inner-steps-number {
        font-weight: 900;
        font-size: 1.4rem;
      }
    }
  }
}
</style>
