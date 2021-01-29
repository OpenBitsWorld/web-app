<template>
  <b-container>
    <div v-if="
      pst && openbit && (pst !== 'not-found' && openbit !== 'not-found')">
      <h5 class="openbit-shares-info-title p-1 pl-3 mt-5 mb-3 bg-multiverse-color text-white">
        <span v-if="$route.name==='ExploreOpenBits'">OpenBits</span>
        Shares Info
      </h5>
      <div
        v-if="$route.name !== 'ExploreOpenBits'">
        <h6>Target Rewards</h6>
        <b-badge
          class="mb-2"
          variant="main-color">{{pst.targetProfit}} AR</b-badge>
        <h6>Rewarded Installations</h6>
        <b-badge
          class="mb-2"
          variant="main-color">
          {{Math.round(pst.generatedProfit * 100)}}
          ({{parseFloat(pst.generatedProfit).toFixed(2)}} AR)
        </b-badge>
        <h6>Next share relased to the multiverse in:</h6>
        <b-badge
          class="mb-2"
          variant="main-color">{{pst.sharesReleaseIn}} Installations</b-badge>
        <h6>Shares Distribution</h6>
        <b-progress
          show-progress
          max="100" class="mb-3">
          <b-progress-bar
            v-for="(b, i) in Object.entries(pst.balances)"
            :value="b[1]"
            :key="i"
            :variant="getProgressVariant(i, b)">
          </b-progress-bar>
        </b-progress>
        <b-table
          id="shares-distribution-table"
          v-if="pst"
          striped
          :items="sharesDistributionItems"
          :fields="sharesDistributionTable">
            <template v-slot:cell(owner)="data">
              <b-badge
                class="d-inline-block w-100"
                :variant="data.item.color"
              >
              {{data.value}}
            </b-badge>
            </template>
        </b-table>
      </div>
            <div
        v-if="$route.name !== 'ExploreOpenBits'">
        <h5 class="openbit-info-title p-1 pl-3 mt-5 mb-3 bg-secondary-color">
          Usage Info
        </h5>
        <h6>Install Command</h6>
        <b-badge
          class="mb-2 copy-to-clipboard d-block text-truncate"
          variant="main-color"
          v-clipboard:copy="`openbits install ${$route.params.id}`"
          v-clipboard:success="copiedToast">
          <span class="d-block text-truncate text-left">
            openbits install
            {{$route.params.id}}
          </span>
        </b-badge>
        <h6>Version</h6>
        <b-badge
          v-if="
            getAllVersionsOfCurrentOpenBit() &&
            getAllVersionsOfCurrentOpenBit().length === 1"
          class="mb-2"
          variant="main-color">{{openbit.version}}</b-badge>
        <div
          v-else>
          <div>
            <b-dropdown
              id="version-dropdown"
              :text="openbit.version"
              variant="main-color"
              size="sm"
              class="mb-3">
              <b-dropdown-item
                v-for="openbits in reverseVersionsList()"
                :key="openbits.version">
                <span
                  v-if="openbits.version !== openbit.version"
                  @click="goToAnotherVersion(openbits.version)">
                  {{openbits.version}}
                </span>
              </b-dropdown-item>
            </b-dropdown>
          </div>
        </div>
        <div
          v-if="openbitPackageInfo
            && openbitPackageInfo.repository
            && openbitPackageInfo.repository !== ''">
          <h6>Repository</h6>
          <b-badge
            class="mb-2"
            variant="main-color d-block text-truncate">
            <span class="d-block text-truncate text-left">
              <a
                :href="openbitPackageInfo.repository.url || openbitPackageInfo.repository"
                class="text-white"
                target="_blank">
                {{openbitPackageInfo.repository.url || openbitPackageInfo.repository}}
              </a>
            </span>
          </b-badge>
        </div>
        <div
          v-if="openbitPackageInfo
            && openbitPackageInfo.homepage
            && openbitPackageInfo.homepage !== ''">
          <h6>Web Site</h6>
          <b-badge
            class="mb-2"
            variant="main-color d-block text-truncate">
            <span class="d-block text-truncate text-left">
              <a
                :href="openbitPackageInfo.homepage"
                class="text-white"
                target="_blank">
                {{openbitPackageInfo.homepage}}
              </a>
            </span>
          </b-badge>
        </div>
        <div
          v-if="openbitPackageInfo
            && openbitPackageInfo.author
            && openbitPackageInfo.author.name !== ''">
          <h6>Author</h6>
          <b-badge
            class="mb-2"
            variant="main-color d-block text-truncate">
            <span class="d-block text-truncate text-left">
              {{openbitPackageInfo.author.name || openbitPackageInfo.author}}
            </span>
          </b-badge>
        </div>
      </div>
    </div>
    <div v-else-if="pst === 'not-found' && openbit === 'not-found'">
      We didn't find the OpenBit you are looking for!
    </div>
    <div v-else>
      <h5>Loading OpenBits status ...</h5>
      <LoadingSpinner class="d-block mx-auto" />
    </div>
  </b-container>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { readContract } from 'smartweave';

