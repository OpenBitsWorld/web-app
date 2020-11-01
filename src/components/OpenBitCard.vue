<template>
  <b-card
    class="openbit-card text-center m-4"
    border-variant="dark"
    header-tag="header"
    footer-tag="footer">
    <template v-slot:header>
      <router-link :to="{
          name: 'ExploreOpenBit',
          params: {
            id: openbit.name,
          }
        }">
        <h5 v-if="openbit">
          {{openbit.name}}@{{openbit.version}}
        </h5>
      </router-link>
    </template>
    <b-card-text
      v-if="pst">
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
                {{Math.round(pst.generatedProfit * 100)}}
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
          variant="main-color"
          :disabled="buyingShares"
          @click="buySharesForCurrentLevel">
          <b>
            <b-spinner
              small
              v-if="buyingShares"
              variant="secondary-color"
              type="grow"
              label="Spinning"></b-spinner>
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
    <b-modal
      v-if="buySharesTransaction"
      :id="`modal-buying-shares-${openbit.name}`"
      :ref="`modalBuyingShares${openbit.name}`"
      @show="resetModal"
      @hidden="cancelBuyShares"
      @ok="handleConfirmBuyShares"
      @close="cancelBuyShares"
      @cancel="cancelBuyShares"
      centered
      hide-footer
      size="xl"
    >
      <template v-slot:modal-title>
        You are going to buy
        {{getCurrentLevelForModal.amountOfShares}} shares of
        {{openbit.name}}@{{openbit.version}}
      </template>
      <b-table
        id="profits-table"
        striped
        :fields="modalTableFields"
        :items="modalTableItems">
         <template v-slot:cell()="data">
          <h3
            class="text-center">
            <b-badge
              variant="main-color">
              {{data.value}} AR
            </b-badge>
          </h3>
        </template>
      </b-table>
      <h3 class="my-3 text-center">
        To confirm and buy {{getCurrentLevelForModal.amountOfShares}} shares of
        {{openbit.name}}@{{openbit.version}} write:
        <b-badge
          class="d-block my-3"
          v-if="randomWordToConfirmBuyShares"
          variant="secondary-color">
          <h4>{{randomWordToConfirmBuyShares.toUpperCase()}}</h4>
        </b-badge>
       </h3>
      <form
        v-if="randomWordToConfirmBuyShares"
        :ref="`form-${openbit.name}-${openbit.version}`">
        <b-form-group
          :state="confirmBuySharesState"
          :invalid-feedback="`To confirm and buy shares you have to write
          ${randomWordToConfirmBuyShares.toUpperCase()}`"
        >
          <b-form-input
            id="confirm-buy-shares-input"
            v-model="confirmBuySharesInput"
            :state="confirmBuySharesState"
            :placeholder="`Write ${randomWordToConfirmBuyShares.toUpperCase()} to confirm!`"
            @keyup="checkConfirmValidity() ? handleConfirmBuySharesSubmitForm() : false;"
            required
          ></b-form-input>
        </b-form-group>
      </form>
    </b-modal>
    <b-alert
      v-model="notEnoughARAlert"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="danger"
      dismissible
    >
      <font-awesome-icon
        class="text-danger" icon="sad-tear" size="2x"/>
      <h5 class="d-inline-block mx-2">
        You do not have enough AR to buy shares of this OpenBit</h5>
      <font-awesome-icon class="text-danger" icon="sad-tear" size="2x" />
    </b-alert>
    <b-alert
      v-if="getCurrentLevelForModal && openbit && buySharesTransaction"
      v-model="buySharesTransactionPending"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="secondary-color"
      dismissible
    >
      <LoadingSpinner />
      <h5 class="d-inline-block mx-2">
        You have bought {{getCurrentLevelForModal.amountOfShares}}
        shares of {{openbit.name}}@{{openbit.version}}.
        The transaction id is {{buySharesTransaction.id}}.
        Awaiting for confirmation.
      </h5>
      <LoadingSpinner />
    </b-alert>
    <b-alert
      v-if="getCurrentLevelForModal && openbit && buySharesTransaction"
      v-model="buySharesTransactionSuccess"
      class="position-fixed fixed-bottom m-0 rounded-0"
      style="z-index: 2000;"
      variant="fourth-color"
      dismissible
    >
      <font-awesome-icon
        class="ml-2 text-main-color" icon="rocket" size="2x"/>
      <h5 class="d-inline-block mx-2">
        Amazing! You have bought {{getCurrentLevelForModal.amountOfShares}}
        shares of {{openbit.name}}@{{openbit.version}}.
        The transaction id is {{buySharesTransaction.id}}.
      </h5>
      <font-awesome-icon class="mr-2 text-main-color" icon="rocket" size="2x" />
    </b-alert>
  </b-card>
</template>

<script>
import Vue from 'vue';
import { mapGetters } from 'vuex';
import { readContract } from 'smartweave';
import Sentencer from 'sentencer';
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
    this.buySharesTransaction = null;
  },
  data() {
    return {
      pst: null,
      buyingShares: false,
      notEnoughARAlert: false,
      buySharesTransaction: null,
      buySharesTransactionPending: false,
      buySharesTransactionSuccess: false,
      buySharesTotalCost: 0,
      buySharesExpectedROI: 0,
      buySharesBalanceAfter: 0,
      confirmBuySharesInput: '',
      confirmBuySharesState: null,
      randomWordToConfirmBuyShares: null,
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
      modalTableFields: [{
        key: 'buySharesTotalCost',
        label: 'Total Cost to buy these shares',
      }, {
        key: 'buySharesBalanceAfter',
        label: 'Your AR balance after buying these shares will be',
      }, {
        key: 'buySharesExpectedROI',
        label: 'When the OpenBit reaches its profit target you will earn',
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
    getCurrentLevelForModal() {
      if (this.pst) {
        // get the investments and the owner
        const {
          sharesAvailableForInvestors,
        } = this.pst;
        const passedLevels = sharesAvailableForInvestors.levels.filter((l) => (
          l.available
        ));
        const currentLevel = passedLevels[0];
        return currentLevel;
      }
      return {};
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
    modalTableItems() {
      return [{
        buySharesTotalCost: this.buySharesTotalCost,
        buySharesBalanceAfter: this.buySharesBalanceAfter,
        buySharesExpectedROI: this.buySharesExpectedROI,
      }];
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
    // isOwnerOrInvestor() {
    // get the current user
    // }
    async buySharesForCurrentLevel() {
      // get the current level
      if (this.pst) {
        this.buyingShares = true;
        const {
          sharesAvailableForInvestors,
        } = this.pst;
        const currentLevel = sharesAvailableForInvestors.levels.filter((l) => (
          l.available
        ))[0];
        const indexOfCurrentLevel = sharesAvailableForInvestors.levels.indexOf(currentLevel);

        // get the cost of the investment
        const sharesCost = (currentLevel.amountOfShares * currentLevel.pricePerShare).toString();

        // this is a blocking transaction, I will use the arweave.createTransaction directly
        const transaction = await Vue.$arweave.node.createTransaction({
          target: currentLevel.owner,
          quantity: await Vue.$arweave.node.ar.arToWinston(sharesCost),
        }, this.defaultARWallet.jwk);

        transaction.addTag('dApp', 'OpenBits');
        transaction.addTag('type', 'buy-openbit-shares');
        transaction.addTag('openbit-name', `${this.pst.ticker}`);
        transaction.addTag('App-Name', 'SmartWeaveAction');
        transaction.addTag('App-Version', '0.3.0');
        transaction.addTag('Contract', this.openbit.pstId);
        transaction.addTag('Input', JSON.stringify({
          function: 'buy',
          level: indexOfCurrentLevel,
        }));

        await Vue.$arweave.node.transactions.sign(transaction, this.defaultARWallet.jwk);

        this.buySharesTransaction = transaction;
        // get the total cost of the transaction
        this.buySharesTotalCost = await Vue.$arweave.node.ar.winstonToAr(
          Number(transaction.reward) + Number(transaction.quantity),
        );
        // check of the owner has enough AR
        if (this.defaultARWallet.balanceAR < this.buySharesTotalCost) {
          this.notEnoughARAlert = true;
          this.buyingShares = false;
          return false;
        }
        // create the random word to confirm shares bought
        this.randomWordToConfirmBuyShares = Sentencer.make('{{noun}}');
        this.buySharesBalanceAfter = Number(this.defaultARWallet.balanceAR)
          - Number(this.buySharesTotalCost);
        this.buySharesExpectedROI = currentLevel.expectedROI;
        this.$bvModal.show(`modal-buying-shares-${this.openbit.name}`);
        return true;
      }
      return false;
    },
    resetModal() {
      this.confirmBuySharesInput = '';
      this.confirmBuySharesState = null;
    },
    cancelBuyShares() {
      this.confirmBuySharesInput = '';
      this.confirmBuySharesState = null;
      this.buyingShares = false;
      this.buySharesTotalCost = 0;
      this.buySharesExpectedROI = 0;
      this.buySharesBalanceAfter = 0;
      this.randomWordToConfirmBuyShares = null;
    },
    checkConfirmValidity() {
      const valid = this.$refs[`form-${this.openbit.name}-${this.openbit.version}`].checkValidity();
      this.confirmBuySharesState = (valid
        && (this.confirmBuySharesInput.toUpperCase()
        === this.randomWordToConfirmBuyShares.toUpperCase()));
      return this.confirmBuySharesState;
    },
    handleConfirmBuyShares(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleConfirmBuySharesSubmitForm();
    },
    async handleConfirmBuySharesSubmitForm() {
      this.$bvModal.hide(`modal-buying-shares-${this.openbit.name}`);
      this.buySharesTransactionPending = true;
      await Vue.$arweave.node.transactions.post(this.buySharesTransaction);
      const bstId = this.buySharesTransaction.id;
      const interval = setInterval(async () => {
        const status = await Vue.$arweave.node.transactions.getStatus(bstId);
        if (status && status.status === 200) {
          this.buySharesTransactionPending = false;
          this.buySharesTransactionSuccess = true;
          clearInterval(interval);
        } else {
          this.buySharesTransactionPending = true;
          this.buySharesTransactionSuccess = false;
        }
      }, 5000);
      return true;
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
