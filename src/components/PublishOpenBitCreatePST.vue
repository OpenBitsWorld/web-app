<template>
  <b-form>
      <b-form-group
        id="input-group-target-profit"
        label="Your target profit (in AR):"
        label-for="input-target-profit">
        <b-form-input
          id="input-target-profit"
          v-model="targetProfit"
          type="number"
          min="1"
          required
          :disabled="publishingStatus"
          placeholder="Enter Your Target Profit (in AR)"
        ></b-form-input>
      </b-form-group>
      <b-table
        id="finance-table"
        striped
        :items="[{
          targetProfit,
          shares: 100,
          a: pricePerShare,
          b: numberOfInstallationsForTargetProfit,
          c: numberOfInstallationsForSharesDonation,
        }]"
        :fields="tableFields">
        <template v-slot:cell()="data">
          <h3
            class="text-center">
            <b-badge
              variant="main-color">
                {{data.value}}
            </b-badge>
          </h3>
        </template>
      </b-table>
      <b-form-checkbox
          class="mt-4 mb-4 text-center"
          v-model="investments"
          name="allow-investors"
          @change="updateLevelsAvailability()"
          size="lg"
          switch
          :disabled="publishingStatus">
          <h4>
            <b>Allow 4 investors to buy 20 shares of your OpenBit (5 shares for each investor)?</b>
          </h4>
        </b-form-checkbox>
      <b-table
        v-if="investments"
        id="investments-table"
        striped
        :items="levelsWithColorAndNames"
        :fields="tableInvestorsField">
        <template v-slot:cell(name)="data">
          <b-badge
            :variant="data.item.color"
            pill>
            <b>{{ data.item.name.toUpperCase() }}</b>
          </b-badge>
        </template>
        <template v-slot:cell(totalPrice)="data">
          <b>{{ Number(data.item.pricePerShare) * Number(data.item.amountOfShares) }}</b>
        </template>
      </b-table>
  </b-form>
</template>

<script>
import { mapGetters } from 'vuex';
import configs from '@/configs/configs';
import { getInvestmentLevels } from '@/utils/utils';

export default {
  name: 'PublishOpenBitCreatePST',
  props: ['publishingStatus'],
  mounted() {
    this.levels = this.getLevels;
  },
  methods: {
    updateLevelsAvailability() {
      this.levels[0].available = !this.investments;
      this.levels[1].available = !this.investments;
      this.levels[2].available = !this.investments;
      this.levels[3].available = !this.investments;
    },
  },
  computed: {
    ...mapGetters({
      defaultARWallet: 'user/getDefaultARWallet',
    }),
    getLevels() {
      return getInvestmentLevels(this.targetProfit, this.defaultARWallet.address);
    },
    levelsWithColorAndNames() {
      const l = this.getLevels;
      l[0].name = 'Yellow';
      l[0].color = 'secondary-color';
      l[0].textColor = 'white';
      l[1].name = 'Red';
      l[1].color = 'danger';
      l[1].textColor = 'white';
      l[2].name = 'Green';
      l[2].color = 'fourth-color';
      l[2].textColor = 'white';
      l[3].name = 'Blue';
      l[3].color = 'third-color';
      l[3].textColor = 'white';
      return l;
    },
    pricePerShare() {
      return this.targetProfit / 100;
    },
    numberOfInstallationsForSharesDonation() {
      return this.pricePerShare / configs().FEE_FOR_INSTALLATION;
    },
    numberOfInstallationsForTargetProfit() {
      return this.targetProfit / configs().FEE_FOR_INSTALLATION;
    },
  },
  data() {
    return {
      targetProfit: 100,
      feeForInstallation: configs().FEE_FOR_INSTALLATION,
      investments: false,
      levels: null,
      tableFields: [{
        key: 'targetProfit',
        label: 'Your profit target',
      }, {
        key: 'shares',
        label: 'Number of Shares',
      }, {
        key: 'a',
        label: 'Price per Share',
      }, {
        key: 'b',
        label: 'Number of installations to reach your target profit',
      }, {
        key: 'c',
        label: 'Number of installations to release a share to the community',
      }],
      tableInvestorsField: [{
        key: 'name',
        label: 'Name',
      }, {
        key: 'beforeProfit',
        label: 'Available only before you earn',
      }, {
        key: 'amountOfShares',
        label: 'Number of shares that you will sell',
      }, {
        key: 'pricePerShare',
        label: 'Price for each share that you will sell to the investor',
      }, {
        key: 'totalPrice',
        label: 'Total price that the investor will pay to you',
      }, {
        key: 'expectedROI',
        label: 'Expected ROI for the investor',
      }],
    };
  },
};
</script>
