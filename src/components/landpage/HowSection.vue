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
                target="_blank"
                class="text-main-color">SmartWeave Profit Sharing Tokens</a>.
              By combining these two technologies, OpenBits allows developers to
              be rewarded when other developers install their packages, and it allows developers
              <b class="text-main-color">to share their rewards</b> with other people.
              And then, as soon as developers reaches their rewards target,
              <b class="text-main-color">
                their creations are automatically donated to the MULTIVERSE
              </b>.
              All of this in
              <b class="text-main-color">just three simple steps:</b>
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
              <b-col cols="12" sm="12" md="9" lg="8">
                <b-list-group>
                  <b-list-group-item>
                    Upload your package on OpenBits and choose your target amount of rewards;
                  </b-list-group-item>
                  <b-list-group-item>
                    A Profit Sharing Token for your package will be created automatically;
                  </b-list-group-item>
                  <b-list-group-item>
                    You'll have 100 shares of your package, each one with a value of:
                    <b>
                    (your target profit / 100).
                    </b>
                  </b-list-group-item>
                </b-list-group>
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
              <b-col cols="12" sm="12" md="9" lg="8">
                <b-list-group>
                  <b-list-group-item>
                    Upload your package on OpenBits and choose your target amount of rewards;
                  </b-list-group-item>
                  <b-list-group-item>
                    A Profit Sharing Token for your package will be created automatically;
                  </b-list-group-item>
                  <b-list-group-item>
                    You'll have 100 shares of your package, each one with a value of:
                    <b>
                    (your target profit / 100).
                    </b>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
            </b-row>
          </b-card-text>
              <!-- <b-card-text>
                <b-list-group>
                  <b-list-group-item>
                    If you want, you can allow <b>4</b> people to buy
                    <b>5</b> shares for each of your package;
                  </b-list-group-item>
                  <b-list-group-item>
                    If you do so, investors will be able to buy shares of
                    your package for a <b>convenient price</b> for them
                    and <b>you will earn some AR immediately</b>;
                  </b-list-group-item>
                  <b-list-group-item>
                    If investors buy shares of your package, they will
                    have a <b>known return on their investment</b>
                    as soon <b>as you reach your target profit</b>.
                  </b-list-group-item>
                </b-list-group>
              </b-card-text> -->
        </b-tab>
        <b-tab class="pt-5" title="Share" :title-link-class="linkClass(2)">
          <b-card-text>
            <b-row>
              <b-col cols="12" sm="12" md="3" lg="4">
                <img
                  src="../../assets/how-section-animate-3.svg"
                  class="why-image w-75 d-block mx-auto"/>
              </b-col>
              <b-col cols="12" sm="12" md="9" lg="8">
                <b-list-group>
                  <b-list-group-item>
                    Upload your package on OpenBits and choose your target amount of rewards;
                  </b-list-group-item>
                  <b-list-group-item>
                    A Profit Sharing Token for your package will be created automatically;
                  </b-list-group-item>
                  <b-list-group-item>
                    You'll have 100 shares of your package, each one with a value of:
                    <b>
                    (your target profit / 100).
                    </b>
                  </b-list-group-item>
                </b-list-group>
              </b-col>
            </b-row>
          </b-card-text>
              <!-- <b-card-text>
                <b-list-group>
                  <b-list-group-item>
                    Make sure that developers know that your
                    package is published <b>ALSO</b> on OpenBits;
                  </b-list-group-item>
                  <b-list-group-item>
                    When developers install the package by means of
                    OpenBits, <b>they pay a small fee of 0.02 AR</b>.
                    0.01 AR goes to OpenBits, and <b>0.01 AR goes to you</b>;
                  </b-list-group-item>
                  <b-list-group-item>
                    Every time you earn an amount of AR <b>equal to the price of
                    a share</b>, a share of your package <b>will be given to
                    the MULTIVERSE</b>. Once you have only one share, <b>shares
                    of investors will be given to the MULTIVERSE</b>.
                  </b-list-group-item>
                </b-list-group>
              </b-card-text> -->
        </b-tab>
      </b-tabs>

