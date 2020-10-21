 <template>
  <b-sidebar
    id="layout-sidebar"
    class="layout-sidebar d-none d-md-block d-lg-block"
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
            <img
              @click="$router.push('/')"
              src="../../assets/logo-black.png"
              class="sidebar-logo" />
        </h4>
        <div class="p-3 mt-4">
          <nav class="mb-3">
            <b-nav
              vertical
              pills>
              <b-nav-item
                :active="isActivePage('/explore-openbits') || isActivePage('/explore-openbit')"
                class="m-1"
                @click="$router.push({
                  name: 'ExploreOpenBits',
                })">
                <font-awesome-icon icon="search" /> Explore OpenBits
              </b-nav-item>
              <div
                v-if="isLogged">
                <b-nav-item
                  :active="isActivePage('/user-openbits')"
                  class="m-1"
                  @click="$router.push('user-openbits')">
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
              </div>
            </b-nav>
          </nav>
          <OpenBitsStatusInfo />
        </div>
      </template>
  </b-sidebar>
</template>

<script>
import utils from '@/mixins/utils';
import OpenBitsStatusInfo from '@/components/OpenBitsStatusInfo.vue';

export default {
  name: 'LayoutSidebar',
  mixins: [
    utils,
  ],
  components: {
    OpenBitsStatusInfo,
  },
  data() {
    return {
      currentOpenBitAddress: null,
    };
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
      height:70px;
      display:block;
      cursor:pointer;
      z-index:1000!important;
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
          background-color: $secondary-color!important;
          color:$dark;
        }
        &.active{
          &:hover {
            color:white;
          }
          background-color:  $main-color!important;
          // color:$dark!important;
        }
        &.disabled{
          color: lighten($dark, 30%)!important;
        }
      }
    }
  }
}
</style>
