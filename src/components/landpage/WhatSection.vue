<template>
  <section id="what-section" class="pb-5">
    <b-container
      class="what pt-5"
      fluid>
      <b-container
        fluid
        class="px-4">
        <b-row class="mb-5">
          <b-col cols="12">
            <h1 class="text-black text-center w-100">Get Started With OpenBits!</h1>
          </b-col>
        </b-row>
        <b-row
          class="to-be-animated mt-4"
          v-animate-onscroll="{down: 'animated fadeInDown'}">
          <b-col
            lg="4"
            md="12"
            sm="12"
            class="px-3">
            <h2 class="color-black text-center">
              Generate an Arweave Wallet
            </h2>
            <h5>
              Firstly, you'll need to generate an Arweave wallet and you'll
              need to grab some AR.
              You can do it
              <a href="https://www.arweave.org/" target="_blank">here</a>.
            </h5>
            <a href="https://www.arweave.org/"
              target="_blank"
              class="mt-3 d-block">
              <img src="../../assets/screens/arweave-s.png"
                  class="mx-auto d-block"/>
            </a>
          </b-col>
          <b-col
            lg="4"
            md="12"
            sm="12">
            <h2 class="color-black text-center">
              Publish OpenBits or buy shares of them thorugh the
              web application
            </h2>
            <h5>
              Login in the web application by cliking the login
              button in the top right corner of this page and by dropping
              or selecting your AR Wallet key file.
            </h5>
            <img src="../../assets/screens/openbits-s1.png"
                  class="mx-auto d-block"/>
            <h5>
              Publish your OpenBits by going in the "Publish Your OpenBit" section and following
              the info. Currently only Node packages are allowed.
            </h5>
            <img src="../../assets/screens/openbits-s2.png"
                  class="mx-auto d-block"/>
            <img src="../../assets/screens/openbits-s3.png"
                  class="mx-auto d-block"/>
            <h5>
              Buy shares of OpenBits that other developers have published
              in the section "Explore OpenBits"!
            </h5>
            <img src="../../assets/screens/openbits-s4.png"
                  class="mx-auto d-block"/>
          </b-col>
          <b-col
            lg="4"
            md="12"
            sm="12">
            <h2 class="color-black text-center">
              Publish and install OpenBits through the Command Line
              Interface
            </h2>
            <h5>
              Install the OpenBits CLI by following
              <a href="https://www.npmjs.com/package/openbits" target="_blank">these instructions</a>.
            </h5>
            <a href="https://www.npmjs.com/package/openbits"
              target="_blank"
              class="mt-3 d-block">
              <img src="../../assets/screens/npm-s1.png"
                class="mx-auto d-block"/>
            </a>
            <h5>
              To publish your OpenBit, open a terminal, move
              in the root folder of your project and run (currently only
              node packages are supported):
              <kbd>openbits publish</kbd>
            </h5>
            <img src="../../assets/screens/openbits-cli-s1.png"
              class="mx-auto d-block"/>
            <h5>
              To install an OpenBit, open a terminal, move
              in the folder of the project where you need
              the openbit and run:
              <kbd>openbits install openbit-name[@openbit-version]</kbd>
            </h5>
            <img src="../../assets/screens/openbits-cli-s2.png"
              class="mx-auto d-block"/>
            <h5>
              Remember that you are not forced to pay fees to install OpenBits.
              If you want you can install them witouth paying fees! If you
              want to test a very usefull OpenBit, you can checkout
              <a href="https://gitlab.com/cervoneluca/batrandom" target="_blank">BatRandom</a>,
              a package to generate random bat-things! To use it in your projects run:
              <kbd>openbits install batrandom</kbd>
            </h5>
          </b-col>
        </b-row>
       </b-container>
    </b-container>
  </section>
</template>

<script>
import config from '@/mixins/configs';

export default {
  name: 'LandPageWhatSection',
  mixins: [config],
  mounted() {
    window.scroll(0, 1);
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/custom-theme.scss';

#what-section{
  .what {
    color:$main-color!important;
    .to-be-animated {
      transition-duration: 800ms;
      &:not(.animated) {
        opacity: 0;
      }
    }
    .logo{
      display:block;
      width:40%;
    }
    .what-screenshot {
      width:100%;
    }
    h1 {
      margin: 0 0 20px 0;
      font-size: 3em;
      font-weight: 700;
      line-height: 56px;
      /* span {
        border-bottom: 4px solid white;
      } */
    }
    h2 {
      margin-bottom: 40px;
      font-size: 2em;
      span {
        border-bottom: 4px solid white;
      }
    }
    a {
      text-decoration:underline;
      color:$main-color;
    }
    img {
      width:70%;
      border: 2px solid $main-color;
      border-radius: 3%;
      margin-top: 3%;
      margin-bottom: 3%;
    }
    kbd {
      display: block;
      margin-top:2%;
      margin-bottom:2%;
    }
  }
}
</style>
