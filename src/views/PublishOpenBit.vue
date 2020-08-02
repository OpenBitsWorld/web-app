<template>
  <b-container id="create-obit-page" class="mt-3 p-3">
    <PublishOpenBitInfo />
    <vue-dropzone
      ref="publish-openbit-dropzone"
      id="publish-openbit-dropzone"
      :hidden="file"
      :useCustomSlot="true"
      :options="dropzoneOptions">
      <div class="dropzone-custom-content">
        <h1>
          <b-icon icon="upload"></b-icon>
        </h1>
        <h3 class="dropzone-custom-title">
         Drop your Node package here or click to select it from your computer.
        </h3>
        <div class="subtitle">
          You should have creted your package by using the npm cli or the OpenBits cli,
          for instance by running these commands in your package root folder:
          <div class="mt-1 mb-1">
            <kbd>openbits pack --type node-package</kbd> or <kbd>npm pack </kbd>
          </div>
          Read more on how to pack your node package <router-link to="/home">here</router-link>.
        </div>
      </div>
    </vue-dropzone>
    <div v-if="file">
      <b-card
        border-variant="dark"
        bg-variant="white"
        text-variant="dark"
        footer-tag="footer"
        header-tag="header">
        <template
          v-slot:header>
          <h4>{{file.name}}
            <b-badge
              v-if="transactionInfo &&
              transactionInfo.arTransaction
              && transactionInfo.arTransaction.id"
              variant="secondary-color"
              pill>
              {{transactionInfo.arTransaction.id}}
            </b-badge>
          </h4>
        </template>
        <b-card-text v-if="packageExists">
          <b-alert
            show
            variant="danger">
            <h4>Package Already Exists!</h4>
            <p>
              An OpenBit with the same name and version was already published on OpenBits!
            </p>
          </b-alert>
        </b-card-text>
        <b-card-text v-else>
          <PublishOpenBitCreatePST
            :publishingStatus="publishingStatus"
            ref="openbit-economy"/>
          <div v-if="transactionInfo">
            <b-list-group>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center text-dark">
                PST arweave address
                <b-badge
                  v-if="PSTArweaveAddress"
                  variant="secondary-color"
                  pill>
                  {{PSTArweaveAddress}}
                </b-badge>
                <SpinningBadge
                  v-else
                  badgeVariant="secondary-color"
                  spinnerVariant="dark" />
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center text-dark">
                PST fee for miners
                <b-badge
                  v-if="PSTMinersReward"
                  variant="secondary-color"
                  pill>
                  {{PSTMinersReward}}
                </b-badge>
                <SpinningBadge
                  v-else
                  badgeVariant="secondary-color"
                  spinnerVariant="dark" />
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center text-dark">
                OpenBit arweave address
                <b-badge
                  v-if="OpenBitArweaveAddress"
                  variant="secondary-color"
                  pill>
                  {{OpenBitArweaveAddress}}
                </b-badge>
                <SpinningBadge
                  v-else
                  badgeVariant="secondary-color"
                  spinnerVariant="dark" />
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center text-dark">
                OpenBit reward for miners
                <b-badge
                  v-if="OpenBitMinersReward"
                  variant="secondary-color"
                  pill>
                  {{OpenBitMinersReward}}
                </b-badge>
                <SpinningBadge
                  v-else
                  badgeVariant="secondary-color"
                  spinnerVariant="dark" />
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center text-dark">
                OpenBits fee
                <b-badge
                  v-if="this.config.FEE_FOR_PUBLICATION"
                  variant="secondary-color"
                  pill>
                  {{this.config.FEE_FOR_PUBLICATION}}
                </b-badge>
                <SpinningBadge
                  v-else
                  badgeVariant="secondary-color"
                  spinnerVariant="dark" />
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center text-dark">
                Total Cost to publish your OpenBit
                <b-badge
                  v-if="OpenBitTotalPublicationCost"
                  variant="secondary-color"
                  pill>
                  {{OpenBitTotalPublicationCost}}
                </b-badge>
                <SpinningBadge
                  v-else
                  badgeVariant="secondary-color"
                  spinnerVariant="dark" />
              </b-list-group-item>
              <b-list-group-item
                class="d-flex justify-content-between align-items-center text-dark">
                Publication Status
                <b-badge
                  v-if="transactionInfo.enrichedTransaction"
                  variant="secondary-color" pill>
                    <span
                      v-if="
                        this.$arGetARTransactionsQueue[1]
                          .enrichedTransaction
                          .transactionStatus
                          .status === 404">
                      Awaiting for confirmation
                    </span>
                    <span
                      v-else-if="
                        this.$arGetARTransactionsQueue[1]
                          .enrichedTransaction
                          .transactionStatus
                          .status === 202
                      ">
                      Publication Pending
                      <b-spinner small variant="dark" type="grow" label="Spinning"></b-spinner>
                    </span>
                     <span
                      v-if="
                        this.$arGetARTransactionsQueue[1]
                          .enrichedTransaction
                          .transactionStatus
                          .status === 200">
                      Confirmed
                    </span>
                </b-badge>
                <SpinningBadge
                  v-else
                  badgeVariant="secondary-color"
                  spinnerVariant="dark" />
              </b-list-group-item>
            </b-list-group>
          </div>
        </b-card-text>
        <template
          v-slot:footer>
          <b-button
            variant="danger"
            @click="removeFile()">
            Cancel
          </b-button>
          <b-button
            v-if="!packageExists"
            :variant="(
              !transactionInfo
              || transactionInfo === 'preparing to publish...') ? 'main-color' : 'success'"
            class="float-right"
            :disabled="
              transactionInfo === 'preparing to publish...' ||
              ( transactionInfo &&
                transactionInfo.enrichedTransaction.transactionStatus.status === 202) ||
              ( transactionInfo &&
                transactionInfo.publishing)"
            @click=" (!transactionInfo)
              ? createPublishTransaction()
              : confirmTransactionAndPublishOpenBit() ">
            <span v-if="!transactionInfo">Prepare to Publish</span>
            <span v-else-if="transactionInfo === 'preparing to publish...'">
              <b-spinner small variant="secondary-color" type="grow" label="Spinning"></b-spinner>
              {{transactionInfo}}
            </span>
            <span
              v-else>
              Click to confirm and publish your OpenBit
              <b-spinner
                small
                v-if="
                  transactionInfo &&
                  transactionInfo.enrichedTransaction.transactionStatus.status === 202"
                variant="dark"
                type="grow"
                label="Spinning"></b-spinner>
            </span>
          </b-button>
          <!--<b-badge
              variant="mutiverse-color"
              v-if="transactionInfo &&
              transactionInfo.enrichedTransaction.transactionStatus.status === 200">
              Your OpenBit was succesfully published! Check the status of your OpenBits
              <router-link to="user-openbits">here</router-link>
          </b-badge>-->
        </template>
      </b-card>
    </div>
  </b-container>
