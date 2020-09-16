<template>
  <section id="hero-section" class="h-100">
    <b-container
       class="hero h-100 bg-main-color"
       fluid>
       <b-container class="p-5">
          <b-row
            class="to-be-animated d-none d-sm-block"
            v-animate-onscroll="{down: 'animated fadeInDown'}">
            <b-col
                sm="12"
                md="12"
                lg="12"
                class="pt-5 pt-lg-0 d-flex align-items-center">
                <img src="../../assets/logo-white.png"
                class="pl-5 mx-auto d-block logo"/>
            </b-col>
          </b-row>
          <b-row
            v-animate-onscroll="{down: 'animated fadeInUp'}"
            class="mt-5 to-be-animated">
            <b-col
              sm="12"
              md="12"
              lg="12"
              class="text-center">
              <h1
                class="text-secondary-color">
                Each Single Open Source Bit In The Multiverse Matters!
              </h1>
            </b-col>
          </b-row>
          <b-row
            v-animate-onscroll="{down: 'animated fadeInUp'}"
            class="mt-5 to-be-animated">
            <b-col
              cols="12">
              <b-button
                size="lg"
                variant="multiverse-color"
                class="mx-auto d-block w-50"
                @click="$router.push('explore-openbits')">
                  <b>Explore Published OpenBits</b>
              </b-button>
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
  </section>
</template>

<script>
import config from '@/mixins/configs';

export default {
  name: 'LandPageHeroSection',
  mixins: [config],
  mounted() {
    window.scroll(0, 1);
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/custom-theme.scss';

#hero-section{
  margin-top:-120px;
  .hero {
    // height:800px;
    background: url("../../assets/multiverse-wallpaper.jpg");
    background-repeat:no-repeat;
    position: relative;
    padding: 120px 0 0 0;
    background-size: auto 100%;
    .to-be-animated {
      transition-duration: 800ms;
      &:not(.animated) {
        opacity: 0;
      }
    }
    &:before {
      content: "";
      background-color:transparentize(black, 0.30);
      position: absolute;
      bottom: 0;
      top: 0;
      left: 0;
      right: 0;
    }
    .logo{
      display:block;
      width:40%;
    }
    .hero-screenshot {
      width:100%;
    }
    h1 {
      margin: 0 0 20px 0;
      font-size: 3em;
      font-weight: 700;
      line-height: 56px;
    }
    h2 {
      margin-bottom: 40px;
      font-size: 2em;
      span {
        border-bottom: 4px solid white;
      }
    }
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
