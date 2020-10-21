<template>
  <div
    class="openbit-card-mini my-4 d-block w-100">
    <b-card
      border-variant="white"
      footer-tag="footer">
      <b-card-title
        class="text-left">
        <h3
          v-if="openbit"
          class="d-inline-block">
          <router-link
            class="text-main-color"
            :to="`explore-openbit/${encodeURIComponent(`${openbit.name}@${openbit.version}`)}`">
            {{openbit.name}}
          </router-link>
        </h3>
      </b-card-title>
      <b-card-text
        v-if="pst"
        class="text-left">
        <b-row>
          <b-col lg="3">
            <b>Rewards Target:</b>
          </b-col>
          <b-col align-self="end">
            <b-badge
              variant="main-color">
              {{pst.targetProfit}} AR
            </b-badge>
            <font-awesome-icon
              :id="`shares-rewards-target-tooltip-${pst.ticker}`"
              class="ml-1"
              icon="info-circle" />
            <b-tooltip
              :target="`shares-rewards-target-tooltip-${pst.ticker}`">
              The creator of this OpenBit wants to earn {{pst.targetProfit}} AR
              before donating it to the multiverse.
            </b-tooltip>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="3">
            <b>Rewarded Installations:</b>
          </b-col>
          <b-col align-self="end">
            <b-badge
              variant="main-color">
              {{Math.round(pst.generatedProfit * 100)}} ({{pst.generatedProfit}} AR)
            </b-badge>
            <font-awesome-icon
              :id="`shares-rewarded-installations-tooltip-${pst.ticker}`"
              class="ml-1"
              icon="info-circle" />
            <b-tooltip
              :target="`shares-rewarded-installations-tooltip-${pst.ticker}`">
              When developers install this OpenBit, they can choose to tip its creator
              with 0.01 AR to help she to reach her desired rewards target. Currently
              there were {{Math.round(pst.generatedProfit * 100)}} rewarded instalations,
              so the creator of the OpenBit will reach her rewards target in
              {{getNumberOfInstallationsForMultiverse}} installations.
            </b-tooltip>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="3">
            <b>Ownership Status:</b>
          </b-col>
          <b-col align-self="end">
            <b-progress
              show-progress
              max="100"
              class="ownership-progress mt-1 d-inline-flex">
              <b-progress-bar
                v-for="(b, i) in Object.entries(pst.balances)"
                :value="b[1]"
                :key="i"
                :variant="getProgressVariant(i, b)">
              </b-progress-bar>
            </b-progress>
            <font-awesome-icon
              :id="`shares-ownership-status-tooltip-${pst.ticker}`"
              class="ml-1 d-inline-flex"
              icon="info-circle" />
            <b-tooltip
              class="text-left w-50"
              :target="`shares-ownership-status-tooltip-${pst.ticker}`">
              When the creator of this OpenBit has published it, a
              <a
                href="https://medium.com/@arweave/profit-sharing-tokens-a-new-incentivization-mechanism-for-an-open-web-1f2532411d6e"
                target="_blank"
                class="text-secondary-color">
                Profit Sharing Token
              </a> was created for the package and its creator got 100 shares of it.
              Since the creator chose a rewards target of {{pst.targetProfit}} AR, a share
              of the package will be donated to the multiverse every {{pst.targetProfit}}
              installations. Also the publishers of this OpenBit may have chose to split
              the ownership of this OpenBit with other 4 people.
              Thus, this progress bar is the current status of the ownership of this OpenBit,
              as following: <br/>
              1) The purple is the amount of shares the creator still owns; <br/>
              2) The yellow, the red, the green and the dark blue, if present they
                 are the amount of shares the creators has given to other people; <br/>
              3) The light blue, if present, is the amount of shares that was already donated
                 to the multiverse.
            </b-tooltip>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="3">
            <b>Shares Available: </b>
          </b-col>
          <b-col align-self="end">
             <h6
              v-if="pst"
              class="d-inline-block align-middle">
              <b-badge
                :variant="
                getCurrentLevel.status !== 'Multiverse' ? 'success' : 'danger' ">
                <b v-if="getCurrentLevel.status !== 'Multiverse'">
                  Yes
                </b>
                <b v-else>
                  No
                </b>
              </b-badge>
              <font-awesome-icon
                :id="`shares-status-tooltip-${pst.ticker}`"
                class="ml-1"
                icon="info-circle" />
              <b-tooltip
                :target="`shares-status-tooltip-${pst.ticker}`">
                If the creator of this OpenBit chose to allow
                other people to buy shares of this OpenBits, you could
                be allowed to obtain them if they are still available.
                Click on the OpenBit's title on the left to visit the
                OpenBit's page and learn how to do so.
              </b-tooltip>
            </h6>
          </b-col>
        </b-row>
      </b-card-text>
      <b-card-text
        v-else>
        <b-row>
          <b-col lg="3">
            <b>Rewards Target:</b>
          </b-col>
          <b-col>
            <b-skeleton animation="wave" width="15%" variant="multiverse-color"></b-skeleton>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="3">
            <b>Rewarded Installations:</b>
          </b-col>
          <b-col>
            <b-skeleton animation="wave" width="15%" variant="multiverse-color"></b-skeleton>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="3">
            <b>Ownership Status:</b>
          </b-col>
          <b-col>
            <b-skeleton animation="wave" width="95%" variant="multiverse-color"></b-skeleton>
          </b-col>
        </b-row>
        <b-row>
          <b-col lg="3">
            <b>Shares Available: </b>
          </b-col>
          <b-col>
            <b-skeleton animation="wave" width="5%" variant="multiverse-color"></b-skeleton>
          </b-col>
        </b-row>
      </b-card-text>
    </b-card>
    <hr class="openbit-card-hr" />
  </div>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { readContract } from 'smartweave';
import config from '@/mixins/configs';

export default {
  name: 'OpenBitCardMini',
  props: ['openbits'],
  mixins: [config],
  async mounted() {
    // get the OpenBit PST status
    this.openbit = this.openbits.pop();
    const OpenBitPST = await readContract(Vue.$arweave.node, this.openbit.pstId);
    this.pst = OpenBitPST;
    this.buySharesTransaction = null;
  },
  data() {
    return {
      openbit: null,
      pst: null,
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
          const currentLevel = passedLevels[0];
          if (!currentLevel) {
            return {
              status: 'Multiverse',
              headerBg: 'multiverse-color',
              headerText: 'text-white',
            };
          }
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
        if (
          this.defaultARWallet
          && this.defaultARWallet.address === this.openbit.ownedBy) {
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
          return 'dark';
      }
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../assets/styles/custom-theme.scss';

  .openbit-card-hr {
    border-top-color: $multiverse-color;
  }
  .ownership-progress {
    width: 95%;
  }
</style>