import utils from '@/mixins/utils';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  name: 'OpenBitsStatusInfo',
  components: {
    LoadingSpinner,
  },
  mixins: [
    utils,
  ],
  watch: {
    async $route(to) {
      if (to.hash) {
        return;
      }
      this.pst = null;
      try {
        const OpenBitsPSTStatus = await readContract(
          Vue.$arweave.node,
          this.getCurrentOpenBitAddress(),
        );
        this.pst = OpenBitsPSTStatus;
        this.openbit = this.getCurrentOpenBit();
        this.openbitPackageInfo = await this.retrieveCurrentOpenBitPackageJson();
      } catch (err) {
        this.pst = 'not-found';
        this.openbit = 'not-found';
      }
    },
    async getOpenBits() {
      const OpenBitsPSTStatus = await readContract(
        Vue.$arweave.node,
        this.getCurrentOpenBitAddress(),
      );
      this.pst = OpenBitsPSTStatus;
      this.openbit = this.getCurrentOpenBit();
      this.openbitPackageInfo = await this.retrieveCurrentOpenBitPackageJson();
    },
  },
  async beforeMount() {
    try {
      const OpenBitsPSTStatus = await readContract(
        Vue.$arweave.node,
        this.getCurrentOpenBitAddress(),
      );
      this.pst = OpenBitsPSTStatus;
      this.openbit = this.getCurrentOpenBit();
      this.openbitPackageInfo = await this.retrieveCurrentOpenBitPackageJson();
      return true;
    } catch (err) {
      return false;
    }
  },
  methods: {
    reverseVersionsList() {
      const list = this.getAllVersionsOfCurrentOpenBit();
      return list.reverse();
    },
    goToAnotherVersion(version) {
      this.$router.push({
        name: 'ExploreOpenBit',
        params: {
          id: `${this.openbit.name}@${version}`,
        },
      });
    },
    getProgressVariant(i) {
      switch (i) {
        case 0:
          return 'owner-color';
        case 1:
          return 'multiverse-color';
        case 2:
          return 'secondary-color';
        case 3:
          return 'danger';
        case 4:
          return 'fourth-color';
        case 5:
          return 'third-color';
        default:
          return 'owner-color';
      }
    },
    copiedToast() {
      this.$bvToast.toast(
        `"openbits install ${this.$route.params.id}" copied to your clipboard`,
        {
          variant: 'success',
          toaster: 'b-toaster-top-left',
          title: 'copied to clipboard',
          autoHideDelay: 1000,
        },
      );
    },
  },
  computed: {
    ...mapGetters({
      getOpenBits: 'openbits/getOpenBits',
    }),
    sharesDistributionItems() {
      const adjustedShares = [];
      Object.entries(this.pst.balances).forEach((item, index) => {
        if (index === 0) {
          adjustedShares.push({
            owner: 'owner',
            shares: item[1],
            color: 'owner-color',
          });
        } else if (index === 1) {
          adjustedShares.push({
            owner: item[0],
            shares: item[1],
            color: 'multiverse-color',
          });
        } else if (index === 2) {
          adjustedShares.push({
            owner: 'First Investor',
            shares: item[1],
            color: 'secondary-color',
          });
        } else if (index === 3) {
          adjustedShares.push({
            owner: 'Second Investor',
            shares: item[1],
            color: 'danger',
          });
        } else if (index === 4) {
          adjustedShares.push({
            owner: 'Third Investor',
            shares: item[1],
            color: 'fourth-color',
          });
        } else if (index === 5) {
          adjustedShares.push({
            owner: 'Fourth Investor',
            shares: item[1],
            color: 'third-color',
          });
        }
      });
      return adjustedShares;
    },
  },
  data() {
    return {
      pst: null,
      openbit: null,
      openbitPackageInfo: null,
      sharesDistributionTable: [{
        key: 'owner',
        label: 'Owner',
      }, {
        key: 'shares',
        label: 'Shares',
      }],
    };
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/custom-theme.scss';

  .openbit-info-title, .openbit-shares-info-title {
    border-radius: 5px;
  }
  .copy-to-clipboard {
    cursor: pointer;
  }
</style>
