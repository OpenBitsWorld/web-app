<template>
  <b-card
    class="openbit-card text-center m-4"
    border-variant="dark"
    header-tag="header"
    footer-tag="footer">
    <template v-slot:header>
      <h5>
        {{openbit.name}}@{{openbit.version}}
      </h5>
    </template>
    <b-card-text
      v-if="pst">
      <!-- <h4>Usage Info</h4>
      <hr /> -->
      <b-table
        id="profits-table"
        striped
        :items="[pst]"
        :fields="tableProfits">
        <template v-slot:cell()="data">
          <h3
            class="text-center">
            <b-badge
              v-if="data.field.key !== 'currentLevel'"
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
            <b-badge
              v-else
              :variant="getCurrentLevel.headerBg">
                  <b>
                    <font-awesome-icon
                      icon="award" />
                    {{getCurrentLevel.status.toUpperCase()}}
                  </b>
            </b-badge>
          </h3>
        </template>
      </b-table>
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
      <h4>Status</h4>
      <hr />
      <div
        v-if="openBitStatus.status === 'multiverse' || openBitStatus.status === 'owned'">
        <h5>
          <font-awesome-icon
            class="text-multiverse-color"
            icon="hand-spock" />
          This OpenBit will be entirely owned by the multiverse whitin
          {{getNumberOfInstallationsForMultiverse}}
          installations!
          <font-awesome-icon
            class="text-multiverse-color"
            icon="hand-spock" />
        </h5>
      </div>
      <div
        v-else>
        <h5>
          <b-badge
            :variant="openBitStatus.headerBg">
            <b>
              THE {{openBitStatus.status.toUpperCase()}}
              INVESTMENT WILL BE AVAILABLE FOR THIS OPENBIT UNTIL THE NEXT
              {{getNumberOfInstallationsForNextLevel}}
              INSTALLATIONS
            </b>
          </b-badge>
        </h5>
        <b-button
          class="mt-2"
          variant="main-color">
          <b>
            Buy {{openBitStatus.currentLevel.amountOfShares}}
            shares of this OpenBit for
            {{openBitStatus.currentLevel.pricePerShare * openBitStatus.currentLevel.amountOfShares}}
            AR
          </b>
        </b-button>
        <h6
          class="mt-2">
          <strong>
            <font-awesome-icon
              icon="award" />
            If the OpenBit reaches its profit target you will earn
            {{openBitStatus.currentLevel.expectedROI}} AR
            <font-awesome-icon
              icon="award" />
          </strong>
        </h6>
      </div>
    </b-card-text>
    <b-card-text
      v-else>
      <LoadingSpinner />
    </b-card-text>
  </b-card>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { readContract } from 'smartweave';
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import config from '@/mixins/configs';

export default {
  name: 'OpenBitCard',
  props: ['openbit'],
  mixins: [config],
  components: {
    LoadingSpinner,
  },
  async mounted() {
    // get the OpenBit PST status
    const OpenBitPST = await readContract(Vue.$arweave.node, this.openbit.pstId);
    this.pst = OpenBitPST;
  },
  data() {
    return {
      pst: null,
      tableProfits: [{
        key: 'currentLevel',
        label: 'Current Level',
      }, {
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
    ...mapGetters({
      defaultARWallet: 'user/getDefaultARWallet',
    }),
    getNumberOfInstallationsForMultiverse() {
      if (this.pst) {
        const numberOfInstallation = (this.pst.targetProfit - this.pst.generatedProfit)
          / this.config.FEE_FOR_INSTALLATION;
        return Math.round(numberOfInstallation);
      }
      return 'calculating';
    },
    getNumberOfInstallationsForNextLevel() {
      if (this.pst) {
        const installationsForNextLevel = (
          this.openBitStatus.currentLevel.beforeProfit - this.pst.generatedProfit)
         / this.config.FEE_FOR_INSTALLATION;
        return Math.round(installationsForNextLevel);
      }
      return 'calculating';
    },
    getLevels() {
      if (this.pst) {
        return this.pst.sharesAvailableForInvestors.levels;
      }
      return [];
    },
    getCurrentLevel() {
      if (this.pst) {
        // get the investments and the owner
        const {
          sharesAvailableForInvestors,
        } = this.pst;
        if (this.pst.generatedProfit < this.pst.targetProfit) {
          const passedLevels = sharesAvailableForInvestors.levels.filter((l) => (
            l.available
          ));
          const currentLevel = passedLevels[passedLevels.length - 1];
          return {
            status: currentLevel.name,
            headerBg: currentLevel.color,
            headerText: (currentLevel.name !== 'yellow') ? 'text-white' : 'text-dark',
          };
        }
        return {
          status: 'Multiverse',
          headerBg: 'multiverse-color',
          headerText: 'text-white',
        };
      }
      return {};
    },
    openBitStatus() {
      if (this.pst) {
        // get the investments and the owner
        const {
          sharesAvailableForInvestors,
        } = this.pst;
        // the openbit is owned by the user
        if (this.defaultARWallet.address === this.openbit.ownedBy) {
          return {
            status: 'owned',
            headerBg: 'dark',
            headerText: 'text-white',
            actions: null,
          };
        }
        const currentLevel = sharesAvailableForInvestors.levels.filter((l) => (
          l.available
        ))[0];
        if (currentLevel) {
          return {
            status: currentLevel.name,
            headerBg: currentLevel.color,
            headerText: (currentLevel.name !== 'yellow') ? 'text-white' : 'text-dark',
            currentLevel,
          };
        }
        return {
          status: 'multiverse',
          headerBg: 'multiverse-color',
          headerText: 'text-white',
          action: 'Going to the multiverse',
        };
      }
      return {};
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
    width:100%!important;
    min-width:930px!important;
  }
</style>
