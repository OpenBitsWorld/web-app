<template>
  <div id="app"
    class="h-100">
    <div
      id="app-layout"
      class="h-100">
      <div
        id="page-center-container"
        class="h-100 homepage">
        <LayoutNavbar />
        <Home />
      </div>
    </div>
  </div>
</template>

<script>
import Home from '@/views/Home.vue';
import LayoutNavbar from '@/components/layout/Navbar.vue';

export default {
  name: 'App',
  components: {
    Home,
    LayoutNavbar,
  },
};
</script>

<style lang="scss">
@import './assets/styles/custom-theme.scss';

html {
  height:100%;
  body {
    height:100%;
    a {
      color: $multiverse-color;
    }
  }
}

#app-layout {
  #page-center-container{
    &.app{
      @media (min-width: 768px) {
        margin-left:22em;
      }
    }
  }
}
</style>
