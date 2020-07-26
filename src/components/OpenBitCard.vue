<template>
  <b-card
    class="openbit-card text-center m-2"
    header-tag="header">
    <template v-slot:header>
      <h5>
        {{openbit.name}}@{{openbit.version}}
      </h5>
    </template>
    <b-card-text>
      <b-table
        id="profits-table"
        striped
        :items="[pst]"
        :fields="tableProfits">
        <template v-slot:cell()="data">
          <h3
            class="text-center">
            <b-badge
              variant="main-color">
                <span
                  v-if="data.field.key === 'targetProfit' || data.field.key === 'generatedProfit'">
                {{data.value}}
                </span>
                <span
                  v-else-if="data.field.key === 'uniqueUsers'">
                {{Object.keys(pst.users).length}}
                </span>
                <span
                  v-else-if="data.field.key === 'numberOfInstallations'">
                {{pst.generatedProfit * 100}}
                </span>
                <span
                 v-if="data.field.key === 'targetProfit' || data.field.key === 'generatedProfit'">
                 AR
                </span>
            </b-badge>
          </h3>
        </template>
      </b-table>
      <h4>Shares Distribution</h4>
      <b-progress
        v-if="pst"
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
    </b-card-text>
    <b-button href="#" variant="main-color">Buy a Share</b-button>
  </b-card>
</template>

<script>
import Vue from 'vue';
import { readContract } from 'smartweave';

// import SharesChart from '@/utils/OBitCardSharesChart';
// import { randomRgba } from '@/utils/utils';

export default {
  name: 'OpenBitCard',
  props: ['openbit'],
  async mounted() {
    // get the OpenBit PST status
    const OpenBitPST = await readContract(Vue.$arweave.node, this.openbit.pstId);
    this.pst = OpenBitPST;
    console.log(this.pst);
  },
  data() {
    return {
      pst: null,
      tableProfits: [{
        key: 'targetProfit',
        label: 'Target Profit',
      }, {
        key: 'generatedProfit',
        label: 'Generated Profit',
      }, {
        key: 'numberOfInstallations',
        label: 'Number of Installations',
      }, {
        key: 'uniqueUsers',
        label: 'Unique Users',
      }],
      sharesDistributionTable: [{
        key: 'owner',
        label: 'Owner',
      }, {
        key: 'shares',
        label: 'Shares',
      }],
    };
  },
  computed: {
    getLevels() {
      if (this.pst) {
        return this.pst.sharesAvailableForInvestors.levels;
      }
      return [];
    },
    sharesDistributionItems() {
      const adjustedShares = [];
      Object.entries(this.pst.balances).forEach((item, index) => {
        if (index === 0) {
          adjustedShares.push({
            owner: item[0],
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
            owner: item[0],
            shares: item[1],
            color: 'secondary-color',
          });
        } else if (index === 3) {
          adjustedShares.push({
            owner: item[0],
            shares: item[1],
            color: 'danger',
          });
        } else if (index === 4) {
          adjustedShares.push({
            owner: item[0],
            shares: item[1],
            color: 'fourth-color',
          });
        } else if (index === 5) {
          adjustedShares.push({
            owner: item[0],
            shares: item[1],
            color: 'third-color',
          });
        }
      });
      return adjustedShares;
    },
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
};
</script>

<style lang="scss">
  .openbit-card{
    display: inline-block!important;
    width:48%!important;
    min-width:496px!important;
  }
</style>
