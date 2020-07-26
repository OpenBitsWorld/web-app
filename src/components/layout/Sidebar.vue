 <template>
  <b-sidebar
    id="layout-sidebar"
    class="layout-sidebar"
    title="Sidebar"
    shadow
    no-header
    no-close-on-route-change
    no-close-on-esc
    :visible=true
    bg-variant="white"
    width="20em">
    <template v-slot:default="{}">
        <h4
          class="pl-4 pt-2"
          id="sidebar-no-header-title">
            <img :src="config.LOGO_URL" class="sidebar-logo" />
            <!-- <inline-svg
            class="sidebar-logo"
            :src="require('../../assets/openbits-logo.svg')"/> -->
            <div class="brand ml-2 mt-1">OpenBits</div>
        </h4>
        <div class="p-3">
          <nav class="mb-3">
            <b-nav
              vertical
              pills>
              <!-- <b-nav-item
                :active="isActivePage('/user-profile')"
                class="m-1"
                @click="$router.push('user-profile')">
                <font-awesome-icon icon="user" /> Your Profile
              </b-nav-item> -->
              <b-nav-item
                :active="isActivePage('/explore-openbits')"
                class="m-1"
                @click="$router.push('explore-openbits')">
                <font-awesome-icon icon="search" /> Explore OpenBits
              </b-nav-item>
              <b-nav-item
                disabled
                :active="isActivePage('/user-obits')"
                class="m-1"
                @click="$router.push('user-obits')">
                <font-awesome-icon icon="box-open" /> Your OpenBits
              </b-nav-item>
              <b-nav-item
                :active="isActivePage('/publish-openbit')"
                class="m-1"
                @click="$router.push('publish-openbit')">
                <font-awesome-icon icon="folder-plus" /> Publish Your OpenBit
              </b-nav-item>
              <b-nav-item
                disabled
                :active="isActivePage('/user-packages-shares')"
                class="m-1"
                @click="$router.push('user-packages-shares')">
                <font-awesome-icon icon="file-contract" /> Your OpenBits Shares
              </b-nav-item>
            </b-nav>
          </nav>
          <!-- <b-button variant="primary" block @click="hide">Close Sidebar</b-button> -->
        </div>
      </template>
  </b-sidebar>
</template>

<script>
// import InlineSvg from 'vue-inline-svg';
import config from '@/mixins/configs';

export default {
  name: 'LayoutSidebar',
  mixins: [config],
  components: {
    // InlineSvg,
  },
  methods: {
    isActivePage(page) {
      return this.$route.path === page;
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/custom-theme.scss';

.layout-sidebar{
  background-color: green!important;
  #sidebar-no-header-title {
    border-bottom:2px solid black;
    height: 58px;
    .sidebar-logo {
      width:auto;
      height:41px;
      display:inline-block!important;
    }
    .brand {
      display:inline-block;
    }
  }
  div {
    nav{
      .nav-link {
        color: $dark;
        &:hover {
          background-color: lighten($secondary-color, 30%)!important;
          color:$dark!important;
        }
        &.active{
          background-color:  var(--warning)!important;
          color:$dark!important;
        }
        &.disabled{
          color: lighten($dark, 30%)!important;
        }
      }
    }
  }
}
</style>
