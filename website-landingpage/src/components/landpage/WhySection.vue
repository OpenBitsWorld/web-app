<template>
  <section id="why-section">
    <b-container
      fluid
      class="mt-5 px-3 px-sm-3 px-md-5 px-lg-5">
      <h1
        class="section-title text-main-color mb-4 text-multiverse-color">Why OpenBits?</h1>
      <b-row cols="1" cols-sm="1" cols-md="3" cols-lg="3">
        <b-col>
          <img
            src="../../assets/why-section-animate-1.svg"
            class="why-image w-75 d-block mx-auto"/>
          <p class="to-be-animated px-1"
            v-animate-onscroll="{down: 'animated fadeInDown'}">
            Developers of open-source packages create the necessary framework
            for all other developers to build upon.
          </p>
        </b-col>
        <b-col>
          <img
            src="../../assets/why-section-animate-2.svg"
            class="why-image w-75 d-block mx-auto"/>
          <p class="to-be-animated px-1"
            v-animate-onscroll="{down: 'animated fadeInDown'}">
            However, package managers often do not reward these developers for their
            hard work and meaningful contributions.
          </p>
        </b-col>
        <b-col>
          <img
            src="../../assets/why-section-animate-3.svg"
            class="why-image w-75 d-block mx-auto"/>
          <p class="to-be-animated px-1"
            v-animate-onscroll="{down: 'animated fadeInDown'}">
            <b class="text-main-color">
              OpenBits incentivizes developers by allowing them to generate a stream of income
              from their creations, through the installations and investments
              of the broader community or ‘MULTIVERSE’.
            </b>
          </p>
        </b-col>
      </b-row>
    </b-container>
  </section>
</template>

<script>
import config from '@/mixins/configs';

export default {
  name: 'LandPageWhySection',
  mixins: [config],
};
</script>

<style lang="scss" scoped>
@import '../../assets/styles/custom-theme.scss';

#why-section {
  font-size: 1.4rem;
  text-align:justify;
  section-title {
    font-size: 1.4rem;
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
