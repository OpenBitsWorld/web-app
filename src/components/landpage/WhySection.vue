<template>
  <section id="why-section">
    <b-container
      fluid
      class="mt-5 px-5 pb-5">
      <b-row
        class="px-5">
        <b-col
          class="my-5"
          sm="12"
          md="4"
          lg="5">
          <img
            src="../../assets/why-section.png"
            class="why-image to-be-animated"
            v-animate-onscroll="{down: 'animated bounceInLeft'}"/>
        </b-col>
        <b-col
          sm="12"
          md="8"
          lg="7">
          <h1
            class="section-title text-main-color mb-4 text-multiverse-color">Why OpenBits?</h1>
            <p class="list-intro to-be-animated"
              v-animate-onscroll="{down: 'animated fadeInDown'}">
              Creators of <b
                class="text-main-color">packages</b>, no matter which language they use,
              <b
                class="text-main-color">are</b> building all
              <b
                class="text-main-color">
                the bricks that compose software we use day by day.
              </b>
            </p>
            <b-row
              class="to-be-animated mt-5 list"
              v-animate-onscroll="{down: 'animated bounceInRight'}">
              <b-col cols="2 py-2">
                <font-awesome-icon class="ml-4 text-third-color" size="4x" icon="box-open" />
              </b-col>
              <b-col class="pt-2" cols="10">
                These <b
                class="text-main-color">
                  packages are the "Bits" </b>
                that allow us to create fastly new technologies
                useful to the multiverse. <b class="text-main-color">And</b>, moreover,
                <b class="text-main-color">packages are usually Open Source</b>
                (so they are <b class="openbits">
                  <b-badge variant="secondary-color">OpenBits!</b-badge>
                </b>).
              </b-col>
            </b-row>
            <b-row
              class="to-be-animated mt-5 list"
              v-animate-onscroll="{down: 'animated bounceInRight'}">
              <b-col cols="2 py-2">
                <font-awesome-icon class="ml-4 text-danger" size="4x" icon="sad-cry" />
              </b-col>
              <b-col class="pt-2"  cols="10">
                However, <b class="text-main-color">Package Managers</b>,
                centralized or decentrilized, <b class="text-main-color">do not incentivise
                neither developers of packages, nor users of packages</b>. Thus,
                <b class="text-main-color">it is difficult</b>
                for a developer <b class="text-main-color">to be remunerated for creating</b>
                these so useful <b class="text-main-color">Open Source software</b>.
              </b-col>
            </b-row>
             <b-row
              class="to-be-animated mt-5 list"
              v-animate-onscroll="{down: 'animated bounceInRight'}">
              <b-col cols="2 py-2">
                <font-awesome-icon class="ml-4 text-fourth-color" size="4x" icon="grin-hearts" />
              </b-col>
              <b-col class="pt-2"  cols="10">
                <b class="text-main-color">OpenBits incentivise developers</b>
                to build and to use Open Source packages
                <b class="text-main-color">by supplying a way to create engaging
                  financial systems on the top of them!</b>
              </b-col>
            </b-row>
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
