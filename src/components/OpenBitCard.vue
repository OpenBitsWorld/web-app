<template>
  <b-card
    class="text-center m-2 w-50 "
    header-bg-variant="main-color"
    header-tag="header">
    <template v-slot:header>
      <h5>
        {{openbit.name}}@{{openbit.version}}
      </h5>
    </template>
    <b-card-text>
      <h6 class="text-center">
        Available Investments
      </h6>
      <b-badge
        v-for="level in getLevels"
        :key="level.name"
        class="ml-2"
        :variant="level.color"
      >
        {{level.name.toUpperCase()}}
      </b-badge>
    <!--   <b-badge class="mb-1 w-100" variant="main-color">
        <h6>OpenBit Info</h6>
      </b-badge>
      <b-badge class="mb-1 w-100" variant="secondary-color">
        <p>Repository</p>
        {{obit.obitJSON.repository.url}}
      </b-badge>
      <b-badge class="ml-1" variant="dark">
        <p>Version</p>
        {{obit.obitJSON.version}}
      </b-badge>
      <b-badge class="ml-1" variant="dark">
        <p>Owner</p>
        {{obit.obitOwner}}
      </b-badge>
      <b-badge class="ml-1 mr-1" variant="dark">
        <p>Type</p>
        {{obit.obitType}}
      </b-badge>
      <b-badge class="mb-1 mt-3 w-100" variant="main-color">
        <h6>Profit Share Token (PST) Info</h6>
      </b-badge>
      <b-badge class="mb-1 w-100" variant="secondary-color">
        <p>Address</p>
        {{obit.obitPST}}
      </b-badge>
      <b-badge class="ml-1" variant="dark">
        <p>Name</p>
        {{obit.statePST.ticker}}
      </b-badge>
      <b-badge class="ml-1 mr-1" variant="dark">
        <p>Total Amount</p>
        {{obit.totalPST}}
      </b-badge> -->

      <h6>Shares Distribution</h6>
      <!-- <shares-chart
        :styles="chartStyles"
        class="obit-shares-chart"
        :chartdata="sharesChartData"
        :chartoptions="sharesChartOptions"></shares-chart> -->
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
  },
  data() {
    return {
      pst: null,
    };
  },
  computed: {
    getLevels() {
      if (this.pst) {
        const available = this.pst.sharesAvailableForInvestors.levels.map((l) => {
          if (l.available) {
            return l;
          }
          return {};
        });
        available[2].available = false;
        return available;
      }
      return [];
    },
  },
  /* components: {
    SharesChart,
  },
  beforeMount() {
    // console.log(this.obit.weightedBalances);
    this.obit.weightedBalances.forEach((b, i) => {
      this.sharesChartData.datasets[0].data.push(b.percentage);
      if (i === 0) {
        this.sharesChartData.datasets[0].backgroundColor.push('#343a40');
        this.sharesChartData.labels.push('owner');
      } else {
        this.sharesChartData.datasets[0].backgroundColor.push(randomRgba());
        this.sharesChartData.labels.push(b.address);
      }
    });
  },
  data() {
    return {
      chartStyles: {
      },
      sharesChartData: {
        datasets: [{
          data: [],
          barPercentage: 0.5,
          barThickness: 6,
          maxBarThickness: 8,
          minBarLength: 2,
          backgroundColor: [
          ],
        }],
        labels: [
        ],
      },
      sharesChartOptions: {
        responsive: true,
      },
    };
  },
  methods: {
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    },
  }, */
};
</script>
