 <template>
  <b-navbar
    id="main-navbar"
    class="landpage-navbar Home"
    toggleable="lg"
    text-variant="light"
    variant="white">
    <b-navbar-brand>
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
      <b-navbar-nav class="ml-auto pt-3">
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
          class="text-white pt-2 d-inline-block"
          right
          href="/#/explore-openbits" target="_blank">
          Explore OpenBits
        </b-nav-item>
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
        <LayoutSocialNav />
      </b-nav>
    </div>
  </b-navbar>
</template>

<script>
import LayoutSocialNav from '@/components/layout/SocialNav.vue';

export default {
  name: 'LayoutNavbar',
  components: {
    LayoutSocialNav,
  },
  computed: {
    classes() {
      return `landpage-navbar ${this.$route.name}`;
    },
  },
  methods: {
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
