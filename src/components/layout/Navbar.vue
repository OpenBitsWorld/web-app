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
      v-b-modal.test-modal>
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
    <b-modal
      id="test-modal"
      ref="test-modal"
      class="w-100 h-100"
      hide-footer>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown
          right
          v-if="isLogged">
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
        <b-nav-item
          v-else
          right
          ><LayoutLoginModal /></b-nav-item>
      </b-navbar-nav>
    </b-modal>
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
}
</style>
