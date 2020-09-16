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
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
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
    </b-collapse>
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
  #main-navbar {
    &.landpage-navbar {
      z-index: 10000;
      background: transparent!important;
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
  /* #main-navbar {
    z-index:3000!important;
    position: absolute;
    width: 100%;
  } */
</style>
