<template>
  <b-container>
    <b-button
      class="right m-3"
      variant="main-color"
      @click="$router.push('publish-obit')">
      Create a New OpenBit
    </b-button>
    <b-card-group class="mt-3" deck>
      <b-card
        v-for="pack in getUserPackages"
        :key="pack.packageAddress"
        class="text-center"
        header-bg-variant="secondary-color"
        border-variant="main-color"
        text-variant="dark"
        :header="pack.packageJSON.name">
        <b-card-text>
          <h6>Version {{pack.packageJSON.version}}</h6>
          <h6>{{pack.packageJSON.repository.url}}</h6>
          <h6>PST name: {{pack.statePST.ticker}}</h6>
          <h6>Total Amount of PST:
            <b-badge variant="secondary-color">{{pack.totalPST}}</b-badge>
          </h6>
          <h6>Shares Distribution</h6>
          <div v-for="b in pack.weightedBalances" :key="b.address">
            <h6>{{b.address}} : {{b.amount}}</h6>
            <b-progress
            :value="b.amount"
            :max="pack.totalPST"
            show-progress
            animated
            variant="main-color"></b-progress>
          </div>
        </b-card-text>
        <b-button href="#" variant="primary">Go somewhere</b-button>
      </b-card>
    </b-card-group>
  </b-container>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { readContract } from 'smartweave';

export default {
  name: 'UserOBits',
  async mounted() {
    if (this.defaultARWallet) {
      const userPackagesOnArweave = await this.$arUtilsExecArQL({
        op: 'and',
        expr1: {
          op: 'equals',
          expr1: 'from',
          expr2: this.defaultARWallet.address,
        },
        expr2: {
          op: 'and',
          expr1: {
            op: 'equals',
            expr1: 'type',
            expr2: 'npm-package',
          },
          expr2: {
            op: 'equals',
            expr1: 'tpaga',
            expr2: 'yes',
          },
        },
      });
      userPackagesOnArweave.forEach(async (t) => {
        const st = await this.$arUtilsGetTransactionStatus(t);
        if (st.status === 200) {
          // get transaction
          const tx = await Vue.$arweave.node.transactions.get(t);
          // get transaction tags
          const tags = await tx.get('tags');

          // decode all tags
          const decodedTags = {};

          tags.forEach((tag) => {
            decodedTags[tag.get('name', { decode: true, string: true })] = tag.get('value', { decode: true, string: true });
          });

          // get the package PST state
          const statePST = await readContract(Vue.$arweave.node, decodedTags.pst);
          // eslint-disable-next-line no-unused-vars
          const totalPst = Object
            .entries(statePST.balances)
            .map((k) => k[1])
            .reduce((a, b) => a + b);
          const weightedBalances = Object
            .entries(statePST.balances)
            .map((share) => (
              {
                address: share[0],
                percentage: (share[1] * 100) / totalPst,
                amount: share[1],
              }
            ));

          const pack = {
            packageAddress: t,
            packageJSONAddress: decodedTags.packageJSONAddress,
            packageJSON: JSON.parse(await this.$arUtilsTransactionGetData(
              decodedTags.packageJSONAddress,
              true,
              true,
            )),
            packagePST: decodedTags.pst,
            statePST,
            totalPST: totalPst,
            weightedBalances,
          };

          const storedPackages = this.getUserPackages.map((p) => p.packageAddress);
          if (storedPackages.indexOf(t) === -1) {
            this.addUserPackage(pack);
          }
        }
      });
    }
  },
  computed: {
    ...mapGetters({
      defaultARWallet: 'user/getDefaultARWallet',
      getUserPackages: 'user/getUserPackages',
    }),
  },
  methods: {
    ...mapActions({
      addUserPackage: 'user/addUserPackage',
    }),
  },
};
</script>
