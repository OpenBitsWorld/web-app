<template>
  <div class="home-page">
    <b-container
       class="hero bg-main-color"
       fluid>
       <b-container class="p-5">
          <b-row class="mt-5 pt-5">
            <b-col
              cols="7"
              class="pt-5 pt-lg-0 d-flex align-items-center">
              <div data-aos="zoom-out">
                <h1
                  class="text-secondary-color">Welcome to
                  <span class="text-white">OpenBits</span>
                </h1>
                <h2 class="text-white">
                  The first network that
                  <span
                    class="text-secondary-color">really incentivises</span>
                  developers of Open Source packages!
                </h2>
                <h2 class="text-white">
                  .. and ...
                </h2>
                <h2
                class="
                  text-white align-center mx-auto">
                  OpenBits
                  is the first Open Source Software that
                  <span class="text-secondary-color">will self-donate itself to
                  the MULTIVERSE</span>
                  after having reached its target profit!
                </h2>
              </div>
            </b-col>
            <b-col
              cols="5"
              class="hero-img" data-aos="zoom-out" data-aos-delay="300">
              <img :src="config.SCRENSHOOT_1_URL" class="hero-screenshot" />
            </b-col>
          </b-row>
       </b-container>
    </b-container>
    <svg class="hero-waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 24 150 28 " preserveAspectRatio="none">
      <defs>
        <path id="wave-path" d="M-160 44c30 0 58-18 88-18s 58
        18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
      </defs>
      <g class="wave1">
        <use xlink:href="#wave-path" x="50" y="3" fill="rgba(255,255,255, .1)" />
      </g>
      <g class="wave2">
        <use xlink:href="#wave-path" x="50" y="0" fill="rgba(255,255,255, .2)" />
      </g>
      <g class="wave3">
        <use xlink:href="#wave-path" x="50" y="9" fill="#fff" />
      </g>
    </svg>
    <main id="main">
      <b-container
        class="mt-5">
        <h1 class="section-title mx-auto align-center">How OpenBits works?</h1>
      </b-container>
    </main>
  </div>
</template>

<script>
// import InlineSvg from 'vue-inline-svg';
import config from '@/mixins/configs';

export default {
  name: 'Welcome',
  mixins: [config],
  components: {
    // InlineSvg,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import '../assets/styles/custom-theme.scss';

  .home-page{
    margin-top:-100px;
    .hero {
      height:800px;
      background: url("../assets/hero-bg.jpg");
      position: relative;
      padding: 120px 0 0 0;
      &:before {
        content: "";
        background-color:transparentize(black, 0.10);
        position: absolute;
        bottom: 0;
        top: 0;
        left: 0;
        right: 0;
      }
      .logo{
        display:block;
        margin-left:auto;
        margin-right:auto;
        height:200px;
        width:auto;
      }
      .hero-screenshot {
        width:140%;
      }
      h1 {
        margin: 0 0 20px 0;
        font-size: 48px;
        font-weight: 700;
        line-height: 56px;
        /* span {
          border-bottom: 4px solid white;
        } */
      }

      h2 {
        margin-bottom: 40px;
        font-size: 24px;
        span {
          border-bottom: 4px solid white;
        }
      }
    }
    .section-title{
      width: 100%;
      display:block;
      text-align:center;
    }
    .hero-waves{
      margin-top:-406px;
    }
    .hero-waves {
      display: block;
      margin-top: -60px;
      width: 100%;
      height: 60px;
      z-index: 5;
      position: relative;
    }
    .wave1 use {
      -webkit-animation: move-forever1 10s linear infinite;
      animation: move-forever1 10s linear infinite;
      -webkit-animation-delay: -2s;
      animation-delay: -2s;
    }
    .wave2 use {
      -webkit-animation: move-forever2 8s linear infinite;
      animation: move-forever2 8s linear infinite;
      -webkit-animation-delay: -2s;
      animation-delay: -2s;
    }
    .wave3 use {
      -webkit-animation: move-forever3 6s linear infinite;
      animation: move-forever3 6s linear infinite;
      -webkit-animation-delay: -2s;
      animation-delay: -2s;
    }
    @-webkit-keyframes move-forever1 {
      0% {
        transform: translate(85px, 0%);
      }
      100% {
        transform: translate(-90px, 0%);
      }
    }
    @keyframes move-forever1 {
      0% {
        transform: translate(85px, 0%);
      }
      100% {
        transform: translate(-90px, 0%);
      }
    }
    @-webkit-keyframes move-forever2 {
      0% {
        transform: translate(-90px, 0%);
      }
      100% {
        transform: translate(85px, 0%);
      }
    }
    @keyframes move-forever2 {
      0% {
        transform: translate(-90px, 0%);
      }
      100% {
        transform: translate(85px, 0%);
      }
    }
    @-webkit-keyframes move-forever3 {
      0% {
        transform: translate(-90px, 0%);
      }
      100% {
        transform: translate(85px, 0%);
      }
    }
    @keyframes move-forever3 {
      0% {
        transform: translate(-90px, 0%);
      }
      100% {
        transform: translate(85px, 0%);
      }
    }
  }
</style>
