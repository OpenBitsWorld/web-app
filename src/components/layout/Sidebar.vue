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
            <inline-svg
            class="sidebar-logo"
            :src="require('../../assets/openbits-logo.svg')"/> OpenBits
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
                disabled
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
import InlineSvg from 'vue-inline-svg';

export default {
  name: 'LayoutSidebar',
  components: {
    InlineSvg,
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
      height:35px;
      display:inline-block!important;
      vertical-align: text-bottom;
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
