<template>
  <b-container>
    <b-badge
      class="w-100 px-2 mt-5 mb-2 py-2"
      variant="multiverse-color">
      <h4>OpenBits Status</h4>
    </b-badge>
    <div v-if="pst">
      <h6>Target Profit</h6>
      <b-badge
        class="mb-2"
        variant="main-color">{{pst.targetProfit}} AR</b-badge>
      <h6>Generated Profit</h6>
      <b-badge
        class="mb-2"
        variant="main-color">{{pst.generatedProfit}} AR</b-badge>
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
    <div v-else>
      <h5>Loading OpenBits status ... this may take some dozen of secs ...</h5>
      <LoadingSpinner class="d-block mx-auto" />
    </div>
  </b-container>
</template>

<script>
import Vue from 'vue';
import { readContract } from 'smartweave';
import LoadingSpinner from '@/components/LoadingSpinner.vue';

export default {
  name: 'OpenBitsStatusInfo',
  props: ['pstAddress'],
  components: {
    LoadingSpinner,
  },
  async mounted() {
    // get the openbits PST Status
    const OpenBitsPSTStatus = await readContract(Vue.$arweave.node, this.pstAddress);
    this.pst = OpenBitsPSTStatus;
  },
  methods: {
    getProgressVariant(i) {
      switch (i) {
        case 0:
          return 'dark';
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
          return 'dark';
      }
    },
  },
  computed: {
    sharesDistributionItems() {
      const adjustedShares = [];
      Object.entries(this.pst.balances).forEach((item, index) => {
        if (index === 0) {
          adjustedShares.push({
            owner: 'owner',
            shares: item[1],
            color: 'dark',
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