</template>

<script>
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import config from '@/mixins/configs';
import { readContract } from 'smartweave';
import createCbvacPstInitState from '@/contracts/cbvac-pst-init-state';

import PublishOpenBitInfo from '@/components/PublishOpenBitInfo.vue';
import PublishOpenBitCreatePST from '@/components/PublishOpenBitCreatePST.vue';
import SpinningBadge from '@/components/SpinningBadge.vue';

export default {
  name: 'PublishOpenBit',
  mixins: [config],
  components: {
    vueDropzone: vue2Dropzone,
    PublishOpenBitInfo,
    PublishOpenBitCreatePST,
    SpinningBadge,
  },
  async mounted() {
    await this.$arRemoveTransactionFromQueue(this.$arGetARTransactionsQueue[0]);
    await this.$arRemoveTransactionFromQueue(this.$arGetARTransactionsQueue[1]);
  },
  computed: {
    ...mapGetters({
      defaultARWallet: 'user/getDefaultARWallet',
    }),
    PSTMinersReward() {
      if (this.$arGetARTransactionsQueue[0]) {
        return this.$arGetARTransactionsQueue[0].enrichedTransaction.feeAR;
      }
      return 0;
    },
    PSTArweaveAddress() {
      if (this.$arGetARTransactionsQueue[0]) {
        return this.$arGetARTransactionsQueue[0].enrichedTransaction.id;
      }
      return 0;
    },
    OpenBitMinersReward() {
      if (this.$arGetARTransactionsQueue[1]) {
        return this.$arGetARTransactionsQueue[1].enrichedTransaction.feeAR;
      }
      return 0;
    },
    OpenBitArweaveAddress() {
      if (this.$arGetARTransactionsQueue[1]) {
        return this.$arGetARTransactionsQueue[1].enrichedTransaction.id;
      }
      return 0;
    },
    OpenBitTotalPublicationCost() {
      if (this.PSTMinersReward
      && this.OpenBitMinersReward) {
        const total = Number(this.PSTMinersReward)
          + Number(this.OpenBitMinersReward)
          + Number(this.config.FEE_FOR_PUBLICATION);
        return total;
      }
      return 0;
    },
  },
  methods: {
    ...mapActions({
      addOpenBit: 'openbits/addOpenBit',
      emptyOpenBits: 'openbits/emptyOpenBits',
    }),

    async removeFile() {
      this.$refs['publish-openbit-dropzone'].removeAllFiles();
      this.file = null;
      this.fileBuffer = null;
      this.packageExists = false;
      await this.$arRemoveTransactionFromQueue(this.$arGetARTransactionsQueue[0]);
      await this.$arRemoveTransactionFromQueue(this.$arGetARTransactionsQueue[1]);
    },
    async publishPackage() {
      return true;
    },
    async createRegisterTransaction() {
      return true;
    },
    async createPublishTransaction() {
      await this.$arRemoveTransactionFromQueue(this.$arGetARTransactionsQueue[0]);
      await this.$arRemoveTransactionFromQueue(this.$arGetARTransactionsQueue[1]);
      this.packageExists = false;
      if (this.file && this.fileBuffer) {
        const tokenizedFileName = this.file.name.split('-');
        const packVersion = tokenizedFileName[tokenizedFileName.length - 1].split('.tgz')[0];
        tokenizedFileName.pop();
        const packName = tokenizedFileName.join('-');

        this.publishingStatus = true;
        this.transactionInfo = 'preparing to publish...';

        // check if a contract with the same name and version already exists
        const registryStatus = await readContract(Vue.$arweave.node, this.config.OPENBITS_REGISTRY);
        if (registryStatus.OpenBits.nodePackages[packName]
          && registryStatus.OpenBits.nodePackages[packName].version === packVersion) {
          this.packageExists = true;
          this.publishingStatus = false;
          return;
        }

        // create the init state of the PST
        const pstInitState = createCbvacPstInitState(
          `{openbit}-${packName}@${packVersion}`,
          [this.defaultARWallet.address],
          Number(this.$refs['openbit-economy'].targetProfit),
          this.$refs['openbit-economy'].getLevels,
        );

        const PSTTags = [{
          name: 'dApp',
          value: 'OpenBits',
        }, {
          name: 'type',
          value: 'cbvac-pst',
        }, {
          name: 'App-Name',
          value: 'SmartWeaveContract',
        }, {
          name: 'App-Version',
          value: '0.3.0',
        }, {
          name: 'Contract-Src',
          value: this.config.OPENBITS_CBVAC_PST,
        }, {
          name: 'Content-Type',
          value: 'application/json',
        }];

        await this.$arCreateTransaction({
          sign: true,
          data: JSON.stringify(pstInitState),
          tags: PSTTags,
        });

        // create transaction to publish the OpenBit
        const amount = this.config.FEE_FOR_PUBLICATION;
        const receiverAddress = this.config.OPENBITS_ARWEAVE_ADDRESS;
        const sign = true;
        const send = false;
        const data = this.fileBuffer;
        const tags = [{
          name: 'dApp',
          value: 'OpenBits',
        }, {
          name: 'type',
          value: 'node-package',
        }, {
          name: 'App-Name',
          value: 'SmartWeaveAction',
        }, {
          name: 'App-Version',
          value: '0.3.0',
        }, {
          name: 'Contract',
          value: this.config.OPENBITS_REGISTRY,
        }, {
          name: 'Input',
          value: JSON.stringify({
            function: 'register',
            type: 'node-package',
            name: packName,
            version: packVersion,
            pstId: this.$arGetARTransactionsQueue[0].arTransaction.id,
          }),
        }];

        this.transactionInfo = await this.$arCreateTransaction({
          amount,
          receiverAddress,
          sign,
          send,
          data,
          tags,
        });
      }
    },
    async confirmTransactionAndPublishOpenBit() {
      this.transactionInfo.publishing = true;
      await this.$arUtilsSendTransaction(
        this.$arGetARTransactionsQueue[0].arTransaction,
      );
      await this.$arUtilsSendTransaction(
        this.$arGetARTransactionsQueue[1].arTransaction,
      );
      /* setTimeout(() => {
        if (this.transactionInfo
          && this.transactionInfo.enrichedTransaction.transactionStatus.status === 200) {
          this.refreshOpenBitsRegistry();
        }
      }, 1000); */
    },
    async refreshOpenBitsRegistry() {
      // refresh the OpenBits registry
      const rs = await readContract(Vue.$arweave.node, this.config.OPENBITS_REGISTRY);
      this.emptyOpenBits();
      // get the openbits
      const { OpenBits } = rs;
      Object.values(OpenBits.nodePackages).forEach((v) => {
        this.addOpenBit(v);
      });
    },
  },
  data() {
    return {
      publishingStatus: false,
      file: null,
      fileBuffer: null,
      transactionInfo: null,
      packageExists: false,
      dropzoneOptions: {
        url: 'http://localhost:8080',
        method: 'GET',
        accept: async (file, done) => {
          this.file = file;
          const reader = new FileReader();
          reader.onload = async (event) => {
            this.fileBuffer = new Uint8Array(event.target.result);
          };
          reader.readAsArrayBuffer(file);
          done();
        },
        maxFiles: 1,
        thumbnailWidth: 200,
        addRemoveLinks: true,
      },
    };
  },
};
</script>

<style lang="scss">
@import '../assets/styles/custom-theme.scss';

  #create-obit-page {
    .dz-preview{
      width:97%;
      .dz-details {
        background-color:var(--dark)!important;
      }
    }
  }
</style>
