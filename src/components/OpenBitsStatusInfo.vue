<template>
  <b-container>
    <b-badge
      class="w-100 px-2 mt-5 mb-2 py-2"
      variant="multiverse-color">
      <h4 v-if="$route.name==='ExploreOpenBits'">OpenBits Status</h4>
      <h4 v-else-if="openbit && openbit !== 'not-found'">{{openbit.name}} Status</h4>
      <h4 v-else-if="openbit === 'not-found'">Unexistant OpenBit</h4>
    </b-badge>
    <div v-if="
      pst && openbit && (pst !== 'not-found' && openbit !== 'not-found')">
      <div
        v-if="$route.name !== 'ExploreOpenBits'">
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
      </div>
      <h6>Target Profit</h6>
      <b-badge
        class="mb-2"
        variant="main-color">{{pst.targetProfit}} AR</b-badge>
      <h6>Generated Profit</h6>
      <b-badge
        class="mb-2"
        variant="main-color">{{parseFloat(pst.generatedProfit).toFixed(2)}} AR</b-badge>
      <h6>Next share relased to the multiverse in:</h6>
      <b-badge
        class="mb-2"
        variant="main-color">{{pst.sharesReleaseIn}} Installations</b-badge>
      <h4>Shares Distribution</h4>
      <hr />
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
    },
  },
  /* async mounted() {
    this.$store.watch(
      () => this.$store.getters['openbits/openbits'],
      (openbits) => {
        console.log(openbits);
      },
      /* async (getters) => {
        if (getters && getters.openbits.openbits.length) {
          // console.log(true);
          const OpenBitsPSTStatus = await readContract(
            Vue.$arweave.node,
            this.getCurrentOpenBitAddress(),
          );
          this.pst = OpenBitsPSTStatus;
          this.openbit = this.getCurrentOpenBit();
        }
      },
    );
  }, */
  methods: {
    reverseVersionsList() {
      const list = this.getAllVersionsOfCurrentOpenBit();
      return list.reverse();
    },
    goToAnotherVersion(version) {
      console.log(version);
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
