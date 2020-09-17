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
        class="pl-4 pt-2"
        id="navbar-title">
        <img src="../../assets/logo-white.png" class="navbar-logo" />
      </h4>
    </b-navbar-brand>
    <b-navbar-toggle
      class="text-white"
      data-toggle="modal"
      data-target="test-modal"
      target="test-modal"
      @click="openOverlayMenu()">
      <template v-slot:default="{ expanded }">
        <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
        <b-icon v-else icon="chevron-bar-down"></b-icon>
      </template>
    </b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
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
                  Balance: {{defaultARWallet.balanceAR}} AR
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
        v-else
        class="ml-auto">
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
        <div class="social-nav pt-2 px-2">
          <b-nav-item
            target="_blank"
            href="https://discord.gg/ZYjAwXk"
            class="d-inline-block social-icon">
            <font-awesome-icon
              size="lg"
              :icon="['fab', 'discord']" />
          </b-nav-item>
          <b-nav-item
            target="_blank"
            href="https://twitter.com/OpenBitsWorld"
            class="d-inline-block social-icon">
            <font-awesome-icon
              size="lg"
              :icon="['fab', 'twitter']" />
          </b-nav-item>
          <b-nav-item
            target="_blank"
            href="https://t.me/openbits_official"
            class="d-inline-block social-icon">
            <font-awesome-icon
              size="lg"
              :icon="['fab', 'telegram']" />
          </b-nav-item>
          <b-nav-item
            target="_blank"
            href="https://gitlab.com/cervoneluca/openbits"
            class="d-inline-block social-icon">
            <font-awesome-icon
              size="lg"
              :icon="['fab', 'gitlab']" />
          </b-nav-item>
         </div>
        <b-nav-item
          id="main-login-button"
          right><LayoutLoginModal /></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <div id="overlay-menu" class="overlay-menu">
      <a
        href="#"
        class="closebtn"
        @click="closeOverlayMenu()">&times;</a>
        <b-nav vertical class="w-25">
          <b-nav-item
          href="#"
          v-scroll-to="'#why-section'"
          class="text-white pt-2 d-inline-block"
          @click="closeOverlayMenu()"
          right>
          Why OpenBits
        </b-nav-item>
        <b-nav-item
          href="#"
          v-scroll-to="'#how-section'"
          class="text-white pt-2 d-inline-block"
          @click="closeOverlayMenu()"
          right>
          How OpenBits Works
        </b-nav-item>
        <b-nav-item
          href="#"
          v-scroll-to="'#what-section'"
          class="text-white pt-2 d-inline-block"
          @click="closeOverlayMenu()"
          right>
          Get Started
        </b-nav-item>
        <b-nav-item
          @click="$router.push('explore-openbits'); closeOverlayMenu();"
          class="text-white pt-2 d-inline-block"
          right>
          Explore OpenBits
        </b-nav-item>
        <div class="social-nav pt-2 px-2">
          <b-nav-item
            target="_blank"
            href="https://discord.gg/ZYjAwXk"
            class="d-inline-block social-icon"
            @click="closeOverlayMenu()">
            <font-awesome-icon
              size="lg"
              :icon="['fab', 'discord']" />
          </b-nav-item>
          <b-nav-item
            target="_blank"
            href="https://twitter.com/OpenBitsWorld"
            class="d-inline-block social-icon"
            @click="closeOverlayMenu()">
            <font-awesome-icon
              size="lg"
              :icon="['fab', 'twitter']" />
          </b-nav-item>
          <b-nav-item
            target="_blank"
            href="https://t.me/openbits_official"
            class="d-inline-block social-icon"
            @click="closeOverlayMenu()">
            <font-awesome-icon
              size="lg"
              :icon="['fab', 'telegram']" />
          </b-nav-item>
          <b-nav-item
            target="_blank"
            href="https://gitlab.com/cervoneluca/openbits"
            class="d-inline-block social-icon"
            @click="closeOverlayMenu()">
            <font-awesome-icon
              size="lg"
              :icon="['fab', 'gitlab']" />
          </b-nav-item>
        </div>
        <b-nav-item
          id="main-login-button"
          @click="closeOverlayMenu()"
          right><LayoutLoginModal /></b-nav-item>
        </b-nav>
    </div>
  </b-navbar>
</template>

<script>
import { mapActions } from 'vuex';
import config from '@/mixins/configs';
import utils from '@/mixins/utils';
import LayoutLoginModal from '@/components/layout/LoginModal.vue';

export default {
  name: 'LayoutNavbar',
  mixins: [
    config,
    utils,
  ],
  components: {
    LayoutLoginModal,
  },
  computed: {
    classes() {
      if (this.isLogged) {
        return 'app-navbar';
      }
      return 'landpage-navbar';
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
    z-index: 10000;
    background: transparent!important;
    .nav-item {
      &:not(#main-login-button) {
        a {
          color: $white;
          font-weight:bold;
          padding-bottom: 5px;
          &:hover{
            color: $secondary-color;
          }
        }
      }
    }
  }
  .social-nav {
    border-right:1px solid $white;
    border-left:1px solid $white;
  }
  &.app-navbar {
    border-bottom: 2px solid black;
  }
  .navbar-logo {
    width:auto;
    height:70px;
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
  }

  .overlay-content {
    position: relative;
    top: 25%;
    width: 100%;
    text-align: center;
    margin-top: 30px;
  }

  .overlay a {
    padding: 8px;
    text-decoration: none;
    font-size: 36px;
    color: #818181;
    display: block;
    transition: 0.3s;
  }

  .overlay a:hover, .overlay a:focus {
    color: #f1f1f1;
  }

  .overlay .closebtn {
    position: absolute;
    top: 20px;
    right: 45px;
    font-size: 60px;
  }

  @media screen and (max-height: 450px) {
    .overlay a {font-size: 20px}
    .overlay .closebtn {
    font-size: 40px;
    top: 15px;
    right: 35px;
    }
  }
}
</style>
