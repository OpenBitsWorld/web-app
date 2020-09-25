<template>
  <main id="main" class="h-100">
    <LandPageHeroSection />
    <LandPageWhySection />
    <TriangleAndLogoSeparator color="#ffd301" triangle="down" :logo="true" />
    <LandPageHowSection />
    <TriangleAndLogoSeparator color="#343a40" triangle="up" :logo="false"/>
    <LandPageWhatSection />
    <LandPageFooterSection />
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
}
</style>
