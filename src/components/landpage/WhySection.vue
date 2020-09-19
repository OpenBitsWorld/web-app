<template>
  <section id="why-section">
    <b-container
      fluid
      class="mt-5 pb-5 px-3 px-sm-3 px-md-5 px-lg-5">
      <h1
        class="section-title text-main-color mb-4 text-multiverse-color">Why OpenBits?</h1>
      <b-row cols="1" cols-sm="1" cols-md="3" cols-lg="3">
        <b-col>
          <img
            src="../../assets/why-section-animate-1.svg"
            class="why-image w-75 d-block mx-auto"/>
          <p class="to-be-animated px-1"
            v-animate-onscroll="{down: 'animated fadeInDown'}">
            Creators of Open Soruce packages, no matter the language they use,
            are building all the bricks that compose software we use day by day.
            These packages are the Bits that allow other developers to create fastly
            new technologies that improves our daily lifes.
          </p>
        </b-col>
        <b-col>
          <img
            src="../../assets/why-section-animate-2.svg"
            class="why-image w-75 d-block mx-auto"/>
          <p class="to-be-animated px-1"
            v-animate-onscroll="{down: 'animated fadeInDown'}">
            However, Package Managers do not reward neither developers of packages,
            nor users of packages. Thus, although developers usually creates these
            importants software because they want to contribute to common goods,
            it is difficult for them to stay motivated in continuing to create them.
          </p>
        </b-col>
        <b-col>
          <img
            src="../../assets/why-section-animate-3.svg"
            class="why-image w-75 d-block mx-auto"/>
          <p class="to-be-animated px-1"
            v-animate-onscroll="{down: 'animated fadeInDown'}">
            <b class="text-main-color">OpenBits incentivise developers by supplying them an engaging
            way to be rewarded for creating and using Open Source Packages!</b>
            And there is much more! OpenBits incentivize developers to donate their
            creation to the community (that we call the MULTIVERSE), as soon as they reach
            their desired amount of rewards!
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
  font-size: 1.2rem;
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
