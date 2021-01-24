<template>
  <main id="main" class="h-100">
    <LandPageHeroSection />
    <LandPageWhySection />
    <TriangleAndLogoSeparator color="#ffd301" triangle="down" :logo="false" />
    <LandPageHowSection />
    <TriangleAndLogoSeparator color="#343a40" triangle="up" :logo="false"/>
    <LandPageWhatSection />
    <LandPageFooterSection />
    <back-to-top
      bottom="1rem"
      right="1rem">
      <b-button
        id="button-back-to-top"
        variant="secondary-color">
        <font-awesome-icon
          size="lg"
          icon="chevron-circle-up"
          class="text-white" />
      </b-button>
    </back-to-top>
  </main>
</template>

<script>
import LandPageHeroSection from '@/components/landpage/HeroSection.vue';
import LandPageWhySection from '@/components/landpage/WhySection.vue';
import LandPageHowSection from '@/components/landpage/HowSection.vue';
import LandPageWhatSection from '@/components/landpage/WhatSection.vue';
import LandPageFooterSection from '@/components/landpage/FooterSection.vue';
import TriangleAndLogoSeparator from '@/components/landpage/TriangleAndLogoSeparator.vue';

export default {
  name: 'Home',
  components: {
    LandPageHeroSection,
    LandPageWhySection,
    LandPageHowSection,
    LandPageWhatSection,
    LandPageFooterSection,
    TriangleAndLogoSeparator,
  },
};
</script>

<style lang="scss" scoped>
#main *{
  font-family: "Poppins", sans-serif;
  #button-back-to-top {
    border-radius: 50px;
  }
}
</style>