<!--    <b-row>
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
                target="_blank"
                class="text-main-color">SmartWeave Profit Sharing Tokens</a>.
              By combining these two technologies, OpenBits allows developers to
              be rewarded when other developers install their packages, and it allows developers
              <b class="text-main-color">to share their rewards</b> with other people.
              And then, as soon as developers reaches their rewards target,
              <b class="text-main-color">
                their creations are automatically donated to the MULTIVERSE
              </b>.
              All of this in
              <b class="text-main-color">just three simple steps:</b>
            </p>
        </b-col>
      </b-row>
      <b-container>
        <b-row>
          <b-col
            lg="4"
            class="to-be-animated mt-5 list"
            v-animate-onscroll="{down: 'animated bounceInRight'}">
            <b-card
              bg-variant="danger"
              text-variant="main-color"
              header-tag="header">
              <template
                v-slot:header>
                <h3 class="text-center text-white">1. Upload your package</h3>
              </template>
              <b-card-text>
                <b-list-group>
                  <b-list-group-item>
                    Upload your package on OpenBits and choose your target amount of rewards;
                  </b-list-group-item>
                  <b-list-group-item>
                    A Profit Sharing Token for your package will be created automatically;
                  </b-list-group-item>
                  <b-list-group-item>
                    You'll have 100 shares of your package, each one with a value of:
                    <b>
                    (your target profit / 100).
                    </b>
                  </b-list-group-item>
                </b-list-group>
              </b-card-text>
            </b-card>
          </b-col>
          <b-col
            lg="4"
            class="to-be-animated mt-5 list"
            v-animate-onscroll="{down: 'animated bounceInRight'}">
            <b-card
              bg-variant="fourth-color"
              text-variant="main-color"
              header-tag="header">
              <template
                v-slot:header>
                <h3 class="text-center text-white">2. Create Investments Plans</h3>
              </template>
              <b-card-text>
                <b-list-group>
                  <b-list-group-item>
                    If you want, you can allow <b>4</b> people to buy
                    <b>5</b> shares for each of your package;
                  </b-list-group-item>
                  <b-list-group-item>
                    If you do so, investors will be able to buy shares of
                    your package for a <b>convenient price</b> for them
                    and <b>you will earn some AR immediately</b>;
                  </b-list-group-item>
                  <b-list-group-item>
                    If investors buy shares of your package, they will
                    have a <b>known return on their investment</b>
                    as soon <b>as you reach your target profit</b>.
                  </b-list-group-item>
                </b-list-group>
              </b-card-text>
            </b-card>
          </b-col>
          <b-col
            lg="4"
            class="to-be-animated mt-5 list"
            v-animate-onscroll="{down: 'animated bounceInRight'}">
            <b-card
              bg-variant="third-color"
              class="main-color"
              header-tag="header">
              <template
                v-slot:header>
                <h3 class="text-center text-white">3. Wait for installations</h3>
              </template>
              <b-card-text>
                <b-list-group>
                  <b-list-group-item>
                    Make sure that developers know that your
                    package is published <b>ALSO</b> on OpenBits;
                  </b-list-group-item>
                  <b-list-group-item>
                    When developers install the package by means of
                    OpenBits, <b>they pay a small fee of 0.02 AR</b>.
                    0.01 AR goes to OpenBits, and <b>0.01 AR goes to you</b>;
                  </b-list-group-item>
                  <b-list-group-item>
                    Every time you earn an amount of AR <b>equal to the price of
                    a share</b>, a share of your package <b>will be given to
                    the MULTIVERSE</b>. Once you have only one share, <b>shares
                    of investors will be given to the MULTIVERSE</b>.
                  </b-list-group-item>
                </b-list-group>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-container> -->
      <b-row>
        <b-col
          sm="12"
          md="12"
          lg="12">
            <h1
              class="section-title mb-4 text-multiverse-color">
              And Then? As long as your OpenBit is installed,
              it will be donated to the multiverse!</h1>
            <p class="list-intro to-be-animated"
              v-animate-onscroll="{down: 'animated fadeInDown'}">
              When the <b>99% of the shares will be assigned to the MULTIVERSE</b>,
              you will have reached your target profit, and your investors will
              have reached their expected ROI.
              So, <b>then and forever</b>, you'll still have <b>1 share of your package</b>
              and the <b>MULTIVERSE will have 99 shares of your package</b>. Thus, everytime
              a developer install your package, <b>you'll earn 0.001 AR</b> and the <b>MULTIVERSE
              will earn 0.099 AR</b>. The MULTIVERSE is a <b>
                placeholder user that in a specific moment
              represents one user of your package</b>. When your package will generate again
              a <b>profit equal to the price of one of its shares</b>, a new user will be raflled
              of to be represented by the MULTIVERSE. And so on, <b>until all the users of
              your package will have earn something</b>. And then the game restarts!
              <a target="_blank" href="https://gitlab.com/cervoneluca/openbits">Read more
              on the OpenBits green paper here</a>.
            </p>
            <img
            src="../../assets/how-section-animate-4.svg"
            class="why-image w-50 w-lg-25 w-sm-50 d-block mx-auto"/>
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
    #how-tabs {
      .how-nav-link {
        background-color: yellow!important;
        &:hover{
          background-color:green!important;
        }
      }
    }
    a {
      border-bottom: 2px solid $secondary-color;
      color: $secondary-color;
      font-weight: 900;
      &:hover{
        color:white!important;
        text-decoration: none;
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
    .list-intro{
      b {
        font-weight: 900;
      }
    }
    .list{
      font-size: 1.2em;
      b {
        font-weight: 900;
      }
      b.openbits {
        font-size: 1.3em;
      }
    }
    .nav-pills {
      .nav-link {
        &.active {
          background-color: $multiverse-color!important;
        }
      }
    }
  }
}
</style>
