<template>
  <section id="how-section">
    <b-container
      fluid
      class="mt-5 px-5 py-5 bg-secondary-color">
      <b-row
        class="px-5">
        <b-col
          sm="12"
          md="12"
          lg="12">
          <h1
            class="section-title mb-4 text-third-color">
            How OpenBits Works?</h1>
            <p class="list-intro to-be-animated"
              v-animate-onscroll="{down: 'animated fadeInDown'}">
              OpenBits relies on the <a href="https://www.arweave.org/"
                target="_blank"
                class="text-main-color">Arweave Blockchain</a> and it uses
                its
              <a
                href="https://medium.com/@arweave/profit-sharing-tokens-a-new-incentivization-mechanism-for-an-open-web-1f2532411d6e"
                target="_blank"
                class="text-main-color">SmartWeave Profit Sharing Tokens</a>.
              By combining these two technologies, OpenBits allows you to
              <b class="text-main-color">earn AR</b> (the arweave cryptocurrency)
              when other developers install your packages, it allows you
              <b class="text-main-color">to create investments plans</b>
              on your packages, and it allows you to
              <b class="text-main-color">donate your Open Source packages to the MULTIVERSE</b>
              when you reach your profit targets. All of this in
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
                <!--
                  <font-awesome-icon class="ml-4 text-third-color" size="4x" icon="box-open" /> -->
                <h3 class="text-center text-white">1. Upload your package</h3>
              </template>
              <b-card-text>
                <b-list-group>
                  <b-list-group-item>
                    Upload your package on OpenBits and choose your target profit;
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
                <!--
                  <font-awesome-icon class="ml-4 text-third-color" size="4x" icon="box-open" /> -->
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
                <!--
                  <font-awesome-icon class="ml-4 text-third-color" size="4x" icon="box-open" /> -->
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
                    0.01 AR gose to OpenBits, and <b>0.01 AR goes to you</b>;
                  </b-list-group-item>
                  <b-list-group-item>
                    Every time you earn an amount of AR <b>equal to the price of
                    a share</b>, a share of your package <b>will be given to
                    the MULTIVERSE</b>. One you have only one share, <b>shares
                    of investors will be given to the MULTIVERSE</b>.
                  </b-list-group-item>
                </b-list-group>
              </b-card-text>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
      <b-row
        class="px-5 my-5">
        <b-col
          sm="12"
          md="12"
          lg="12">
          <h1
            class="section-title mb-4 text-third-color">
            And Then?</h1>
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
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/custom-theme.scss';

#how-section {
  a {
    border-bottom: 2px solid white;
    color: $main-color;
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
  .why-image{
    width: 70%
  }
  .to-be-animated {
    transition-duration: 800ms;
    &:not(.animated) {
      opacity: 0;
    }
  }
  .list-intro{
    font-size: 1.5em;
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
}
</style>
