<template>
  <div
    id="app-layout"
    class="h-100">
    <LayoutSidebar />
    <div
      id="page-center-container"
      class="h-100 app">
      <LayoutNavbar />
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import utils from '@/mixins/utils';
import LayoutNavbar from '@/components/layout/Navbar.vue';
import LayoutSidebar from '@/components/layout/Sidebar.vue';

export default {
  name: 'LayoutMain',
  mixins: [utils],
  components: {
    LayoutNavbar,
    LayoutSidebar,
  },
  computed: {
    ...mapGetters({
      defaultARWallet: 'user/getDefaultARWallet',
    }),
  },
};
</script>

<style lang="scss">
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
