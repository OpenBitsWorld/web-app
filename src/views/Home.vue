<template>
  <main id="main" class="h-100">
    <LandPageHeroSection />
    <LandPageWhySection />
    <LandPageHowSection />
  </main>
</template>

<script>
import LandPageHeroSection from '@/components/landpage/HeroSection.vue';
import LandPageWhySection from '@/components/landpage/WhySection.vue';
import LandPageHowSection from '@/components/landpage/HowSection.vue';

export default {
  name: 'Home',
  components: {
    LandPageHeroSection,
    LandPageWhySection,
    LandPageHowSection,
  },
};
</script>

<style lang="scss" scoped>
#main *{
  font-family: "Poppins", sans-serif;
}
</style>
