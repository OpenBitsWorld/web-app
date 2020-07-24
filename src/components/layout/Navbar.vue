 <template>
  <b-navbar
    id="main-navbar"
    toggleable="lg"
    text-variant="light"
    variant="white">
    <!--<b-navbar-brand>OpenBits</b-navbar-brand>-->
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->
        <!--<b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->
        <b-nav-item-dropdown
          right
          v-if="defaultARWallet">
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <strong
              class="text-dark">{{defaultARWallet.address}}
              <div class="d-inline-block">
                <b-badge
                  variant="secondary-color"
                  pill>
                  Balance: {{defaultARWallet.balanceAR}}
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
import { mapGetters, mapActions } from 'vuex';
import LayoutLoginModal from '@/components/layout/LoginModal.vue';

export default {
  name: 'LayoutNavbar',
  components: {
    LayoutLoginModal,
  },
  computed: {
    ...mapGetters({
      defaultARWallet: 'user/getDefaultARWallet',
    }),
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
    border-bottom: 2px solid black;
  }
  /* #main-navbar {
    z-index:3000!important;
    position: absolute;
    width: 100%;
  } */
</style>
