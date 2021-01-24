 <template>
  <b-navbar
    id="main-navbar"
    :class="classes"
    toggleable="lg"
    text-variant="light"
    variant="white">
    <LayoutSocialNav />
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
        v-else
        class="ml-auto app">
        <b-nav-item
          id="main-login-button"
          right><LayoutLoginModal modalId="0" /></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
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
    z-index: 1;
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
