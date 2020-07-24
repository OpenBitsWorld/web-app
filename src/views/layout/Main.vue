<template>
  <div
    id="app-layout"
    class="h-100">
    <LayoutSidebar v-if="defaultARWallet" />
    <div
      id="page-center-container"
      class="h-100"
      :class="pageContainerClass">
      <LayoutNavbar />
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import LayoutNavbar from '@/components/layout/Navbar.vue';
import LayoutSidebar from '@/components/layout/Sidebar.vue';

export default {
  name: 'LayoutMain',
  components: {
    LayoutNavbar,
    LayoutSidebar,
  },
  computed: {
    pageContainerClass() {
      return (this.defaultARWallet) ? 'user-logged' : 'user-not-logged';
    },
    ...mapGetters({
      defaultARWallet: 'user/getDefaultARWallet',
    }),
  },
};
</script>

<style lang="scss">
#app-layout {
  #page-center-container{
    &.user-logged{
      margin-left:20em;
    }
  }
}
</style>
