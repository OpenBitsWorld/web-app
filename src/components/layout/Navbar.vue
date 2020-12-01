 <template>
  <b-navbar
    id="main-navbar"
    :class="classes"
    toggleable="lg"
    text-variant="light"
    variant="white">
    <b-navbar-brand
      v-if="isHomePage()">
      <h4
        class="pl-4 pt-2 mt-3"
        id="navbar-title">
        <img src="../../assets/logo-white-new-temp.png" class="navbar-logo" />
      </h4>
    </b-navbar-brand>
    <b-navbar-toggle
      class="text-white"
      data-toggle="modal"
      data-target="test-modal"
      target="test-modal"
      @click="openOverlayMenu()">
      <template v-slot:default="{ expanded }">
        <font-awesome-icon
          v-if="expanded"
          size="lg"
          :icon="['fa', 'times']" />
        <font-awesome-icon
          size="lg"
          :icon="['fa', 'bars']" />
      </template>
    </b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav
        v-if="isLogged"
        class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <strong
              class="text-dark">{{defaultARWallet.address}}
              <div class="d-inline-block">
                <b-badge
                  variant="secondary-color">
                  Balance: {{parseFloat(defaultARWallet.balanceAR).toFixed(3)}} AR
                </b-badge>
              </div>
            </strong>
          </template>
          <b-dropdown-item>
            <router-link to="user-profile">Profile</router-link></b-dropdown-item>
          <b-dropdown-item
            @click="signOut()">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav
        v-else-if="isHomePage()"
        class="ml-auto pt-3">
        <b-nav-item
          href="#"
          v-scroll-to="'#why-section'"
          class="text-white pt-2 d-inline-block"
          right>
          Why OpenBits
        </b-nav-item>
        <b-nav-item
          href="#"
          v-scroll-to="'#how-section'"
          class="text-white pt-2 d-inline-block"
          right>
          How OpenBits Works
        </b-nav-item>
        <b-nav-item
          href="#"
          v-scroll-to="'#what-section'"
          class="text-white pt-2 d-inline-block"
          right>
          Get Started
        </b-nav-item>
        <b-nav-item
          @click="$router.push('explore-openbits')"
          class="text-white pt-2 d-inline-block"
          right>
          Explore OpenBits
        </b-nav-item>
        <b-nav-item
          id="main-login-button"
          right><LayoutLoginModal modalId="0" /></b-nav-item>
        <LayoutSocialNav />
      </b-navbar-nav>
      <b-navbar-nav
        v-else
        class="ml-auto app">
        <b-nav-item
          id="main-login-button"
          right><LayoutLoginModal modalId="0" /></b-nav-item>
        <LayoutSocialNav />
      </b-navbar-nav>
    </b-collapse>
    <div id="overlay-menu" class="overlay-menu">
      <b-button
        variant="outline-white"
        class="closebtn mt-4 p-1"
        @click="closeOverlayMenu()">
        <font-awesome-icon
          class="close-menu-icon text-white"
          size="3x"
          :icon="['fa', 'times']"/>
      </b-button>
      <b-nav vertical class="w-100 mt-5 p-3 pt-5">
        <b-nav-item
          href="#"
          v-scroll-to="'#why-section'"
          class="text-white pt-2 d-inline-block"
          @click="closeOverlayMenu()">
          Why OpenBits
        </b-nav-item>
        <b-nav-item
          href="#"
          v-scroll-to="'#how-section'"
          class="text-white pt-2 d-inline-block"
          @click="closeOverlayMenu()">
          How OpenBits Works
        </b-nav-item>
        <b-nav-item
          href="#"
          v-scroll-to="'#what-section'"
          class="text-white pt-2 d-inline-block"
          @click="closeOverlayMenu()">
          Get Started
        </b-nav-item>
        <b-nav-item
          @click="$router.push('explore-openbits'); closeOverlayMenu();"
          class="text-white pt-2 d-inline-block">
          Explore OpenBits
        </b-nav-item>
        <b-nav-item
          id="main-login-button"
          class="my-3 d-block"
          @click="closeOverlayMenu()">
          <LayoutLoginModal modalId="1" />
        </b-nav-item>
        <LayoutSocialNav />
      </b-nav>
    </div>
  </b-navbar>
</template>

<script>
import { mapActions } from 'vuex';
import config from '@/mixins/configs';
import utils from '@/mixins/utils';
import LayoutSocialNav from '@/components/layout/SocialNav.vue';
import LayoutLoginModal from '@/components/layout/LoginModal.vue';

export default {
  name: 'LayoutNavbar',
  mixins: [
    config,
    utils,
  ],
  components: {
    LayoutSocialNav,
    LayoutLoginModal,
  },
  computed: {
    classes() {
      if (this.isLogged) {
        return 'app-navbar';
      }
      return `landpage-navbar ${this.$route.name}`;
    },
  },
  methods: {
    ...mapActions({
      setARDefaultWallet: 'user/setARDefaultWallet',
    }),
    signOut() {
      this.$arRemoveWallet(this.defaultARWallet.id);
      this.setARDefaultWallet(null);
      this.$router.push('/');
    },
    openOverlayMenu() {
      document.getElementById('overlay-menu').style.width = '100%';
    },
    closeOverlayMenu() {
      document.getElementById('overlay-menu').style.width = '0';
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/styles/custom-theme.scss';

#main-navbar {
  &.landpage-navbar {
    &:not(.Home){
      border-bottom: 2px solid $dark
    }
    z-index: 10000;
    height: 58px;
    background: transparent!important;
    .navbar-nav {
      .nav-item {
        &:not(#main-login-button) {
          a {
            color:$white;
            font-weight:bold;
            padding-bottom: 5px;
            &:hover{
              color: $secondary-color;
            }
          }
        }
      }
      &.app {
        .nav-item {
          &:not(#main-login-button) {
            a {
              color:$dark;
              font-weight:bold;
              padding-bottom: 5px;
              &:hover{
                color: $secondary-color;
              }
            }
          }
        }
      }
    }
  }
  &.app-navbar {
    border-bottom: 2px solid $dark;
  }
  .navbar-logo {
    width:auto;
    height:30px;
    display:inline-block!important;
  }
  .brand {
    display:inline-block;
  }
  .overlay-menu {
    height: 100%;
    width: 0;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0, 0.9);
    overflow-x: hidden;
    transition: 0.5s;
    a {
      padding: 8px;
      color: $white;
      text-decoration: none;
      font-size: 1.5rem;
      display: block;
      transition: 0.3s;
    }
    .closebtn {
      position: absolute;
      right: 0.9rem;
    }
  }

  /* @media screen and (max-height: 450px) {
    .overlay-menu a {font-size: 20px}
    .overlay-menu .closebtn {
    font-size: 40px;
    top: 15px;
    right: 35px;
    }
  } */
}
</style>
